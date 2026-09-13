import Todo from '@/components/todo/Todo';
import { getTodos } from './actions/todos';

export default async function Home() {
  const result = await getTodos();

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="flex min-h-screen items-start justify-center">
        <Todo initialTodos={result.data} />
      </div>
    </main>
  );
}
