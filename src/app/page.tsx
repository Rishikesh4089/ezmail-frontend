import LandingHero from '@/components/HomePage/LandingHero';
import CTAButton from '@/components/HomePage/CTAButton';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50">
      <LandingHero />
      <CTAButton />
    </main>
  );
}
