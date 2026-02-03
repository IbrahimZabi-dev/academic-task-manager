import { Calendar, Edit2, Trash2 } from "lucide-react";
import { priorityColors } from "../utils/taskUtils";

/**
 * Single task row: checkbox, title, course, due date, priority badge, edit/delete.
 * Completed: strikethrough + reduced opacity. Touch-friendly controls.
 */
export default function TaskCard({
  task,
  categoryColor,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className={`${categoryColor} rounded-lg p-5 transition hover:shadow-md ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <label className="flex items-center gap-2 cursor-pointer min-h-touch">
          <input
            type="checkbox"
            checked={!!task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="w-6 h-6 text-blue-600 rounded-md cursor-pointer focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-gray-900 mb-2 text-base md:text-lg ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {task.course ? (
              <span className="font-semibold text-gray-700 px-3 py-1 bg-white rounded-full border border-gray-200">
                {task.course}
              </span>
            ) : null}
            <span className="flex items-center gap-1 text-gray-600 px-3 py-1 bg-white rounded-full border border-gray-200">
              <Calendar size={14} aria-hidden />
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${
                priorityColors[task.priority] || priorityColors.medium
              }`}
            >
              {(task.priority || "medium").toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="p-2 min-h-touch min-w-[44px] flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition"
            title="Edit task"
          >
            <Edit2 size={20} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="p-2 min-h-touch min-w-[44px] flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-lg transition"
            title="Delete task"
          >
            <Trash2 size={20} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
