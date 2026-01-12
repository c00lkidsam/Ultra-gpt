export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are ULTRA GPT. Extremely smart, clear, helpful, and powerful."
            },
            { role: "user", content: req.body.message }
          ]
        })
      }
    );

    const data = await response.json();
    res.json({
      reply: data.choices?.[0]?.message?.content || "No reply"
    });

  } catch (e) {
    res.json({ reply: "Server error" });
  }
}
