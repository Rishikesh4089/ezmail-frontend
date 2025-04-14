'use client';

import { useRouter } from 'next/navigation';

export default function CTAButton() {
  const router = useRouter();

  const handleClick = () => {
    const user = localStorage.getItem('user');

    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all cursor-pointer"
    >
      Start Sending Mails
    </button>
  );
}
