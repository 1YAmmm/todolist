'use client';

import { useState } from 'react';
import CalculatorLib from '@/lib/calculator';
export default function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(0);

  const sum = () => setResult(CalculatorLib.adding(num1, num2));
  const difference = () => setResult(CalculatorLib.subtracting(num1, num2));
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-4">
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="block rounded border p-2"
          placeholder="First number"
        />

        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          className="block rounded border p-2"
          placeholder="Second number"
        />

        <button
          onClick={sum}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Add
        </button>
        <button
          onClick={difference}
          className="rounded bg-red-500 px-4 py-2 text-white"
        >
          Subtract
        </button>

        <p>Result: {result}</p>
      </div>
    </main>
  );
}
