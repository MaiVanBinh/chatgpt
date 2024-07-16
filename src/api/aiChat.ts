import axios from "axios";

class AiChatApi {
  static API_URL = process.env.REACT_APP_MYMY_API;
  static REACT_APP_MYMY_API = process.env.REACT_APP_MYMY_TOKEN;

  static async getAiResponse(prompt: string) {
    let finalResult = null;
    const sFaceHost = `${this.API_URL}/api/v1/auth/llmprompttpls/prompt-running`;
    const requestBody = {
      type: "article",
      prompt: prompt,
    };
    const requestHeader = {
      headers: {
        Access_token: this.REACT_APP_MYMY_API,
      },
    };

    const res = await axios.post(sFaceHost, requestBody, requestHeader);

    finalResult = res?.data?.data?.answer;
    return finalResult;
  }
}
export default AiChatApi;
