import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { StructuredOutputParser } from "langchain/output_parsers";

const model = new ChatOpenAI({
  openAIApiKey: import.meta.env.VITE_OPEN_AI_KEY,
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
  verbose: true,
});

const parser = new StringOutputParser();

const jokePrompt = ChatPromptTemplate.fromMessages([
  ["system", "Generate a joke based on a word provided by the user."],
  ["human", "{input}"],
]);

export async function callStructuredParserPropertyDetails(object: object) {
  const prompt = ChatPromptTemplate.fromTemplate(`
    Extract the following info from the object.
    Formatting Instruction: {format_instructions}
    Object: {object}
    `);

  const outputParserPropertyDetails =
    StructuredOutputParser.fromNamesAndDescriptions({
      streetAddress: "object > address > line1",
      cityAddress: "object > address > line2",
      bedrooms: "object > building > rooms > beds",
      bathrooms: "object > building > rooms > bathstotal",
      yearBuilt: "object > summary > yearbuilt",
      class: "object > summary > propclass",
      sqrFeet: "object > building > size > grossSize",
      lotSize: "object > lot > lotsize2",
    });

  const chain = prompt.pipe(model).pipe(outputParserPropertyDetails);

  return chain.invoke({
    object: JSON.stringify(object),
    format_instructions: outputParserPropertyDetails.getFormatInstructions(),
  });
}

export async function callStructuredParserPropertyPOI(object: object) {
  const prompt = ChatPromptTemplate.fromTemplate(`
    Extract the following info from the object.
    Formatting Instruction: {format_instructions}
    Object: {object}
    `);

  const outputParserPropertyPOI =
    StructuredOutputParser.fromNamesAndDescriptions({
      name: "object > businessLocation > businessStandardName",
      address: "object > businessLocation > address",
      industry: "object > category > industry",
    });

  const chain = prompt.pipe(model).pipe(outputParserPropertyPOI);

  return chain.invoke({
    object: JSON.stringify(object),
    format_instructions: outputParserPropertyPOI.getFormatInstructions(),
  });
}

export const jokeChain = jokePrompt.pipe(model).pipe(parser);
