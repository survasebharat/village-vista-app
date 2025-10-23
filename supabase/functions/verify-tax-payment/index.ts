import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { createHmac } from "https://deno.land/std@0.168.0/node/crypto.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const body = await req.json();
    console.log('Payment webhook received:', body);

    const { orderId } = body.data || {};

    if (!orderId) {
      // If webhook, try to get order_id from different location
      const order_id = body.order?.order_id || body.orderId;
      
      if (!order_id) {
        throw new Error('Order ID not found in webhook');
      }

      // Verify signature if present
      const signature = req.headers.get('x-webhook-signature');
      if (signature) {
        const secretKey = Deno.env.get('CASHFREE_SECRET_KEY');
        const expectedSignature = createHmac('sha256', secretKey!)
          .update(JSON.stringify(body))
          .digest('hex');

        if (signature !== expectedSignature) {
          console.error('Invalid webhook signature');
          throw new Error('Invalid signature');
        }
      }

      // Fetch payment status from Cashfree
      const cashfreeUrl = `https://sandbox.cashfree.com/pg/orders/${order_id}`;
      const cashfreeAppId = Deno.env.get('CASHFREE_APP_ID');
      const cashfreeSecretKey = Deno.env.get('CASHFREE_SECRET_KEY');

      const statusResponse = await fetch(cashfreeUrl, {
        method: 'GET',
        headers: {
          'x-client-id': cashfreeAppId!,
          'x-client-secret': cashfreeSecretKey!,
          'x-api-version': '2023-08-01'
        }
      });

      const statusData = await statusResponse.json();
      console.log('Payment status from Cashfree:', statusData);

      // Update payment record
      const { error: updateError } = await supabaseClient
        .from('tax_payments')
        .update({
          payment_id: statusData.cf_order_id,
          payment_status: statusData.order_status === 'PAID' ? 'success' : 'failed',
          payment_date: statusData.order_status === 'PAID' ? new Date().toISOString() : null
        })
        .eq('order_id', order_id);

      if (updateError) {
        console.error('Database update error:', updateError);
        throw updateError;
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Manual verification (called from frontend)
    const cashfreeUrl = `https://sandbox.cashfree.com/pg/orders/${orderId}`;
    const cashfreeAppId = Deno.env.get('CASHFREE_APP_ID');
    const cashfreeSecretKey = Deno.env.get('CASHFREE_SECRET_KEY');

    console.log('Fetching payment status for:', orderId);

    const statusResponse = await fetch(cashfreeUrl, {
      method: 'GET',
      headers: {
        'x-client-id': cashfreeAppId!,
        'x-client-secret': cashfreeSecretKey!,
        'x-api-version': '2023-08-01'
      }
    });

    if (!statusResponse.ok) {
      const errorData = await statusResponse.json();
      console.error('Cashfree status check error:', errorData);
      throw new Error('Failed to verify payment status');
    }

    const statusData = await statusResponse.json();
    console.log('Payment status:', statusData);

    // Update payment record
    const { data: updatedPayment, error: updateError } = await supabaseClient
      .from('tax_payments')
      .update({
        payment_id: statusData.cf_order_id,
        payment_status: statusData.order_status === 'PAID' ? 'success' : 'failed',
        payment_date: statusData.order_status === 'PAID' ? new Date().toISOString() : null
      })
      .eq('order_id', orderId)
      .select()
      .single();

    if (updateError) {
      console.error('Database update error:', updateError);
      throw updateError;
    }

    console.log('Payment record updated:', updatedPayment);

    return new Response(
      JSON.stringify({
        success: true,
        payment: updatedPayment,
        cashfreeStatus: statusData
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in verify-tax-payment:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
