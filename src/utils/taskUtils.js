/**
 * Generates a unique task ID.
 */
export const generateId = () =>
  `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

/**
 * Categorizes a task by due date: overdue, today, thisWeek, later, or (when completed) completed.
 */
export const getTaskCategory = (dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const daysDiff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  if (daysDiff < 0) return "overdue";
  if (daysDiff === 0) return "today";
  if (daysDiff <= 7) return "thisWeek";
  return "later";
};

/**
 * Returns today's date as YYYY-MM-DD for the date input min attribute.
 */
export const getTodayDate = () => new Date().toISOString().split("T")[0];

/**
 * Priority colors per spec: High=Red, Medium=Amber, Low=Green
 */
export const priorityColors = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export const categoryTitles = {
  overdue: "Overdue",
  today: "Due Today",
  thisWeek: "This Week",
  later: "Later",
  completed: "Completed",
};

export const categoryColors = {
  overdue: "border-l-4 border-red-500 bg-red-50",
  today: "border-l-4 border-blue-500 bg-blue-50",
  thisWeek: "border-l-4 border-indigo-500 bg-indigo-50",
  later: "border-l-4 border-gray-400 bg-gray-50",
  completed: "border-l-4 border-green-500 bg-green-50",
};

export const categoryOrder = [
  "overdue",
  "today",
  "thisWeek",
  "later",
  "completed",
];
