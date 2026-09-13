'use client';

import { useRouter } from 'next/navigation';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import type { Todo as TodoType } from '@/types/todo';

type TodoProps = {
  initialTodos: TodoType[];
};

export default function Todo({ initialTodos }: TodoProps) {
  const router = useRouter();

  const remainingCount = initialTodos.filter((todo) => !todo.completed).length;

  const completedCount = initialTodos.filter((todo) => todo.completed).length;

  function refreshTodos() {
    router.refresh();
  }

  return (
    <div className="w-full max-w-xl px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          My Tasks
        </h1>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Stay organized and get things done.
        </p>
      </div>

      {/* Add Todo */}
      <TodoForm />

      {/* Todo List */}
      <TodoList todos={initialTodos} onMutation={refreshTodos} />

      {/* Footer */}
      {initialTodos.length > 0 && (
        <div className="mt-5 flex justify-between text-xs text-zinc-400">
          <span>{remainingCount} remaining</span>

          <span>{completedCount} completed</span>
        </div>
      )}
    </div>
  );
}
