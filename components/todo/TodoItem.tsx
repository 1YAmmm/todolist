'use client';

import { useState, useTransition } from 'react';
import { updateTodo, deleteTodo } from '@/app/actions/todos';
import type { Todo } from '@/types/todo';

type TodoItemProps = {
  todo: Todo;
  onMutation: () => void;
};

export default function TodoItem({ todo, onMutation }: TodoItemProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  function handleToggle() {
    setError('');

    startTransition(async () => {
      const result = await updateTodo(todo.id, {
        completed: !todo.completed,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      onMutation();
    });
  }

  function handleDelete() {
    setError('');

    startTransition(async () => {
      const result = await deleteTodo(todo.id);

      if (!result.success) {
        setError(result.error);
        return;
      }

      onMutation();
    });
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleToggle}
          disabled={isPending}
          aria-label={
            todo.completed ? 'Mark task incomplete' : 'Mark task complete'
          }
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-50 ${
            todo.completed
              ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black'
              : 'border-zinc-300 dark:border-zinc-600'
          }`}
        >
          {todo.completed && <span className="text-xs">✓</span>}
        </button>

        <span
          className={`flex-1 text-sm ${
            todo.completed
              ? 'text-zinc-400 line-through'
              : 'text-zinc-800 dark:text-zinc-200'
          }`}
        >
          {todo.title}
        </span>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-lg px-2 py-1 text-xs text-zinc-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-950"
        >
          {isPending ? '...' : 'Delete'}
        </button>
      </div>

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
