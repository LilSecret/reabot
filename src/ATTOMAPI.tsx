const url = "https://api.gateway.attomdata.com/propertyapi/v1.0.0";

async function getPropertyDetailsByAddress(address1: string, address2: string) {
  return fetch(
    `${url}/property/basicprofile?address1=${encodeURIComponent(
      address1
    )}&address2=${encodeURIComponent(address2)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        apikey: import.meta.env.VITE_ATTOM_KEY,
      },
    }
  ).then((response) => response.json());
}

async function getPropertyDetailsById(id: number) {
  return fetch(`${url}/property/detailwithschools?attomid=${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      apikey: import.meta.env.VITE_ATTOM_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.property);
      return data.property;
    });
}

async function getPropertyPOI(address: string) {
  return fetch(
    `https://api.gateway.attomdata.com/v4/neighborhood/poi?address=${encodeURIComponent(
      address
    )}&radius=5&categoryName=PERSONAL%20SERVICES`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        apikey: import.meta.env.VITE_ATTOM_KEY,
      },
    }
  ).then((response) => response.json());
}

export const ATTOM_API = {
  getPropertyDetailsById,
  getPropertyPOI,
  getPropertyDetailsByAddress,
};

// getPropertyDetailsById("184713191");

// const API = {
//   variables: [],
//   info: {
//     name: "ATTOM Property Search Engine API",
//     _postman_id: "034096a4-b3f5-9382-c34f-0f5043f83696",
//     description:
//       "The ATTOM Property Search Engine is an API designed to help you to integrate U.S. property information into any application that can interact with a REST API. ",
//     schema:
//       "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
//   },
//   item: [
//     {
//       name: "Property IDs by LatLon Radius",
//       request: {
//         url: {
//           raw: "https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/snapshot?latitude=39.21523130910493&longitude=-75.62095642089844&radius=1",
//           protocol: "https",
//           host: ["api", "gateway", "attomdata", "com"],
//           path: ["propertyapi", "v1.0.0", "property", "snapshot"],
//           query: [
//             {
//               key: "latitude",
//               value: "39.21523130910493",
//               equals: true,
//               description: "",
//             },
//             {
//               key: "longitude",
//               value: "-75.62095642089844",
//               equals: true,
//               description: "",
//             },
//             {
//               key: "radius",
//               value: "1",
//               equals: true,
//               description: "",
//             },
//           ],
//           variable: [],
//         },
//         method: "GET",
//         header: [
//           {
//             key: "APIKey",
//             value: "736f1130096aa92549d800921bca8e8c",
//           },
//           {
//             key: "accept",
//             value: "application/json",
//           },
//         ],
//         body: {
//           mode: "raw",
//           raw: "",
//         },
//         description: "",
//       },
//       response: [],
//     },
//   ],
// };
