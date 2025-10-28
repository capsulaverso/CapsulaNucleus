// components/agents/agent-node.tsx
// This is a custom node component for React Flow.
// It defines the visual representation of an individual agent on the canvas.
'use client';

import React from 'react';
import { Handle, Position } from 'reactflow';
import { Bot, CheckCircle, Loader } from 'lucide-react';

const StatusIcon = ({ status }: { status: string }) => {
  if (status === 'completed') {
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  }
  if (status === 'running') {
    return <Loader className="h-4 w-4 animate-spin text-blue-500" />;
  }
  return <Bot className="h-4 w-4 text-gray-400" />;
};


// The data prop is passed from the node definition in the main page
export default function AgentNode({ data }: { data: any }) {
  const { name, status, output } = data;

  return (
    <div style={{
      border: '1px solid #ddd',
      padding: '15px',
      borderRadius: '8px',
      background: 'white',
      width: 250,
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    }}>
      <Handle type="target" position={Position.Top} isConnectable={false} />

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <StatusIcon status={status} />
        <strong style={{ marginLeft: '8px' }}>{name}</strong>
      </div>

      {output && (
        <div style={{
          fontSize: '0.9em',
          whiteSpace: 'pre-wrap',
          maxHeight: '150px',
          overflowY: 'auto',
          background: '#f9f9f9',
          padding: '8px',
          borderRadius: '4px'
        }}>
          {output}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </div>
  );
}
