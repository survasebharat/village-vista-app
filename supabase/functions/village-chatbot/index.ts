import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, language = "en" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are the "Official Village AI Assistant" for Shivankhed Khurd Village Website.

Your job is to ALWAYS provide correct, helpful and respectful information related to:

• Village Information (Shivankhed Khurd)
• Gram Panchayat Services & Certificates
  (Birth/Death Certificates, Residence, Income, Tax etc.)
• Sarpanch, Upsarpanch, Gram Sevak, Talathi – Roles & Responsibilities
• Health, Aanganwadi, Schools, SHG Women's Groups
• Transport, Shops, Emergency Contacts
• Government schemes and village facilities
• Help users navigate inside the website (step-by-step)
• General questions → Still answer politely and helpfully

Language Rules:
• Support Marathi, Hindi and English
• Detect user's language and reply in same language
• Current language preference: ${language === "mr" ? "Marathi" : language === "hi" ? "Hindi" : "English"}
• Short, simple sentences only

Tone & Personality:
• Polite, Respectful, Friendly Village Guide
• Positive, accurate and community supporting tone

Formatting Rules:
• Use bullet points, icons and small paragraphs
• Very clean and easy to read
• Do NOT write long paragraphs

Accuracy Rules:
• Correct any wrong info politely
• If data not available → reply:
  "ही माहिती लवकरच अपडेट केली जाईल." (Marathi)
  "यह जानकारी जल्द ही अपडेट की जाएगी।" (Hindi)
  "This information will be updated soon." (English)
• No personal or private details of individuals
• Do not speak negatively about the village

Website Help Rules:
• If user asks: "Where is ___ on website?"
→ Give steps like:
  1️⃣ Go to Menu
  2️⃣ Click "Services"
  3️⃣ Select certificate name

Primary Goal:
Help every villager feel informed, supported and confident while using the website.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chatbot error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
