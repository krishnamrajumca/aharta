import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Welcome to Aharta
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Your modern platform for seamless experiences. You've successfully signed in!
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
            Learn More
          </Button>
        </div>
        
        <div className="text-sm text-gray-500">
          Built with Next.js, Radix UI, and Tailwind CSS
        </div>
        
        <div className="pt-4">
          <Link href="/">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
              ← Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
