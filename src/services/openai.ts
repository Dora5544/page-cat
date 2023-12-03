import { OpenAIClient, AzureKeyCredential, ChatMessage } from "@azure/openai";

export class ChatService {

    private readonly url = "https://voice-ai.openai.azure.com/";

    private readonly deploymentId = "gpt-4";

    private readonly key = "b2d46d00666048f592e2a2dcc13dca55";

    private readonly chatHistory: ChatMessage[] = [];

    private readonly client;

    constructor(prompt?: string) {

        if (!prompt) {
            prompt = "You are a helpful assistant.";
        }
        this.chatHistory.push({
            role: "system",
            content: prompt
        });

        this.client = new OpenAIClient(this.url, new AzureKeyCredential(this.key));
    }

    public async chat(message: string) {

        this.chatHistory.push({
            role: "user",
            content: message
        });

        const { choices } = await this.client.getChatCompletions(this.deploymentId, this.chatHistory);

        const result = choices[0]?.message?.content || 'No message received from openai';

        this.chatHistory.push({
            role: "assistant",
            content: result
        });

        return [...this.chatHistory];
    }
}

export const chatService = new ChatService();