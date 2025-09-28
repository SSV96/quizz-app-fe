import React from "react";

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 flex flex-col overflow-y-auto">{children}</main>
    </div>
  );
}
