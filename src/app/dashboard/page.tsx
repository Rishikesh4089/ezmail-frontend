"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiBarChart2,
  FiUsers,
  FiArrowRight,
  FiSend,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import ComposeDrawer from "../../components/ComposeDrawer/ComposeDrawer"; // adjust the path as needed

export default function DashboardPage() {
  const [isComposeOpen, setComposeOpen] = useState(false);
  const router = useRouter();

  const handleActionClick = (href: string) => {
    if (href === "compose-drawer") {
      setComposeOpen(true);
    } else {
      router.push(href);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back to EzMail</h1>
          <p className="text-gray-600 mt-1">
            Your centralized dashboard to monitor, manage, and improve your email campaigns.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Emails Sent", value: "1,452", icon: <FiSend />, color: "bg-blue-100 text-blue-600" },
            { label: "Open Rate", value: "68%", icon: <FiBarChart2 />, color: "bg-green-100 text-green-600" },
            { label: "Bounce Rate", value: "2.1%", icon: <FiMail />, color: "bg-red-100 text-red-600" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">{stat.label}</span>
                <span className="text-xl font-semibold text-gray-900">{stat.value}</span>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            { title: "Compose Email", desc: "Start a new message", icon: <FiMail />, href: "compose-drawer" },
            { title: "Sent Emails", desc: "View your email history", icon: <FiSend />, href: "/dashboard/sent" },
          ].map((action, i) => (
            <motion.button
              key={i}
              onClick={() => handleActionClick(action.href)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition text-left w-full"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.desc}</p>
                </div>
                <div className="text-blue-600 text-xl">{action.icon}</div>
              </div>
              <div className="mt-3 text-blue-600 text-sm flex items-center">
                Go <FiArrowRight className="ml-1" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <ul className="space-y-4 text-sm text-gray-700">
            <li>Sent campaign “Spring Sale” to 650 recipients • 3 hours ago</li>
            <li>50 new opens from “Welcome Series” campaign • 7 hours ago</li>
            <li>Added 24 new contacts to “Subscribers” list • Yesterday</li>
            <li>2 emails bounced in “Promo Blast” • 2 days ago</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Compose Drawer Component */}
      <AnimatePresence>
        {isComposeOpen && (
          <ComposeDrawer isOpen={isComposeOpen} onClose={() => setComposeOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
