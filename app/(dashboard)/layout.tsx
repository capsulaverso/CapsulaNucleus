// app/(dashboard)/layout.tsx
// This is the layout for the main dashboard area, which is protected.
// It will contain the sidebar, header, and other common UI elements for the dashboard.
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Sidebar and Header would go here */}
      <main>{children}</main>
    </section>
  );
}
