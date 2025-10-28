// components/agents/__tests__/AgentCanvas.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import AgentCanvas from '../agent-canvas';

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver;


describe('AgentCanvas', () => {
  it('renders without crashing', () => {
    const props = {
      nodes: [],
      edges: [],
      onNodesChange: jest.fn(),
      onEdgesChange: jest.fn(),
      onConnect: jest.fn(),
    };
    render(<AgentCanvas {...props} />);
  });
});
