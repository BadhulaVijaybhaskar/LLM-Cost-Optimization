/**
 * Sample client for posting usage events to backend collector route.
 */

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:4000";

async function sendSampleEvent() {
  const response = await fetch(`${BASE_URL}/api/usage-events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider: "openai",
      model: "gpt-4o",
      userId: "user_123",
      featureTag: "draft_assistant",
      inputTokens: 2000,
      outputTokens: 500,
      requestId: `req_${Date.now()}`
    })
  });

  const payload = await response.json();
  console.log(payload);
}

sendSampleEvent().catch(console.error);
