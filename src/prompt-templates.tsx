import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  openAIApiKey: import.meta.env.VITE_OPEN_AI_KEY,
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
});

const jokeTemplate = ChatPromptTemplate.fromMessages([
  ["system", "Generate a joke based on a word provided by the user."],
  ["human", "{input}"],
]);

// const jokeTemplate = ChatPromptTemplate.fromTemplate(
//   "You are a comedian. Tell a joke based on the following word {input}"
// );

export const jokeChain = jokeTemplate.pipe(model);
