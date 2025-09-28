import React from 'react';
import { Toaster } from 'react-hot-toast';
const Toast = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      style: {
        background: '#333',
        color: '#fff',
        borderRadius: '8px',
        padding: '10px',
      },
      success: {
        style: {
          background: '#22c55e',
          color: '#fff',
        },
      },
      error: {
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      },
    }}
  />
);

export default Toast;
