
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get current analytics data
    if (req.method === 'GET') {
      console.log("Getting analytics data");
      
      // This is simulated data for now
      const analyticsData = {
        threatStats: {
          detected: 147,
          mitigated: 142,
          resolved: 124,
          pending: 5,
        },
        systemHealth: {
          cpu: 32,
          memory: 45,
          network: 27,
          storage: 38,
        },
        recentThreats: [
          {
            id: "t1",
            name: "SQL Injection Attempt",
            source: "Web Application",
            timestamp: new Date().toISOString(),
            status: "detected",
            level: "high"
          },
          {
            id: "t2",
            name: "Suspicious Login",
            source: "Authentication Service",
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            status: "mitigating",
            level: "medium"
          },
          {
            id: "t3",
            name: "Malware Detected",
            source: "Endpoint Scanner",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            status: "resolved",
            level: "critical"
          }
        ]
      };
      
      return new Response(JSON.stringify(analyticsData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
