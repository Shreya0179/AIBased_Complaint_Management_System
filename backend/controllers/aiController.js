const axios = require("axios");

exports.analyzeComplaint = async (req, res) => {
  try {

    console.log(req.body);

    const complaint = req.body.complaint;

    const prompt = `
Analyze the complaint and return response in STRICT JSON format.

Complaint:
"${complaint}"

JSON format:
{
  "priority": "",
  "department": "",
  "summary": "",
  "response": ""
}

Rules:
- priority should be Low, Medium or High
- Keep summary short
- Keep response professional
- Return ONLY JSON
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-120b:free",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // res.json({
    //   result:
    //     response.data.choices[0].message.content,
    // });
    const aiResult =
  response.data.choices[0].message.content;

res.json(JSON.parse(aiResult));
  } catch (err) {

    console.log(
      err.response?.data || err.message
    );

    res.status(500).json({
      message: "AI analysis failed",
    });
  }
};