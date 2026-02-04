import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message, sessionId, systemLanguagePreference } = await req.json();

        // The n8n Webhook URL for the "solar chatbot"
        // This is now pulled from an environment variable for security
        const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

        if (!N8N_WEBHOOK_URL) {
            throw new Error('N8N_WEBHOOK_URL is not defined');
        }

        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'sendMessage',
                sessionId: sessionId,
                chatInput: message,
                language_preference: systemLanguagePreference
            }),
        });

        if (!response.ok) {
            throw new Error(`n8n responded with ${response.status}`);
        }

        const data = await response.json();

        // n8n chat trigger usually returns { output: "response text" } or similar structure
        // We pass it back to the frontend
        return NextResponse.json(data);

    } catch (error) {
        console.error('Chat Proxy Error:', error);
        return NextResponse.json(
            { error: 'Failed to connect to AI agent' },
            { status: 500 }
        );
    }
}
