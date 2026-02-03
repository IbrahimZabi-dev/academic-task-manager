import { Check, X } from "lucide-react";
import { getTodayDate } from "../utils/taskUtils";

/**
 * Add/Edit task form. Validation: title and due date required; trim inputs.
 * Min date = today. Priority defaults to medium; submit disabled when invalid.
 * Touch-friendly buttons.
 */
export default function TaskForm({
  formData,
  setFormData,
  editingTask,
  onAdd,
  onUpdate,
  onReset,
}) {
  const titleOk = (formData.title || "").trim().length > 0;
  const dateOk = !!(formData.dueDate || "").trim();
  const canSubmit = titleOk && dateOk;

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!canSubmit) return;
    if (editingTask) {
      onUpdate(editingTask.id, {
        title: (formData.title || "").trim(),
        course: (formData.course || "").trim(),
        dueDate: (formData.dueDate || "").trim(),
        priority: formData.priority || "medium",
      });
    } else {
      onAdd({
        title: (formData.title || "").trim(),
        course: (formData.course || "").trim(),
        dueDate: (formData.dueDate || "").trim(),
        priority: formData.priority || "medium",
      });
    }
    onReset();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label
              htmlFor="task-title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Task Title <span className="text-red-600">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              value={formData.title || ""}
              onChange={(e) => setFormData((f) => ({ ...f, title: e.target.value }))}
              placeholder="e.g., Complete Physics Lab Report"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label
              htmlFor="task-course"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Course Name
            </label>
            <input
              id="task-course"
              type="text"
              value={formData.course || ""}
              onChange={(e) => setFormData((f) => ({ ...f, course: e.target.value }))}
              placeholder="e.g., Physics 201"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div>
            <label
              htmlFor="task-due"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Due Date <span className="text-red-600">*</span>
            </label>
            <input
              id="task-due"
              type="date"
              value={formData.dueDate || ""}
              min={getTodayDate()}
              onChange={(e) =>
                setFormData((f) => ({ ...f, dueDate: e.target.value }))
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div className="md:col-span-2">
          <span className="block text-sm font-semibold text-gray-700 mb-3">
            Priority Level
          </span>
          <div className="flex flex-wrap gap-3">
            {["low", "medium", "high"].map((p) => (
              <label
                key={p}
                className="flex items-center cursor-pointer min-h-touch px-4 py-2 border-2 rounded-lg transition hover:bg-gray-50"
                style={{
                  borderColor:
                    (formData.priority || "medium") === p ? "#3b82f6" : "#e5e7eb",
                  backgroundColor:
                    (formData.priority || "medium") === p ? "#eff6ff" : "white",
                }}
              >
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={(formData.priority || "medium") === p}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, priority: e.target.value }))
                  }
                  className="mr-2 text-blue-600"
                />
                <span className="font-medium capitalize">{p}</span>
              </label>
            ))}
          </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex items-center justify-center gap-2 min-h-touch px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={18} aria-hidden />
            {editingTask ? "Update Task" : "Add Task"}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-2 min-h-touch px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
          >
            <X size={18} aria-hidden />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
