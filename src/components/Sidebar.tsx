"use client";


const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Courses", path: "/dashboard/courses" },
  { name: "Students", path: "/dashboard/students" },
  { name: "Instructors", path: "/dashboard/instructors" },
  { name: "Settings", path: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="p-6 text-xl font-bold text-gray-900 dark:text-white">
        LMS Panel
      </div>

      <nav className="space-y-2 px-4">
        {menuItems.map((item) => {
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`block rounded-lg px-4 py-2 transition-all duration-200
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}