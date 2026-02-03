import { Plus, AlertCircle } from "lucide-react";

/**
 * Shown when there are no tasks. CTA to add first task.
 */
export default function EmptyState({ onAddFirst }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 md:p-16 text-center border border-gray-200">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
        <AlertCircle size={40} className="text-gray-400" aria-hidden />
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
        No tasks yet
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Start organizing your academic life by adding your first task
      </p>
      <button
        type="button"
        onClick={onAddFirst}
        className="inline-flex items-center gap-2 min-h-touch px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md font-semibold"
      >
        <Plus size={20} aria-hidden />
        Add Your First Task
      </button>
    </div>
  );
}
