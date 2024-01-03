import { SerpAPI } from "langchain/tools";

const url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const SerpAPITool = () => {
  const serpAPI = new SerpAPI(process.env.SERPAPI_API_KEY, {
    baseUrl: `${url}/agents`,
    location: "Vancouver,British Columbia, Canada",
    hl: "en",
    gl: "us",
  });
  serpAPI.returnDirect = true;

  return serpAPI;
};

export default SerpAPITool;
