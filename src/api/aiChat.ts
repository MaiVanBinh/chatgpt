import axios, { AxiosRequestConfig } from "axios";

class AiChatApi {
  static API_URL = process.env.REACT_APP_CHAT_AI_URL;

  static async getAiResponse(content: string) {
    const url = this.API_URL + '/ai-engines/api/v1/auth/ai-llm/chatgpt'
    const requestBody = {
      type: 'article',
      prompt: content,
    };
    const requestHeader: AxiosRequestConfig<{ type: string; prompt: string; }> = {
      headers: {
        Authorization: 'Bearer ' + process.env.REACT_APP_CHAT_AI_TOKEN,
      },    };
    const response = await axios.post(url, requestBody, requestHeader);
    return response.data;
  }
}
export default AiChatApi;
