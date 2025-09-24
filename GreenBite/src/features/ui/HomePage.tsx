import { Leaf, TrendingDown, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col">
      {/* Hero Section */}

      <header className="flex flex-col items-center justify-center text-center py-20 px-6">
        <div className="flex items-center gap-3 mb-6">
          <Leaf className="h-12 w-12 text-green-600" />
          <h1 className="text-5xl font-extrabold text-green-800 tracking-tight">
            GreenBites
          </h1>
        </div>
        <p className="max-w-2xl text-lg md:text-xl text-green-700 leading-relaxed">
          Track your meals, reduce your carbon footprint, and make every bite
          count for a healthier planet.
        </p>
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 rounded-2xl bg-green-600 text-white font-semibold text-lg shadow-md hover:bg-green-700 transition">
            Get Started
          </button>
          <button className="px-6 py-3 rounded-2xl bg-white text-green-700 font-semibold text-lg shadow-md hover:bg-green-50 border border-green-200 transition">
            Learn More
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-8 md:px-20 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <TrendingDown className="h-10 w-10 text-green-600 mb-4" />
          <h2 className="text-xl font-bold text-green-800 mb-2">
            Carbon Footprint Tracking
          </h2>
          <p className="text-green-700">
            Log your meals and instantly see how much CO₂ you saved compared to
            the average diet.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <BarChart3 className="h-10 w-10 text-green-600 mb-4" />
          <h2 className="text-xl font-bold text-green-800 mb-2">
            Visual Insights
          </h2>
          <p className="text-green-700">
            Beautiful charts and reports show your progress towards sustainable
            eating goals.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <Leaf className="h-10 w-10 text-green-600 mb-4" />
          <h2 className="text-xl font-bold text-green-800 mb-2">
            Eco-Friendly Choices
          </h2>
          <p className="text-green-700">
            Get recommendations for greener food swaps that benefit both your
            health and the planet.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="text-center py-12 bg-green-600 text-white mt-auto">
        <h2 className="text-3xl font-extrabold mb-4">
          Ready to take a greener bite?
        </h2>
        <button className="px-8 py-4 rounded-2xl bg-white text-green-700 font-semibold text-lg shadow-md hover:bg-green-50 transition">
          Join GreenBites Today
        </button>
      </footer>
    </div>
  );
}
