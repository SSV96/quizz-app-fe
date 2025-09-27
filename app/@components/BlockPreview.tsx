import React from "react";
import { Block } from "../";

export default function BlockPreview({ block }: { block: Block }) {
  if (block.type === "heading") return <h2 className="text-xl font-bold">{block.properties.text}</h2>;
  if (block.type === "footer") return <p className="text-sm text-gray-600">{block.properties.text}</p>;
  if (block.type === "button") return <button className="bg-blue-600 text-white px-3 py-1 rounded">{block.properties.text}</button>;
  if (block.type === "question") {
    const q = block.properties.question!;
    if (q.kind === "text") {
      return <div><p>{q.text}</p><textarea className="w-full border rounded mt-2" placeholder="Your answer" /></div>;
    }
    return (
      <div>
        <p className="font-medium">{q.text}</p>
        <ul className="mt-2">
          {q.options?.map((o) => (
            <li key={o.id} className="ml-5 list-disc">{o.text}</li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
}
