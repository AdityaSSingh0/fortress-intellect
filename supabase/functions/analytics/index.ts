
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
            level: "high",
            type: "Attack",
            details: "Attempted SQL injection targeting user authentication endpoint",
            ip: "203.0.113.42"
          },
          {
            id: "t2",
            name: "Suspicious Login",
            source: "Authentication Service",
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            status: "mitigating",
            level: "medium",
            type: "Authentication",
            details: "Multiple failed login attempts from unusual location",
            ip: "198.51.100.73"
          },
          {
            id: "t3",
            name: "Malware Detected",
            source: "Endpoint Scanner",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            status: "resolved",
            level: "critical",
            type: "Malware",
            details: "Trojan horse detected and quarantined on endpoint device",
            ip: "192.0.2.18"
          }
        ],
        // Add historical data for charts
        threatTimeline: [
          { day: "Mon", threats: 12 },
          { day: "Tue", threats: 19 },
          { day: "Wed", threats: 14 },
          { day: "Thu", threats: 21 },
          { day: "Fri", threats: 25 },
          { day: "Sat", threats: 18 },
          { day: "Sun", threats: 15 }
        ],
        // Add threat distribution data for charts
        threatDistribution: [
          { type: "Malware", count: 42 },
          { type: "Phishing", count: 38 },
          { type: "DDoS", count: 27 },
          { type: "Brute Force", count: 31 },
          { type: "Insider", count: 19 }
        ],
        // Add network traffic data
        networkTraffic: [
          { hour: "00:00", inbound: 32, outbound: 45 },
          { hour: "04:00", inbound: 28, outbound: 37 },
          { hour: "08:00", inbound: 67, outbound: 52 },
          { hour: "12:00", inbound: 89, outbound: 78 },
          { hour: "16:00", inbound: 73, outbound: 69 },
          { hour: "20:00", inbound: 54, outbound: 48 }
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
