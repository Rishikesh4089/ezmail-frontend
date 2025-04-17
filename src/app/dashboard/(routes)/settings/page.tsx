"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiBell, FiCreditCard, FiShield, FiHelpCircle, FiLogOut } from "react-icons/fi";

const SettingsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("account");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sounds: true,
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    recoveryEmail: "backup@example.com",
  });
  const [profile, setProfile] = useState({
    name: "Rishikesh",
    email: "rishikesh@example.com",
    signature: "Best regards,\nRishikesh",
  });

  const handleLogout = () => {
    // In a real app, you would call your logout API here
    console.log("Logging out...");
    localStorage.removeItem('user')
    router.push("/auth");
  };

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
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">
            Manage your account preferences and security settings
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.3 }}
            className="w-full md:w-56 flex-shrink-0"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${
                  activeTab === "account" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FiUser className="mr-3" />
                Account
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${
                  activeTab === "notifications" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FiBell className="mr-3" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${
                  activeTab === "security" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FiShield className="mr-3" />
                Security
              </button>
              <button
                onClick={() => setActiveTab("billing")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${
                  activeTab === "billing" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FiCreditCard className="mr-3" />
                Billing
              </button>
              <button
                onClick={() => setActiveTab("support")}
                className={`w-full flex items-center px-4 py-3 rounded-lg ${
                  activeTab === "support" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FiHelpCircle className="mr-3" />
                Support
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 mt-2"
              >
                <FiLogOut className="mr-3" />
                Log Out
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex-1"
          >
            {activeTab === "account" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FiUser className="mr-2" /> Account Information
                </h2>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
                    />
                    <p className="mt-1 text-xs text-gray-500">Contact support to change your email address</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Signature</label>
                    <textarea
                      value={profile.signature}
                      onChange={(e) => setProfile({...profile, signature: e.target.value})}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">This will appear at the bottom of all your sent emails</p>
                  </div>
                  
                  <div className="pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FiBell className="mr-2" /> Notification Preferences
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive important updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => setNotifications({...notifications, email: !notifications.email})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Push Notifications</h3>
                      <p className="text-sm text-gray-500">Get alerts on your mobile device</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={() => setNotifications({...notifications, push: !notifications.push})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">Sounds</h3>
                      <p className="text-sm text-gray-500">Play sounds for new emails</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.sounds}
                        onChange={() => setNotifications({...notifications, sounds: !notifications.sounds})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FiShield className="mr-2" /> Security Settings
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Add an extra layer of security to your account
                      </p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={security.twoFactor}
                          onChange={() => setSecurity({...security, twoFactor: !security.twoFactor})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    {security.twoFactor && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-800">
                          Two-factor authentication is now enabled. You'll need to enter a code from your authenticator app when logging in.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Recovery Email</h3>
                    <div className="flex items-center">
                      <input
                        type="email"
                        value={security.recoveryEmail}
                        onChange={(e) => setSecurity({...security, recoveryEmail: e.target.value})}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="ml-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition">
                        Verify
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      This email will be used for account recovery if you lose access
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition">
                      Update Security Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FiCreditCard className="mr-2" /> Billing Information
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Current Plan</h3>
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold">Pro Plan</h4>
                          <p className="text-sm text-gray-600">$19.99/month</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Change Plan
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <FiCreditCard className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Visa ending in 4242</h4>
                          <p className="text-sm text-gray-600">Expires 04/2026</p>
                        </div>
                        <button className="ml-auto text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Billing History</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Apr 15, 2025</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$19.99</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Paid</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Mar 15, 2025</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$19.99</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Paid</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">Feb 15, 2025</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">$14.99</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">Paid</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "support" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FiHelpCircle className="mr-2" /> Support & Help
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Help Center</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Find answers to common questions in our help center.
                    </p>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition">
                      Visit Help Center
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Contact Support</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition">
                      Contact Support
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">System Status</h3>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm font-medium">All systems operational</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        Last updated: April 17, 2025 at 10:30 AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;