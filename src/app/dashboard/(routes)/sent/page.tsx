"use client";

import { useState } from "react";

const dummyEmails = [
  {
    id: 1,
    to: "alice@example.com",
    subject: "Project Update",
    time: "2025-04-16T14:30:00",
    body: "Hi Alice, just sending the final update on the project before submission. Regards, Rishikesh"
  },
  {
    id: 2,
    to: "team@startup.io",
    subject: "Pitch Deck Submission",
    time: "2025-04-15T10:15:00",
    body: "Hey Team, please find attached the final pitch deck. Let's go big!"
  },
  {
    id: 3,
    to: "johndoe@domain.com",
    subject: "Research Paper Edits",
    time: "2025-04-13T18:45:00",
    body: "Hi John, I've added the latest citations and tweaked the conclusion as discussed."
  },
  {
    id: 4,
    to: "hr@company.org",
    subject: "Leave Application",
    time: "2025-04-10T09:20:00",
    body: "Dear HR Team, I would like to apply for leave from April 20-25 for personal reasons. Please approve."
  },
  {
    id: 5,
    to: "client@business.com",
    subject: "Proposal Draft",
    time: "2025-04-08T16:45:00",
    body: "Attached please find the draft proposal for your review. Looking forward to your feedback."
  },
  {
    id: 6,
    to: "support@service.com",
    subject: "Account Issue",
    time: "2025-04-05T11:10:00",
    body: "Hello Support Team, I'm unable to access my account despite resetting the password. Please help."
  },
  {
    id: 7,
    to: "john.doe@partner.net",
    subject: "Meeting Reschedule",
    time: "2025-04-03T13:25:00",
    body: "Hi John, could we reschedule our Friday meeting to Monday at the same time? Let me know what works for you."
  },
  {
    id: 8,
    to: "newsletter@tech.io",
    subject: "Subscription Cancellation",
    time: "2025-03-30T08:15:00",
    body: "Please cancel my subscription to your newsletter. The unsubscribe link doesn't seem to work."
  },
  {
    id: 9,
    to: "professor@university.edu",
    subject: "Question About Assignment",
    time: "2025-03-28T19:30:00",
    body: "Dear Professor, I have a question about the grading criteria for assignment 3. Could we discuss this during office hours?"
  },
  {
    id: 10,
    to: "events@conference.org",
    subject: "Speaker Confirmation",
    time: "2025-03-25T14:50:00",
    body: "This email confirms my participation as a speaker at your upcoming conference on May 15th."
  },
  {
    id: 11,
    to: "supplier@vendor.co",
    subject: "Order Inquiry",
    time: "2025-03-22T10:05:00",
    body: "Could you provide a quote for 50 units of product X with delivery by April 10th?"
  },
  {
    id: 12,
    to: "friend@personal.com",
    subject: "Weekend Plans",
    time: "2025-03-20T17:30:00",
    body: "Hey! Are we still on for hiking this weekend? The weather forecast looks great!"
  },
  {
    id: 13,
    to: "admin@community.org",
    subject: "Volunteer Application",
    time: "2025-03-18T12:40:00",
    body: "I'm interested in volunteering for the upcoming charity event. Please send me more details about available roles."
  }
];

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium", // Valid values: "short", "medium", "long", "full"
    timeStyle: "short",  // Valid values: "short", "medium", "long", "full"
  };

  return new Date(dateString).toLocaleString(undefined, options);
}


export default function SentMailsPage() {
  const [selectedEmail, setSelectedEmail] = useState<{ id: number; to: string; subject: string; time: string; body: string } | null>(null);
  const [filter, setFilter] = useState("latest");
  const [search, setSearch] = useState("");

  const filteredEmails = dummyEmails
    .filter(email =>
      email.subject.toLowerCase().includes(search.trim().toLowerCase()) ||
      email.to.toLowerCase().includes(search.trim().toLowerCase())
    )
    .sort((a, b) =>
      filter === "latest"
        ? new Date(b.time).getTime() - new Date(a.time).getTime()
        : new Date(a.time).getTime() - new Date(b.time).getTime()
    );

  if (selectedEmail) {
    return (
      <div className="p-6">
        <button
          onClick={() => setSelectedEmail(null)}
          className="mb-4 text-blue-600 hover:underline"
          aria-label="Back to Sent Mails"
        >
          ← Back to Sent Mails
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {selectedEmail.subject}
        </h1>
        <p className="text-gray-600 mb-4">
          To: <span className="font-medium">{selectedEmail.to}</span>
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Sent on: {formatDate(selectedEmail.time)}
        </p>
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {selectedEmail.body}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Sent Mails</h1>
      <p className="mt-2 text-gray-600 mb-4">Track all your sent emails here.</p>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by subject or recipient..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full sm:w-auto border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="latest">Sort by Latest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
      </div>

      {/* Email List */}
      <div className="space-y-4">
        {filteredEmails.length === 0 ? (
          <p className="text-gray-500">No emails match your search criteria.</p>
        ) : (
          filteredEmails.map(email => (
            <div
              key={email.id}
              onClick={() => setSelectedEmail(email)}
              className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 cursor-pointer transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {email.subject}
                  </h2>
                  <p className="text-sm text-gray-600">To: {email.to}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(email.time)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
