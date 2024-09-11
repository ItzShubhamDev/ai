import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
        return new Response('Invalid request', { status: 400 });
    }

    const openai = createOpenAI({
        baseURL: 'https://models.inference.ai.azure.com',
        apiKey: process.env.GITHUB_TOKEN,
    })

    const res = await streamText({ model: openai('gpt-4o-mini'), messages: convertToCoreMessages(messages) });

    return res.toDataStreamResponse();
}