/**
 * Dashboard statistics: Total, Upcoming (today + this week), Completed.
 * Real-time updates via props.
 */
export default function DashboardSummary({
  totalTasks,
  upcomingTasks,
  completedTasks,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-gray-400 hover:shadow-lg transition">
        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Total Tasks
        </div>
        <div className="text-4xl font-bold text-gray-900">{totalTasks}</div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition">
        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Upcoming
        </div>
        <div className="text-4xl font-bold text-blue-600">{upcomingTasks}</div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition">
        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Completed
        </div>
        <div className="text-4xl font-bold text-green-600">{completedTasks}</div>
      </div>
    </div>
  );
}
