"use client";
import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const palette = [
  { type: "heading", label: "Heading" },
  { type: "question", label: "Question" },
  { type: "button", label: "Button" },
  { type: "footer", label: "Footer" },
];

export default function SidebarBlocks() {
  return (
    <div style={{ width: 240 }} className="border-r p-4 bg-gray-50">
      <h3 className="font-bold mb-3">Building blocks</h3>
      <Droppable droppableId="SIDEBAR" isDropDisabled>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {palette.map((p, i) => (
              <Draggable key={p.type} draggableId={p.type} index={i}>
                {(prov) => (
                  <div
                    ref={prov.innerRef}
                    {...prov.draggableProps}
                    {...prov.dragHandleProps}
                    className="p-3 mb-2 rounded bg-white border cursor-grab hover:shadow"
                  >
                    {p.label}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
