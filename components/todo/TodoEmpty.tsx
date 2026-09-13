export default function TodoEmpty() {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        No tasks yet
      </p>

      <p className="mt-1 text-sm text-zinc-400">
        Add your first task to get started.
      </p>
    </div>
  );
}
