'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export async function continueConversation(messages: CoreMessage[]) {
    const openai = createOpenAI({
        baseURL: 'https://models.inference.ai.azure.com',
        apiKey: process.env.GITHUB_TOKEN,
    });
    
    const result = await streamText({
        model: openai('gpt-4-turbo'),
        messages,
    });

    const stream = createStreamableValue(result.textStream);
    return stream.value;
}