// components/agents/agent-canvas.tsx
// This component renders the main interactive canvas for the agent workflow.
// It uses React Flow to visualize the agents as nodes and their interactions as edges.
'use client';

import React from 'react';
import ReactFlow, { Background, Controls, MiniMap, ReactFlowProps } from 'reactflow';
import 'reactflow/dist/style.css';
import AgentNode from './agent-node'; // Import the custom node

// Define the custom node types
const nodeTypes = {
  agentNode: AgentNode,
};

// Extend the props to include all the standard React Flow props
interface AgentCanvasProps extends ReactFlowProps {}

export default function AgentCanvas(props: AgentCanvasProps) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        {...props} // Spread all the props from the parent
        nodeTypes={nodeTypes}
        fitView // Automatically zoom to fit the nodes
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
