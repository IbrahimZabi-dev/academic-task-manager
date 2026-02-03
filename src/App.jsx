import { useState, useCallback } from "react";
import { useAuth } from "./hooks/useAuth";
import { useTasks } from "./hooks/useTasks";
import { generateId, getTaskCategory } from "./utils/taskUtils";

import Notification from "./components/Notification";
import LoginScreen from "./components/LoginScreen";
import Header from "./components/Header";
import DashboardSummary from "./components/DashboardSummary";
import ActionButtons from "./components/ActionButtons";
import TaskForm from "./components/TaskForm";
import EmptyState from "./components/EmptyState";
import TaskList from "./components/TaskList";

const INITIAL_FORM = {
  title: "",
  course: "",
  dueDate: "",
  priority: "medium",
};

export default function App() {
  const { currentUser, login, logout } = useAuth();
  const {
    tasks,
    addTask: addTaskToStore,
    updateTask,
    deleteTask,
    toggleComplete,
    clearTasks,
    getGroupedTasks,
  } = useTasks(currentUser);

  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const showNotify = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const handleLogin = useCallback(() => {
    const t = (username || "").trim();
    if (!t) return;
    const name = login(t);
    if (name) {
      setUsername("");
      setTimeout(() => showNotify(`Welcome back, ${name}!`), 100);
    }
  }, [username, login, showNotify]);

  const handleLogout = useCallback(() => {
    logout();
    clearTasks();
    setShowForm(false);
    setEditingTask(null);
  }, [logout, clearTasks]);

  const handleAddTask = useCallback(
    (data) => {
      const task = {
        id: generateId(),
        title: (data.title || "").trim(),
        course: (data.course || "").trim(),
        dueDate: (data.dueDate || "").trim(),
        priority: data.priority || "medium",
        completed: false,
        createdAt: new Date().toISOString(),
      };
      addTaskToStore(task);
      showNotify("Task added successfully!");
    },
    [addTaskToStore, showNotify]
  );

  const handleUpdateTask = useCallback(
    (id, data) => {
      updateTask(id, {
        title: (data.title || "").trim(),
        course: (data.course || "").trim(),
        dueDate: (data.dueDate || "").trim(),
        priority: data.priority || "medium",
      });
      showNotify("Task updated successfully!");
    },
    [updateTask, showNotify]
  );

  const handleDeleteTask = useCallback(
    (id) => {
      deleteTask(id);
      showNotify("Task deleted", "info");
    },
    [deleteTask, showNotify]
  );

  const handleToggleComplete = useCallback(
    (id) => {
      const wasIncomplete = toggleComplete(id);
      if (wasIncomplete) showNotify("Task completed! 🎉");
    },
    [toggleComplete, showNotify]
  );

  const handleStartEdit = useCallback((task) => {
    setEditingTask(task);
    setFormData({
      title: task.title || "",
      course: task.course || "",
      dueDate: task.dueDate || "",
      priority: task.priority || "medium",
    });
    setShowForm(true);
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM);
    setShowForm(false);
    setEditingTask(null);
  }, []);

  if (!currentUser) {
    return (
      <LoginScreen
        username={username}
        setUsername={setUsername}
        onLogin={handleLogin}
      />
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const upcomingTasks = tasks.filter((t) => {
    const c = getTaskCategory(t.dueDate);
    return !t.completed && (c === "today" || c === "thisWeek");
  }).length;
  const groupedTasks = getGroupedTasks(showCompleted);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Notification notification={notification} />

      <Header currentUser={currentUser} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <DashboardSummary
          totalTasks={totalTasks}
          upcomingTasks={upcomingTasks}
          completedTasks={completedTasks}
        />

        <ActionButtons
          showForm={showForm}
          setShowForm={setShowForm}
          showCompleted={showCompleted}
          setShowCompleted={setShowCompleted}
        />

        {showForm && (
          <TaskForm
            formData={formData}
            setFormData={setFormData}
            editingTask={editingTask}
            onAdd={handleAddTask}
            onUpdate={handleUpdateTask}
            onReset={resetForm}
          />
        )}

        {tasks.length === 0 ? (
          <EmptyState onAddFirst={() => setShowForm(true)} />
        ) : (
          <TaskList
            groupedTasks={groupedTasks}
            onToggleComplete={handleToggleComplete}
            onEdit={handleStartEdit}
            onDelete={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
}
