import { OpenAI } from "openai";

// const draftData = {
//   id: "chatcmpl-9ky9VvMx8C3RXyEhQdIhZHyryTNyp",
//   object: "chat.completion",
//   created: 1720981341,
//   model: "gpt-4o-2024-05-13",
//   choices: [
//     {
//       index: 0,
//       message: {
//         role: "assistant",
//         content:
//           "추억의 발견\n\n1. 친구들과의 관계: 그는 학교에서 새로운 친구들을 많이 사귀었다.\n2. 잊혀진 기억: 오래된 종이를 정리하다 어머니의 손글씨를 발견하고 예전 기억을 떠올렸다.\n3. 가족 관계: 여러 해 동안 부모님과 형제들의 생일을 축하하지 않았다.\n\n작성자: [기사 작성자 이름 미정]",
//       },
//       logprobs: null,
//       finish_reason: "stop",
//     },
//   ],
//   usage: {
//     prompt_tokens: 250,
//     completion_tokens: 88,
//     total_tokens: 338,
//   },
//   system_fingerprint: "fp_dd932ca5d1",
// };
class AiChatApi {
  static API_URL = process.env.REACT_APP_CHAT_AI_URL;
  static openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  static async getAiResponse(prompt: string) {
    let finalResult = null;

    const chatCompletion = await this.openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o", // model name
      max_tokens: 4000, // Use max 8000 tokens for codex model
      // stream: true
    });
    // const chatCompletion = draftData;
    finalResult = chatCompletion.choices[0].message.content || "";
    return finalResult;
  }
}
export default AiChatApi;
