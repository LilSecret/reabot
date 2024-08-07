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
    "tell me the this house objects information " +
      JSON.stringify(structuredProperty)
  );

  return chatResponse;
}

async function parserPropertyPOI(property: TAddress) {
  const { address1, address2 } = property;

  const object = {
    business_category: "BANKS - FINANCIAL",
    city: "New York",
    distance: "0.01",
    franchise: "",
    geo_latitude: "40.707595",
    geo_longitude: "-74.011172",
    geo_match: "S5",
    industry: "BANKS",
    lob: "BANKS",
    name: "State Export Import Bank",
    ob_id: "10139302",
    phone: "212-618-1258",
    primary: "PRIMARY",
    state: "NY",
    street: "14 Wall St # 20",
    type: "POI",
    unit: "0",
    zip_code: "10005",
  };

  const structuredPOI = await callStructuredParserPropertyPOI(object);

  console.log(structuredPOI);

  return "Howdy Do";
}

// async function callStructuredParser() {}

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
