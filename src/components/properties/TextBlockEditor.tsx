'use client';
import React from 'react';

export const TextBlockEditor = ({ block }: { block: any }) => {
  return (
    <>
      <h3 className="font-bold mb-3">Edit {block.type}</h3>
      <p className="w-full px-3 py-2">{block.properties.text || ''}</p>
    </>
  );
};
