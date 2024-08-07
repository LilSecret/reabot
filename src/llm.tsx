import { ChatOpenAI } from "@langchain/openai";
import { jokeChain } from "./prompt-templates";
import {
  callStructuredParserPropertyDetails,
  callStructuredParserPropertyPOI,
} from "./output-parsers";
import { ATTOM_API } from "./ATTOMAPI";
import { useDispatch } from "react-redux";
import { TAddress } from "./types";

const model = new ChatOpenAI({
  openAIApiKey: import.meta.env.VITE_OPEN_AI_KEY,
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 1000,
  verbose: true,
});

async function askComedyJoke(word: string) {
  const response = await jokeChain.invoke({ input: word });

  return response.content;
}

async function askOpenAI(question: string) {
  const response = await model.invoke(question);
  return response.content;
}

// async function parser(word: string) {
//   const response = await jokeChain.invoke({ input: word });

//   console.log(response);

//   return response;
// }

async function parserPropertyDetails(property: TAddress) {
  const { address1, address2 } = property;

  const object = await ATTOM_API.getPropertyDetailsByAddress(
    address1,
    address2
  );

  const structuredProperty = await callStructuredParserPropertyDetails(object);

  const chatResponse = askOpenAI(
    "tell me this house objects information " +
      JSON.stringify(structuredProperty)
  );

  return chatResponse;
}

async function parserPropertyPOI(property: TAddress) {
  const { address1, address2 } = property;

  const connectedAddress = address1 + ", " + address2;
  const poiParsedLocations = [];

  const response = await ATTOM_API.getPropertyPOI(connectedAddress);
  const poiLocations = response.poi;

  for (const poiLocation of poiLocations) {
    const parsedLocation = await callStructuredParserPropertyPOI(poiLocation);

    poiParsedLocations.push(parsedLocation);
  }

  console.log(poiParsedLocations);

  const openAIChatResponse = askOpenAI(
    "tell me each of these near by points of interests objects received from a location that user submitted" +
      JSON.stringify(poiParsedLocations)
  );

  return openAIChatResponse;
}

export const LLM_STRING = {
  askOpenAI,
  askComedyJoke,
};

export const LLM_LOCATE = {
  parserPropertyDetails,
  parserPropertyPOI,
};

export type LLMStringProperty = keyof typeof LLM_STRING;
export type LLMLocateProperty = keyof typeof LLM_LOCATE;
