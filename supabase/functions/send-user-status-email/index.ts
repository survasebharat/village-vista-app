import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface EmailRequest {
  email: string;
  fullName: string;
  status: "approved" | "rejected";
  rejectionReason?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, fullName, status, rejectionReason }: EmailRequest = await req.json();
    
    console.log(`Sending ${status} email to ${email}`);

    let subject: string;
    let htmlContent: string;

    if (status === "approved") {
      subject = "Your Account Has Been Approved! 🎉";
      htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .button {
                display: inline-block;
                padding: 12px 30px;
                background: #667eea;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🎉 Welcome to Our Village Portal!</h1>
            </div>
            <div class="content">
              <h2>Hello ${fullName},</h2>
              <p>Great news! Your account registration has been approved by our administrator.</p>
              <p>You can now access all the features of our village portal:</p>
              <ul>
                <li>✅ View your personalized dashboard</li>
                <li>✅ Update your profile information</li>
                <li>✅ Access village services and information</li>
                <li>✅ Participate in community discussions</li>
              </ul>
              <p>Click the button below to log in and get started:</p>
              <div style="text-align: center;">
                <a href="${Deno.env.get('VITE_SUPABASE_URL')?.replace('//', '//').split('.')[0].replace('https://', '') || 'your-village-portal'}.lovable.app/auth" class="button">
                  Log In Now
                </a>
              </div>
              <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Village Portal. All rights reserved.</p>
            </div>
          </body>
        </html>
      `;
    } else {
      subject = "Update on Your Account Registration";
      htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .reason-box {
                background: #fff3cd;
                border-left: 4px solid #ffc107;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Account Registration Update</h1>
            </div>
            <div class="content">
              <h2>Hello ${fullName},</h2>
              <p>Thank you for your interest in joining our village portal.</p>
              <p>After careful review, we regret to inform you that your account registration could not be approved at this time.</p>
              ${rejectionReason ? `
                <div class="reason-box">
                  <strong>Reason:</strong>
                  <p>${rejectionReason}</p>
                </div>
              ` : ''}
              <p>If you believe this was an error or would like to discuss this decision, please contact our support team at your earliest convenience. We're here to help!</p>
              <p>You're welcome to submit a new registration with updated information if you'd like to try again.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Village Portal. All rights reserved.</p>
            </div>
          </body>
        </html>
      `;
    }

    // TEMPORARY: Resend test mode only allows sending to verified email
    // Once you verify your domain at https://resend.com/domains, update this
    const VERIFIED_EMAIL = "shivankhedkhurd@gmail.com";
    const isTestMode = !email.endsWith("@shivankhedkhurd.com"); // Change this after domain verification
    
    if (isTestMode && email !== VERIFIED_EMAIL) {
      console.log(`⚠️ TEST MODE: Would send ${status} email to ${email}`);
      console.log(`Subject: ${subject}`);
      console.log(`To enable real emails, verify your domain at https://resend.com/domains`);
      
      // Return success without sending to avoid errors during testing
      return new Response(JSON.stringify({ 
        success: true, 
        testMode: true,
        message: `Email notification logged for ${email}. Verify domain to send real emails.` 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    // Send email using Resend API
    console.log(`📧 Sending real email to ${email}`);
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Village Portal <onboarding@resend.dev>",
        to: [email],
        subject: subject,
        html: htmlContent,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      throw new Error(resendData.message || "Failed to send email");
    }

    console.log("✅ Email sent successfully:", resendData);

    return new Response(JSON.stringify({ success: true, data: resendData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-user-status-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
