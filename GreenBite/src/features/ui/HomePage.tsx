import { Leaf, TrendingDown, BarChart3, Sprout, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-green-50 to-green-100 text-gray-800 overflow-hidden">
      <section className="relative flex flex-col items-center text-center px-6 pt-28 pb-32 overflow-hidden border-b-4 border-green-200 shadow-[inset_0_-2px_10px_rgba(34,197,94,0.15)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(21,128,61,0.2),transparent_70%)]" />

        <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-6 leading-tight z-10">
          Nourish Yourself. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
            Heal the Planet.
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-green-800/90 leading-relaxed mb-10 z-10">
          GreenBites helps you understand the impact of your meals — track your
          nutrition, visualize your carbon footprint, and take action toward a
          greener tomorrow.
        </p>

        <div className="flex flex-wrap justify-center gap-5 z-10">
          <Link
            to="/dashboard"
            className="px-8 py-3 rounded-full bg-green-600 text-white font-semibold text-lg shadow-md hover:bg-green-700 transition-all"
          >
            Get Started
          </Link>
          <Link
            to="/learn-more"
            className="px-8 py-3 rounded-full bg-white border-2 border-green-500 text-green-700 font-semibold text-lg shadow-sm hover:bg-green-50 transition-all"
          >
            Learn More
          </Link>
        </div>

        <Leaf className="absolute top-12 left-1/4 w-12 h-12 text-green-300 opacity-40 animate-[float_6s_ease-in-out_infinite]" />
        <Sprout className="absolute bottom-16 right-1/3 w-14 h-14 text-green-400 opacity-30 animate-[float_8s_ease-in-out_infinite]" />
      </section>

      <section className="px-8 md:px-20 py-24 flex flex-col gap-32 border-y-4 border-green-100 bg-white/50">
        <div className="flex flex-col md:flex-row items-center gap-10 border-l-4 border-green-300 pl-6 md:pl-10">
          <img
            src="home_page.jpg"
            alt="Track Meals"
            className="w-full md:w-1/2 rounded-3xl shadow-xl border-2 border-green-100 object-cover hover:scale-[1.02] transition-transform"
          />
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <TrendingDown className="w-8 h-8 text-green-600" />
              Track Your Carbon Footprint
            </h2>
            <p className="text-green-700 text-lg leading-relaxed">
              Every meal has an environmental cost. GreenBites helps you log
              what you eat and instantly visualize your carbon savings compared
              to traditional diets — empowering smarter, sustainable choices.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-10 border-r-4 border-green-300 pr-6 md:pr-10">
          <img
            src="eco-graph.jpg"
            alt="Visual Insights"
            className="w-full md:w-1/2 rounded-3xl shadow-xl border-2 border-green-100 object-cover hover:scale-[1.02] transition-transform"
          />
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-green-600" />
              Visualize Your Impact
            </h2>
            <p className="text-green-700 text-lg leading-relaxed">
              Your data deserves better than numbers. See your journey come to
              life through clean, beautiful visualizations — helping you stay
              motivated while making meaningful change.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 border-l-4 border-green-300 pl-6 md:pl-10">
          <img
            src="better_choices.jpg"
            alt="Eco Choices"
            className="w-full md:w-1/2 rounded-3xl shadow-xl border-2 border-green-100 object-cover hover:scale-[1.02] transition-transform"
          />
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <Leaf className="w-8 h-8 text-green-600" />
              Choose Greener Alternatives
            </h2>
            <p className="text-green-700 text-lg leading-relaxed">
              GreenBites recommends eco-friendly food swaps that balance taste,
              health, and sustainability — because the right choice should also
              be the easiest one.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-24 text-center border-t-4 border-green-400 shadow-[inset_0_2px_8px_rgba(255,255,255,0.15)]">
        <div className="max-w-3xl mx-auto px-6">
          <Globe2 className="w-16 h-16 mx-auto mb-6 text-green-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" />
          <h2 className="text-4xl font-extrabold mb-4">
            Together, We Make an Impact
          </h2>
          <p className="text-lg text-green-50 mb-10">
            Join thousands of conscious eaters reducing emissions one meal at a
            time. Your plate has power — use it wisely.
          </p>
          <Link
            to="/sign-up"
            className="px-10 py-4 rounded-full bg-white text-green-700 font-semibold text-lg shadow-md hover:bg-green-50 transition"
          >
            Join GreenBites
          </Link>
        </div>
      </section>

      <footer className="py-10 text-center text-green-800 bg-green-50 border-t-4 border-green-200">
        <p className="text-sm">
          © {new Date().getFullYear()} GreenBites — Eat Better. Live Greener.
        </p>
      </footer>
    </div>
  );
}
