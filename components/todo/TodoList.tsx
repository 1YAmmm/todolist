import TodoEmpty from './TodoEmpty';
import TodoItem from './TodoItem';
import type { Todo } from '@/types/todo';

type TodoListProps = {
  todos: Todo[];
  onMutation: () => void;
};

export default function TodoList({ todos, onMutation }: TodoListProps) {
  if (todos.length === 0) {
    return <TodoEmpty />;
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onMutation={onMutation} />
      ))}
    </div>
  );
}
