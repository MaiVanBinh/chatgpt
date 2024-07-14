import axios from "axios";

class MYMYapi {
  static API_URL = process.env.REACT_APP_MYMY_API;

  static async getPromptTemplateData() {
    const response = await axios(
      `${this.API_URL}/api/v1/auth/llmprompttpls?page=1&perPage=1000&sort=-id&filter=%255B%257B%2522operator%2522%253A%2522%253D%2522%252C%2522value%2522%253A%2522article%2522%252C%2522key%2522%253A%2522type%2522%257D%255D`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Access_token: process.env.REACT_APP_MYMY_TOKEN,
        },
      }
    );
    return response.data;
  }
}
export default MYMYapi;
