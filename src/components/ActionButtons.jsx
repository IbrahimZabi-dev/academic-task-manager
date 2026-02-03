import { Plus } from "lucide-react";

/**
 * Add New Task and Show/Hide Completed. Touch-friendly min-h-touch.
 */
export default function ActionButtons({
  showForm,
  setShowForm,
  showCompleted,
  setShowCompleted,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <button
        type="button"
        onClick={() => setShowForm((v) => !v)}
        className="flex items-center justify-center gap-2 min-h-touch px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-semibold"
      >
        <Plus size={20} aria-hidden />
        Add New Task
      </button>
      <button
        type="button"
        onClick={() => setShowCompleted((v) => !v)}
        className="min-h-touch px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-semibold"
      >
        {showCompleted ? "Hide" : "Show"} Completed Tasks
      </button>
    </div>
  );
}
