import { useState, useEffect } from "react";
import { getTaskCategory } from "../utils/taskUtils";

const getStorageKey = (username) => `tasks_${username}`;

/**
 * Task CRUD with user-specific localStorage.
 * Handles empty/corrupted data without crashing.
 */
export function useTasks(currentUser) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      return;
    }
    const key = getStorageKey(currentUser);
    try {
      const raw = localStorage.getItem(key);
      if (raw) setTasks(JSON.parse(raw));
      else setTasks([]);
    } catch {
      setTasks([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;
    try {
      localStorage.setItem(getStorageKey(currentUser), JSON.stringify(tasks));
    } catch {
      // quota or disabled
    }
  }, [tasks, currentUser]);

  const addTask = (task) => setTasks((p) => [...p, task]);
  const updateTask = (id, updates) =>
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  const deleteTask = (id) => setTasks((p) => p.filter((t) => t.id !== id));
  const toggleComplete = (id) => {
    const t = tasks.find((x) => x.id === id);
    setTasks((p) =>
      p.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x))
    );
    return t && !t.completed; // was incomplete, now completed
  };
  const clearTasks = () => setTasks([]);

  const getGroupedTasks = (showCompleted) => {
    const groups = {};
    for (const task of tasks) {
      if (!showCompleted && task.completed) continue;
      const cat = task.completed ? "completed" : getTaskCategory(task.dueDate);
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(task);
    }
    for (const cat of Object.keys(groups))
      groups[cat].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return groups;
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    clearTasks,
    getGroupedTasks,
  };
}
