import { OpenAIClient, AzureKeyCredential } from "@azure/openai";


export const test = async () => {
    console.log('invoke test')
    const client = new OpenAIClient(
        "https://voice-ai.openai.azure.com/",
        new AzureKeyCredential("b2d46d00666048f592e2a2dcc13dca55")
    );
    const deploymentId = "gpt-4";

    const messages = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello, do you know ipv4?" }
    ];

    console.log(`Messages: ${messages}`);

    const { choices } = await client.getChatCompletions(deploymentId, messages);

    for (const choice of choices) {
        console.log(choice.message);
    }
    // for await (const event of events) {
    //     console.log('this is a new event')
    //     for (const choice of event.choices) {
    //         console.log('this is a new choice')
    //         console.log('this is message', choice.message)
    //         const delta = choice.delta?.content;
    //         if (delta !== undefined) {
    //             console.log(`Chatbot: ${delta}`);
    //         }
    //     }
    // }
}
