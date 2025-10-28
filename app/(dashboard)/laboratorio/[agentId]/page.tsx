// app/(dashboard)/laboratorio/[agentId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Edge, Node, Position, addEdge, useNodesState, useEdgesState } from 'reactflow';
import AgentCanvas from '@/components/agents/agent-canvas';

const initialNodes: Node[] = [];
const nodePositions: Record<string, { x: number, y: number }> = {
  classifier: { x: 250, y: 5 },
  researcher: { x: 250, y: 250 },
  'designer-expert': { x: 50, y: 500 },
  copywriter: { x: 250, y: 500 },
  'default-specialist': { x: 450, y: 500 },
};

// Helper to create a new node
const createNode = (id: string, name: string): Node => ({
  id,
  type: 'agentNode', // Use our custom node type
  position: nodePositions[id] || { x: 0, y: 0 },
  data: { name, status: 'pending', output: null },
});

export default function AgentSessionPage({ params }: { params: { agentId: string } }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastNode, setLastNode] = useState<string | null>(null);

  const startWorkflow = async () => {
    setIsLoading(true);
    setNodes([]);
    setEdges([]);
    setLastNode(null);

    const response = await fetch('/api/agents/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ request: input }),
    });

    if (!response.body) return;
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    reader.read().then(function processText({ done, value }): any {
      if (done) {
        setIsLoading(false);
        setNodes((nds) => nds.map(n => ({ ...n, data: { ...n.data, status: 'completed' } })));
        return;
      }
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n\n').filter(Boolean);
      lines.forEach(line => {
        try {
          const jsonString = line.replace('data: ', '');
          const event = JSON.parse(jsonString);
          handleStreamEvent(event);
        } catch (e) { console.error("Parse error:", e); }
      });
      return reader.read().then(processText);
    });
  };

  const handleStreamEvent = (event: any) => {
    const nodeName = Object.keys(event)[0];
    if (!nodeName || nodeName === 'END') return;

    const eventData = event[nodeName];
    const context = eventData.sharedContext;
    let nextNodeId: string | null = null;

    // Determine the next node based on context
    if (nodeName === 'classifier') nextNodeId = 'researcher';
    if (nodeName === 'researcher') {
      if (context.segment === 'Design') nextNodeId = 'designer-expert';
      else if (context.segment === 'Marketing') nextNodeId = 'copywriter';
      else nextNodeId = 'default-specialist';
    }

    setNodes((nds) => {
      let nodeExists = nds.some((n) => n.id === nodeName);
      if (!nodeExists) {
        // Add the new node if it doesn't exist
        const newNode = createNode(nodeName, nodeName.charAt(0).toUpperCase() + nodeName.slice(1));
        return [...nds, newNode];
      }
      // Update existing node status and output
      return nds.map((n) =>
        n.id === lastNode ? { ...n, data: { ...n.data, status: 'completed' } } : n
      );
    });

    // Update the "running" node
    setNodes(nds => nds.map(n => n.id === nodeName ? {...n, data: {...n.data, output: context.research || context.script, status: 'running'}} : n))

    if (lastNode) {
      setEdges((eds) => addEdge({ id: `e-${lastNode}-${nodeName}`, source: lastNode, target: nodeName }, eds));
    }

    setLastNode(nodeName);
  };

  useEffect(() => {
    if (lastNode) {
      setNodes(nds => nds.map(n => n.id === lastNode ? {...n, data: {...n.data, status: 'running'}} : n))
    }
  }, [lastNode, setNodes])

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Descreva sua ideia/tema aqui..."
          style={{ width: '400px', padding: '8px', marginRight: '10px' }}
          disabled={isLoading}
        />
        <button onClick={startWorkflow} disabled={isLoading}>
          {isLoading ? 'Executando...' : 'Executar'}
        </button>
      </div>
      <AgentCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={() => {}}
      />
    </div>
  );
}
