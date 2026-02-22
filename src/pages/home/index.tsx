import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          LMS Platform
        </h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
          Modern Learning Management System
        </h2>

        <p className="max-w-2xl text-gray-600 dark:text-gray-400 mb-8">
          Manage courses, students, instructors and track learning progress
          efficiently with a powerful and scalable LMS platform.
        </p>

        <Link
          to="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}