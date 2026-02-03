# Academic Task Manager

A single-page React application for college students to manage academic tasks in one place. Built to the specifications in the **Validation Report: Student Task Manager Application**.

## Features (per spec)

### Core (5/5)
- **User authentication (simulated)** – Username-based login, no passwords; session in `localStorage`; separate task lists per user
- **Task CRUD** – Add (title, course, due date, priority), Edit, Delete; form validation; required title and due date
- **Automatic categorization** – Overdue, Due Today, This Week, Later, Completed
- **Completion tracking** – Checkbox, strikethrough, reduced opacity; “Task completed! 🎉” toast
- **Dashboard statistics** – Total, Upcoming (today + this week), Completed; real-time updates

### Additional
- **Priority** – High (red), Medium (amber), Low (green); badges on each task
- **Data persistence** – `localStorage`, user-specific
- **Success notifications** – Toasts for add, update, delete, complete, login; auto-dismiss 3s
- **Responsive layout** – Mobile-first, 44px minimum touch targets
- **Show/Hide Completed** – Toggle to reduce clutter

### Validation & UX
- Trim on username and task title/course; empty/whitespace rejected
- Disabled states (e.g. Sign In when empty, Add/Update when invalid); 50% opacity when disabled
- Date picker `min` = today
- Graceful handling of empty/corrupted `localStorage`
- No delete confirmation (per spec); no task description or recurring tasks

## Tech

- **React 18** + **Vite**
- **Tailwind CSS**
- **lucide-react** (icons)
- **localStorage** only (no backend)

## Setup

```bash
npm install
npm run dev
```

## Scripts

| Script     | Description          |
|------------|----------------------|
| `npm run dev`    | Start dev server      |
| `npm run build`  | Production build      |
| `npm run preview` | Preview production build |

## Structure

```
src/
├── components/   # Notification, LoginScreen, Header, DashboardSummary,
│                 # ActionButtons, TaskForm, EmptyState, TaskList, TaskCard
├── hooks/        # useAuth, useTasks
├── utils/        # taskUtils (generateId, getTaskCategory, constants)
├── App.jsx
├── main.jsx
└── index.css
```

## Spec alignment

- **§1 Working features** – All 5 core + 5 extra features implemented
- **§2 Planned vs implemented** – 10/10 planned, stretch (responsive, notifications), multi-user
- **§6 Problem–solution** – Centralized tasks, auto-prioritization, deadline visibility, reduced cognitive load
- **§7 Validation & feedback** – Required fields, trim, disabled when invalid, toasts, 44px touch
- **§8 Technical** – React, `localStorage`, no backend; compatible with modern browsers
