'use client';

import { FormEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createTodo } from '@/app/actions/todos';

export default function TodoForm() {
  const router = useRouter();

  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();

    if (!text) {
      return;
    }

    setError('');

    startTransition(async () => {
      const result = await createTodo(text);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setInput('');

      router.refresh();
    });
  }

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="What needs to be done?"
          disabled={isPending}
          maxLength={200}
          className="flex-1 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
        />

        <button
          type="submit"
          disabled={isPending || !input.trim()}
          className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {isPending ? 'Adding...' : 'Add'}
        </button>
      </form>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
