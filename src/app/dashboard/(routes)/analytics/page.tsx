"use client";

import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Dummy data for analytics
const emailData = {
  monthlySent: [125, 150, 180, 210, 190, 230, 250, 270, 240, 260, 280, 300],
  openedRates: [72, 68, 75, 80, 78, 82, 85, 83, 79, 81, 84, 86],
  recipientTypes: {
    work: 65,
    personal: 20,
    newsletters: 10,
    support: 5,
  },
  busiestHours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(hour => ({
    hour: `${hour}:00`,
    count: Math.floor(Math.random() * 50) + 30,
  })),
  billingHistory: [
    { month: "Jan", amount: 9.99 },
    { month: "Feb", amount: 9.99 },
    { month: "Mar", amount: 14.99 },
    { month: "Apr", amount: 14.99 },
    { month: "May", amount: 19.99 },
    { month: "Jun", amount: 19.99 },
    { month: "Jul", amount: 19.99 },
    { month: "Aug", amount: 24.99 },
    { month: "Sep", amount: 24.99 },
    { month: "Oct", amount: 24.99 },
    { month: "Nov", amount: 29.99 },
    { month: "Dec", amount: 29.99 },
  ],
  planUsage: {
    emailsSent: 2780,
    storageUsed: 45, // in GB
    contacts: 420,
  },
  topRecipients: [
    { email: "team@startup.io", count: 42 },
    { email: "alice@example.com", count: 38 },
    { email: "client@business.com", count: 35 },
    { email: "hr@company.org", count: 28 },
    { email: "johndoe@domain.com", count: 25 },
  ],
};

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("year");
  const [activeTab, setActiveTab] = useState<"usage" | "billing">("usage");

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Email Analytics</h1>
            <p className="text-gray-600">
              Insights and statistics about your email usage
            </p>
          </div>
          <div className="flex space-x-2 bg-gray-200 p-1 rounded-lg">
            <button
              onClick={() => setTimeRange("week")}
              className={`px-4 py-2 rounded-md ${
                timeRange === "week" ? "bg-white shadow" : ""
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange("month")}
              className={`px-4 py-2 rounded-md ${
                timeRange === "month" ? "bg-white shadow" : ""
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange("year")}
              className={`px-4 py-2 rounded-md ${
                timeRange === "year" ? "bg-white shadow" : ""
              }`}
            >
              Year
            </button>
          </div>
        </div>

        <div className="flex space-x-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("usage")}
            className={`pb-2 px-4 ${
              activeTab === "usage"
                ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                : "text-gray-500"
            }`}
          >
            Usage Analytics
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`pb-2 px-4 ${
              activeTab === "billing"
                ? "border-b-2 border-blue-500 text-blue-600 font-medium"
                : "text-gray-500"
            }`}
          >
            Billing Insights
          </button>
        </div>

        {activeTab === "usage" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Emails Sent Over Time */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-4">Emails Sent</h2>
              <div className="h-64">
                <Line
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    datasets: [
                      {
                        label: "Emails Sent",
                        data: emailData.monthlySent,
                        borderColor: "rgb(59, 130, 246)",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        tension: 0.3,
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <span className="font-medium text-green-600">+12%</span> increase
                from last year
              </div>
            </motion.div>

            {/* Open Rates */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-4">Open Rates</h2>
              <div className="h-64">
                <Line
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    datasets: [
                      {
                        label: "Open Rate (%)",
                        data: emailData.openedRates,
                        borderColor: "rgb(16, 185, 129)",
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        tension: 0.3,
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        min: 60,
                        max: 100,
                      },
                    },
                  }}
                />
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Average: <span className="font-medium">78.5%</span> (Industry
                avg: 72%)
              </div>
            </motion.div>

            {/* Recipient Types */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-4">Recipient Types</h2>
              <div className="h-64">
                <Pie
                  data={{
                    labels: Object.keys(emailData.recipientTypes),
                    datasets: [
                      {
                        data: Object.values(emailData.recipientTypes),
                        backgroundColor: [
                          "rgba(59, 130, 246, 0.7)",
                          "rgba(16, 185, 129, 0.7)",
                          "rgba(245, 158, 11, 0.7)",
                          "rgba(239, 68, 68, 0.7)",
                        ],
                        borderColor: [
                          "rgba(59, 130, 246, 1)",
                          "rgba(16, 185, 129, 1)",
                          "rgba(245, 158, 11, 1)",
                          "rgba(239, 68, 68, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: "right",
                      },
                    },
                  }}
                />
              </div>
            </motion.div>

            {/* Busiest Hours */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-4">Busiest Hours</h2>
              <div className="h-64">
                <Bar
                  data={{
                    labels: emailData.busiestHours.map(item => item.hour),
                    datasets: [
                      {
                        label: "Emails Sent",
                        data: emailData.busiestHours.map(item => item.count),
                        backgroundColor: "rgba(99, 102, 241, 0.7)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Peak time:{" "}
                <span className="font-medium">
                  {emailData.busiestHours.reduce((prev, current) =>
                    prev.count > current.count ? prev : current
                  ).hour}
                </span>
              </div>
            </motion.div>

            {/* Plan Usage */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-4">Plan Usage</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Emails Sent
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {emailData.planUsage.emailsSent}/5000
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          (emailData.planUsage.emailsSent / 5000) * 100,
                          100
                        )}%`,
                      }}
                      transition={{ duration: 1 }}
                      className="bg-blue-600 h-2.5 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Storage Used
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {emailData.planUsage.storageUsed}/100 GB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${emailData.planUsage.storageUsed}%`,
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="bg-green-500 h-2.5 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Contacts
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {emailData.planUsage.contacts}/500
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(emailData.planUsage.contacts / 500) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="bg-yellow-500 h-2.5 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Top Recipients */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-4">Top Recipients</h2>
              <div className="space-y-3">
                {emailData.topRecipients.map((recipient, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {recipient.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {recipient.email}
                      </div>
                      <div className="text-xs text-gray-500">
                        {recipient.count} emails
                      </div>
                    </div>
                    <div className="w-16">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              (recipient.count /
                                emailData.topRecipients[0].count) *
                              100
                            }%`,
                          }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-purple-600 h-1.5 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Billing History */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-4">Billing History</h2>
              <div className="h-64">
                <Bar
                  data={{
                    labels: emailData.billingHistory.map(item => item.month),
                    datasets: [
                      {
                        label: "Amount ($)",
                        data: emailData.billingHistory.map(item => item.amount),
                        backgroundColor: "rgba(124, 58, 237, 0.7)",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Total spent this year:{" "}
                <span className="font-medium">
                  $
                  {emailData.billingHistory
                    .reduce((sum, item) => sum + item.amount, 0)
                    .toFixed(2)}
                </span>
              </div>
            </motion.div>

            {/* Plan Comparison */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-4">Plan Comparison</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <h3 className="font-medium text-gray-900">Basic</h3>
                  <p className="text-2xl font-bold my-2">$9.99</p>
                  <p className="text-sm text-gray-600">500 emails/mo</p>
                  <p className="text-sm text-gray-600">10GB storage</p>
                  <p className="text-sm text-gray-600">100 contacts</p>
                </div>
                <div className="border-2 border-blue-500 rounded-lg p-4 text-center bg-blue-50 relative">
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Current
                  </div>
                  <h3 className="font-medium text-gray-900">Pro</h3>
                  <p className="text-2xl font-bold my-2">$19.99</p>
                  <p className="text-sm text-gray-600">2500 emails/mo</p>
                  <p className="text-sm text-gray-600">50GB storage</p>
                  <p className="text-sm text-gray-600">500 contacts</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <h3 className="font-medium text-gray-900">Business</h3>
                  <p className="text-2xl font-bold my-2">$29.99</p>
                  <p className="text-sm text-gray-600">Unlimited emails</p>
                  <p className="text-sm text-gray-600">100GB storage</p>
                  <p className="text-sm text-gray-600">Unlimited contacts</p>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition">
                  Upgrade Plan
                </button>
              </div>
            </motion.div>

            {/* Cost Analysis */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-4">Cost Analysis</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Cost per email
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      $0.007
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "70%" }}
                      transition={{ duration: 1 }}
                      className="bg-indigo-500 h-2.5 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Industry average: $0.012
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Storage cost
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      $0.15/GB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "30%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="bg-pink-500 h-2.5 rounded-full"
                    ></motion.div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Industry average: $0.25/GB
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      Savings vs Basic
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      42%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "42%" }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="bg-green-500 h-2.5 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        Visa ending in 4242
                      </div>
                      <div className="text-xs text-gray-500">Expires 04/2026</div>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm font-medium">
                    Edit
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        Bank Transfer
                      </div>
                      <div className="text-xs text-gray-500">
                        Account ending in 7890
                      </div>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
              <button className="mt-4 w-full border border-dashed border-gray-300 rounded-lg py-2 text-sm font-medium text-blue-600 hover:bg-gray-50 transition">
                + Add Payment Method
              </button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;