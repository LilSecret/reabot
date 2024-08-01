import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

async function askOpenAI(question: string) {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: "user", content: question }],
    model: "gpt-3.5-turbo",
  });

  return chatCompletion.choices[0].message.content;
}

export default askOpenAI;
