import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({
  path: "/Users/jessicaplotsker/Projects/ai-chopped-generator/.env",
});

export class OpenAiChat {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY_2,
    });
  }

  async AiChat(mes) {
    // console.log("mes: ", mes);
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: mes }],
      });

      return response.choices[0]?.message?.content;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
