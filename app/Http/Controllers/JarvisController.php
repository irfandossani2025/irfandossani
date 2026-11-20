<?php

namespace App\Http\Controllers;

use App\Mail\JarvisLeadMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class JarvisController extends Controller
{
    private const SYSTEM_PROMPT = <<<'PROMPT'
You are Irfan 2.0, Irfan Shiraj Dossani's practical business and digital strategy assistant. Irfan is a marketing and branding consultant based in Muscat, Oman.

Help prospective clients with marketing, branding, websites, web applications, AI solutions, automation, customer journeys, lead generation, and business technology. Bring together a strategist's view of the business with a builder's understanding of delivery: understand the objective, identify the real bottleneck, recommend a useful direction, and explain the next step in plain language.

For every question:
1. Give a direct, useful answer first.
2. When helpful, suggest a practical solution that covers strategy, UX, technology, and implementation.
3. Ask one focused discovery question if important information is missing.
4. When the visitor is interested in working with Irfan, finish with a short "Next step" and a compact "Handoff brief" containing the visitor's stated goal, recommended direction, and what Irfan should discuss next.

You may answer general marketing and technical questions, but do not pretend to have audited the visitor's business, accessed their systems, or completed work. Never invent facts, pricing, timelines, clients, credentials, integrations, results, or capabilities. Never promise that Irfan will contact the visitor, that a lead was sent, or that a handoff was recorded: you cannot send messages, store leads, or notify Irfan.

Use only this verified business email when inviting a visitor to continue: info@irfandossani.com. Do not provide phone numbers or other email addresses.

Keep answers concise, confident, friendly, and ideally under 180 words. Use short headings or bullets only when they make a recommendation easier to scan.
PROMPT;

    public function __invoke(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'min:2', 'max:800'],
        ]);

        $apiKey = config('services.anthropic.key');

        if (blank($apiKey)) {
            return response()->json([
                'message' => 'Irfan 2.0 is not connected for live replies yet. Email info@irfandossani.com to start a project conversation.',
                'configured' => false,
            ], 503);
        }

        try {
            $response = Http::acceptJson()
                ->withHeaders([
                    'x-api-key' => $apiKey,
                    'anthropic-version' => '2023-06-01',
                ])
                ->timeout(25)
                ->post('https://api.anthropic.com/v1/messages', [
                    'model' => config('services.anthropic.model'),
                    'max_tokens' => 350,
                    'system' => self::SYSTEM_PROMPT,
                    'messages' => [[
                        'role' => 'user',
                        'content' => $validated['message'],
                    ]],
                ]);

            if ($response->failed()) {
                Log::warning('Anthropic request failed for Irfan 2.0.', ['status' => $response->status()]);

                return response()->json([
                    'message' => 'Irfan 2.0 is temporarily unavailable. Please try again or email info@irfandossani.com.',
                ], 502);
            }

            $text = data_get($response->json(), 'content.0.text');

            if (! is_string($text) || blank($text)) {
                Log::warning('Anthropic response did not include text for Irfan 2.0.');

                return response()->json([
                    'message' => 'Irfan 2.0 could not prepare a response just now. Please try again.',
                ], 502);
            }

            return response()->json(['message' => $text, 'configured' => true]);
        } catch (\Throwable $exception) {
            Log::warning('Irfan 2.0 could not reach the AI service.', ['exception' => $exception->getMessage()]);

            return response()->json([
                'message' => 'Irfan 2.0 is temporarily unavailable. Please try again shortly.',
            ], 502);
        }
    }

    public function handoff(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:254'],
            'phone' => ['required', 'string', 'min:6', 'max:50'],
            'question' => ['required', 'string', 'min:2', 'max:800'],
            'summary' => ['required', 'string', 'min:2', 'max:5000'],
            'consent' => ['accepted'],
            'website' => ['nullable', 'max:0'],
        ]);

        try {
            Mail::to(config('services.jarvis.lead_recipient'))
                ->send(new JarvisLeadMail($validated, now()));

            return response()->json([
                'message' => 'Your project brief has been sent to Irfan. He will review the details and reply using the contact information you provided.',
            ]);
        } catch (\Throwable $exception) {
            Log::warning('Irfan 2.0 project note could not be emailed.', ['exception' => $exception->getMessage()]);

            return response()->json([
                'message' => 'Your project note could not be sent just now. Please try again or email info@irfandossani.com.',
            ], 502);
        }
    }
}
