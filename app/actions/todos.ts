'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import type { Todo } from '@/types/todo';

type ActionSuccess<T> = {
  success: true;
  data: T;
};

type ActionError = {
  success: false;
  error: string;
};

type ActionResult<T> = ActionSuccess<T> | ActionError;

async function getSupabase() {
  const cookieStore = await cookies();

  return createClient(cookieStore);
}

// CREATE
export async function createTodo(title: string): Promise<ActionResult<Todo>> {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) {
    return {
      success: false,
      error: 'Todo title is required.',
    };
  }

  if (trimmedTitle.length > 200) {
    return {
      success: false,
      error: 'Todo title must be 200 characters or less.',
    };
  }

  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from('todos')
    .insert({
      title: trimmedTitle,
    })
    .select()
    .single();

  if (error) {
    console.error('Create todo error:', error);

    return {
      success: false,
      error: 'Failed to create todo.',
    };
  }

  revalidatePath('/');

  return {
    success: true,
    data: data as Todo,
  };
}

// READ
export async function getTodos(): Promise<{
  success: boolean;
  data: Todo[];
  error?: string;
}> {
  const supabase = await getSupabase();

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Get todos error:', error);

    return {
      success: false,
      error: 'Failed to load todos.',
      data: [],
    };
  }

  return {
    success: true,
    data: data as Todo[],
  };
}

// UPDATE
export async function updateTodo(
  id: string,
  updates: {
    title?: string;
    completed?: boolean;
  }
): Promise<ActionResult<Todo>> {
  if (!id) {
    return {
      success: false,
      error: 'Todo ID is required.',
    };
  }

  if (updates.title !== undefined) {
    const trimmedTitle = updates.title.trim();

    if (!trimmedTitle) {
      return {
        success: false,
        error: 'Todo title cannot be empty.',
      };
    }

    if (trimmedTitle.length > 200) {
      return {
        success: false,
        error: 'Todo title must be 200 characters or less.',
      };
    }
  }

  const supabase = await getSupabase();

  const updateData = {
    ...updates,
    ...(updates.title !== undefined
      ? {
          title: updates.title.trim(),
        }
      : {}),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('todos')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Update todo error:', error);

    return {
      success: false,
      error: 'Failed to update todo.',
    };
  }

  revalidatePath('/');

  return {
    success: true,
    data: data as Todo,
  };
}

// DELETE
export async function deleteTodo(id: string): Promise<ActionResult<null>> {
  if (!id) {
    return {
      success: false,
      error: 'Todo ID is required.',
    };
  }

  const supabase = await getSupabase();

  const { error } = await supabase.from('todos').delete().eq('id', id);

  if (error) {
    console.error('Delete todo error:', error);

    return {
      success: false,
      error: 'Failed to delete todo.',
    };
  }

  revalidatePath('/');

  return {
    success: true,
    data: null,
  };
}
