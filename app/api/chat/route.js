export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ reply: "Please enter a message." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const model = "models/gemini-2.5-flash";

    const url = `https://generativelanguage.googleapis.com/v1/${model}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const raw = await response.json();

    // Normalize array OR object
    const data = Array.isArray(raw) ? raw[0] : raw;

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Sorry, no reply.";

    return Response.json({ reply });
  } catch (error) {
    return Response.json(
      { reply: "Server error: " + error.message },
      { status: 500 }
    );
  }
}
