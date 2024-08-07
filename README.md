# 🤖 ReaBot an AI Chat Assistant

Reabot is an AI Customer Support assistant for home buyers. I made her using **LangChain**, **OpenAI**, and **ATTOM** an api for getting property insights. The body background is just an image example website from [Real Estate Assistant](https://realestateassistant.com/).

## 🚀 Features

- AI Assistance: Real time chatting with AI
- 24/7 Availability: Get assistance anytime
- User-Friendly Interface: ReaBot comes with a nice menu for seamless experience.
- Property Search: Users can get property details on a specific home address.
- Property POI: Users can get a list of near by points of interests like stores, banks, or other common industries.

## ⚒️ Technologies

- `React`
- `Redux-Toolkit`
- `TypeScript`
- `LangChain 🦜`
- `OpenAI`

## 🏗️ Development

I made this for a Hackathon Project to create a ChatBot as a AI Customer Support agent.

I worked with **ATTOM** and **LangChain** to chain data and send it to the llm, OpenAI processed data and uploads response to user.

## 🤔 Improvements

- More Features: If ReaBot could book appointments with agents for house showcasing would be awesome.
- Saved Data: If ReaBot could save user info so they wouldn't have to input name and email each refresh.
- UI: add smooth animations to chat when user/ bot sends a message.
- Sound Effects: User would get a sound que when ReaBot has finished thinking/ processing response.

## 🐞 Bugs

- UNKNOWN: So far I haven't found any.

## 🚦 Running the Project

NOTE: You would have to have an [OpenAI](https://platform.openai.com/docs/overview) and [Attom](https://api.developer.attomdata.com/home) api key to run its functionalities

1. Clone the repo on your local system
2. Install dependencies in the project directory using `npm i`
3. Add an env file `.env` in the root directory
4. To plug your keys into the system add these variables to your env file

```
VITE_OPEN_AI_KEY = <your key>
VITE_ATTOM_KEY = <your key>
```
