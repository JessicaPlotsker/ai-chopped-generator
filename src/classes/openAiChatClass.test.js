import { OpenAiChat } from "./openAiChatClass";
import OpenAI from "openai";

jest.mock("openai");

describe("OpenAiChat", () => {
  let openAiChat;

  beforeEach(() => {
    OpenAI.mockClear();
    openAiChat = new OpenAiChat();
  });

  it("should initialize OpenAI with the correct API key", () => {
    expect(OpenAI).toHaveBeenCalledWith({
      apiKey: process.env.OPENAI_API_KEY_2,
    });
  });

  it("should call the OpenAI chat API with the correct parameters", async () => {
    const mockCreate = jest.fn().mockResolvedValue({
      choices: [{ message: { content: "Test response" } }],
    });
    openAiChat.openai.chat = { completions: { create: mockCreate } };

    const message = "Hello, AI!";
    const response = await openAiChat.AiChat(message);

    expect(mockCreate).toHaveBeenCalledWith({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });
    expect(response).toBe("Test response");
  });

  it("should handle errors gracefully", async () => {
    const mockCreate = jest.fn().mockRejectedValue(new Error("Test error"));
    openAiChat.openai.chat = { completions: { create: mockCreate } };

    console.error = jest.fn();

    const response = await openAiChat.AiChat("Hello, AI!");

    expect(console.error).toHaveBeenCalledWith("Error:", expect.any(Error));
    expect(response).toBeUndefined();
  });
});
