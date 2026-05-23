import { ArrowDownRight, ArrowUpRight, BookOpen, Clock3, GraduationCap, Users } from 'lucide-react';

const stats = [
  { label: 'Courses', value: '8,848', change: '16.8%', trend: 'up', icon: BookOpen },
  { label: 'Learners', value: '2,756', change: '3.51%', trend: 'down', icon: Users },
  { label: 'Students', value: '5,957', change: '6.87%', trend: 'up', icon: GraduationCap },
  { label: 'Hours', value: '9.62K', change: '9.19%', trend: 'up', icon: Clock3 },
];

const categories = [
  { name: 'Development', value: '12.48%', width: '78%' },
  { name: 'Design', value: '5.23%', width: '44%' },
  { name: 'Business', value: '15.58%', width: '86%' },
  { name: 'Marketing', value: '14.15%', width: '69%' },
];

const courses = [
  { name: 'React Foundations', enrollments: '12,457', status: 'Available', capacity: '132' },
  { name: 'Advanced TypeScript', enrollments: '8,104', status: 'Available', capacity: '84' },
  { name: 'Product Strategy', enrollments: '6,902', status: 'Limited', capacity: '18' },
  { name: 'UX Research Lab', enrollments: '4,331', status: 'Available', capacity: '56' },
];

const bars = [56, 72, 48, 84, 64, 90, 58, 76, 68, 88, 62, 80];
const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

export const DashboardContent = () => {
  return (
    <div className="space-y-4 text-sm text-[var(--app-text-soft)]">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--app-text)]">Dashboard</h1>
        <span className="text-xs text-[var(--app-muted)]">Today</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          const isUp = item.trend === 'up';

          return (
            <div key={item.label} className="rounded border border-[var(--app-border)] bg-[var(--app-panel)] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase text-[var(--app-muted)]">{item.label}</span>
                <Icon className="h-4 w-4 text-[var(--app-accent)]" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xl font-semibold text-[var(--app-text)]">{item.value}</span>
                <span className={`flex items-center gap-1 text-xs font-medium ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {item.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3 xl:grid-cols-[0.85fr_1.45fr]">
        <section className="rounded border border-[var(--app-border)] bg-[var(--app-panel)]">
          <div className="border-b border-[var(--app-border)] px-4 py-3">
            <h2 className="text-sm font-semibold text-[var(--app-text)]">Categories</h2>
          </div>
          <div className="p-4">
            <div className="mb-4 flex items-end justify-between">
              <span className="text-2xl font-semibold text-[var(--app-text)]">15,685</span>
              <span className="text-xs text-[var(--app-muted)]">Total activity</span>
            </div>
            <div className="space-y-3.5">
              {categories.map((category) => (
                <div key={category.name}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span>{category.name}</span>
                    <span className="text-[var(--app-text)]">{category.value}</span>
                  </div>
                  <div className="h-1.5 bg-[var(--app-border)]">
                    <div className="h-full bg-[var(--app-accent)]" style={{ width: category.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded border border-[var(--app-border)] bg-[var(--app-panel)]">
          <div className="flex items-center justify-between border-b border-[var(--app-border)] px-4 py-3">
            <h2 className="text-sm font-semibold text-[var(--app-text)]">Learning Trend</h2>
            <div className="flex gap-3 text-xs text-[var(--app-muted)]">
              <span>Enrollments</span>
              <span>Completion</span>
            </div>
          </div>
          <div className="px-4 py-3">
            <div className="flex h-48 items-end gap-2 border-b border-l border-[var(--app-border)] px-2 pb-3">
              {bars.map((height, index) => (
                <div key={`${months[index]}-${index}`} className="flex h-full flex-1 items-end gap-1">
                  <div className="w-full bg-[var(--app-accent)]" style={{ height: `${height}%` }} />
                  <div className="w-full bg-emerald-400/80" style={{ height: `${Math.max(height - 18, 18)}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-12 text-center text-[11px] text-[var(--app-muted)]">
              {months.map((month, index) => (
                <span key={`${month}-${index}`}>{month}</span>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="rounded border border-[var(--app-border)] bg-[var(--app-panel)]">
        <div className="flex items-center justify-between border-b border-[var(--app-border)] px-4 py-3">
          <h2 className="text-sm font-semibold text-[var(--app-text)]">Top Courses</h2>
          <button className="border border-[var(--app-border)] px-2.5 py-1 text-xs text-[var(--app-text-soft)] transition-colors hover:bg-[var(--app-hover)]">
            View all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead className="bg-[var(--app-panel-muted)] uppercase text-[var(--app-muted)]">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Course</th>
                <th className="px-4 py-2.5 font-semibold">Enrollments</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5 font-semibold">Capacity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--app-border)]">
              {courses.map((course) => (
                <tr key={course.name} className="hover:bg-[var(--app-hover)]">
                  <td className="px-4 py-3 font-medium text-[var(--app-text)]">{course.name}</td>
                  <td className="px-4 py-3 text-[var(--app-muted)]">{course.enrollments}</td>
                  <td className="px-4 py-3 text-emerald-400">{course.status}</td>
                  <td className="px-4 py-3">{course.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
