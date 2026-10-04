import { google } from '@ai-sdk/google';
import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google('gemini-3.8-flash'), // use a real model name
      messages: await convertToModelMessages(messages),
    });

    // ✅ Correct modern way (no deprecation)
    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error: any) {
    // Catch AI_APICallError (and similar)
    const isHighDemand =
      error?.statusCode === 503 ||
      error?.message?.includes('high demand') ||
      error?.data?.error?.status === 'UNAVAILABLE';

    if (isHighDemand) {
      return new Response(
        JSON.stringify({
          error: 'The model is currently experiencing high demand. Please try again in a few moments.',
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    console.error('Chat route error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}