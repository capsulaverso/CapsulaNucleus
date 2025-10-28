// components/agents/agent-chat.tsx
// This component provides the chat interface for the user to interact
// with the agent workflow, especially when the system requires user input.
'use client';

import React from 'react';

export default function AgentChat() {
  return (
    <div>
      <h2>Chat de Interação</h2>
      {/* Chat messages will be displayed here */}
      <input type="text" placeholder="Responda aqui..." />
      <button>Enviar</button>
    </div>
  );
}
