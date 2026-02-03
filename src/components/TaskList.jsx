import { AlertCircle } from "lucide-react";
import {
  categoryOrder,
  categoryTitles,
  categoryColors,
} from "../utils/taskUtils";
import TaskCard from "./TaskCard";

const categoryBorder = {
  overdue: "border-red-200",
  today: "border-blue-200",
  thisWeek: "border-indigo-200",
  completed: "border-green-200",
  later: "border-gray-200",
};

/**
 * Renders tasks grouped by category. Section headers with counts.
 */
export default function TaskList({
  groupedTasks,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  return (
    <div className="space-y-6 md:space-y-8">
      {categoryOrder.map((cat) => {
        const list = groupedTasks[cat];
        if (!list || list.length === 0) return null;
        const border = categoryBorder[cat] || "border-gray-200";
        return (
          <section
            key={cat}
            className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-200"
          >
            <div className={`mb-6 pb-4 border-b-2 ${border}`}>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-3">
                {cat === "overdue" && (
                  <AlertCircle size={24} className="text-red-600" aria-hidden />
                )}
                {categoryTitles[cat] || "Completed"}
                <span className="text-base font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                  {list.length}
                </span>
              </h2>
            </div>
            <div className="space-y-4">
              {list.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  categoryColor={categoryColors[cat] || ""}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
