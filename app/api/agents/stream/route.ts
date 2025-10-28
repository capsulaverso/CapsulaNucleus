// app/api/agents/stream/route.ts
// This API route handles the real-time streaming of an agent workflow's progress.
// It uses Server-Sent Events (SSE) to push updates to the client.

import { WorkflowEngine } from "@/lib/agents/core/workflow-engine";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { request } = body;

    if (!request) {
      return new Response("Bad Request: Missing 'request' in body.", { status: 400 });
    }

    const engine = new WorkflowEngine();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    // Run the workflow in a separate, non-blocking function
    (async () => {
      try {
        const initialContext = { originalRequest: request };

        for await (const event of engine.run(initialContext)) {
          const eventString = `data: ${JSON.stringify(event)}\n\n`;
          await writer.write(encoder.encode(eventString));
        }
      } catch (error) {
        console.error("Error during workflow execution:", error);
        const errorString = `data: ${JSON.stringify({ error: "Workflow failed" })}\n\n`;
        await writer.write(encoder.encode(errorString));
      } finally {
        await writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (e) {
    console.error("Error in stream route handler:", e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
