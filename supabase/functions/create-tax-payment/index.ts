import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

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
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const {
      taxType,
      amount,
      payerName,
      payerMobile,
      payerEmail,
      villageAccount,
      villageId
    } = await req.json();

    console.log('Creating tax payment order:', { taxType, amount, payerName });

    // Generate unique order ID
    const orderId = `TAX_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store initial payment record
    const { data: paymentRecord, error: dbError } = await supabaseClient
      .from('tax_payments')
      .insert({
        order_id: orderId,
        tax_type: taxType,
        amount: parseFloat(amount),
        payer_name: payerName,
        payer_mobile: payerMobile,
        payer_email: payerEmail,
        village_account: villageAccount,
        village_id: villageId,
        payment_status: 'pending'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to create payment record');
    }

    console.log('Payment record created:', paymentRecord.id);

    // Create Cashfree payment order
    const cashfreeAppId = Deno.env.get('CASHFREE_APP_ID');
    const cashfreeSecretKey = Deno.env.get('CASHFREE_SECRET_KEY');

    // Use sandbox URL for testing
    const cashfreeUrl = 'https://sandbox.cashfree.com/pg/orders';

    const cashfreePayload = {
      order_id: orderId,
      order_amount: parseFloat(amount),
      order_currency: 'INR',
      customer_details: {
        customer_id: payerMobile,
        customer_name: payerName,
        customer_email: payerEmail || `${payerMobile}@example.com`,
        customer_phone: payerMobile
      },
      order_meta: {
        return_url: `${req.headers.get('origin')}/tax-payment/receipt?order_id=${orderId}`,
        notify_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/verify-tax-payment`
      }
    };

    console.log('Creating Cashfree order:', cashfreePayload);

    const cashfreeResponse = await fetch(cashfreeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': cashfreeAppId!,
        'x-client-secret': cashfreeSecretKey!,
        'x-api-version': '2023-08-01'
      },
      body: JSON.stringify(cashfreePayload)
    });

    const cashfreeData = await cashfreeResponse.json();

    if (!cashfreeResponse.ok) {
      console.error('Cashfree error:', cashfreeData);
      throw new Error(cashfreeData.message || 'Failed to create payment order');
    }

    console.log('Cashfree order created:', cashfreeData);

    return new Response(
      JSON.stringify({
        success: true,
        orderId: orderId,
        paymentSessionId: cashfreeData.payment_session_id,
        paymentUrl: cashfreeData.payment_link
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in create-tax-payment:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
