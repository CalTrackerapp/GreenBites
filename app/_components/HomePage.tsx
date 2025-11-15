"use client";
import Link from "next/link";
import {
  Leaf,
  TrendingDown,
  BarChart3,
  Sprout,
  Globe2,
  Zap,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-emerald-50 to-green-100 text-slate-800 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
      </div>

      <section className="relative flex flex-col items-center text-center px-6 pt-32 pb-40 overflow-hidden">
        <div className="max-w-6xl mx-auto z-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-green-100 px-4 py-2 rounded-full border border-emerald-200 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-semibold text-sm">
                Eco-Friendly Nutrition Tracking
              </span>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-800 via-emerald-700 to-green-600 bg-clip-text text-transparent">
              Nourish Yourself.
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
              Heal the Planet.
            </span>
          </h1>

          <p className="max-w-3xl text-xl md:text-2xl text-slate-600 leading-relaxed mb-12 font-medium">
            GreenBites helps you understand the impact of your meals — track
            your nutrition, visualize your carbon footprint, and take action
            toward a greener tomorrow.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Link
              href="/dashboard"
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <Zap className="w-5 h-5" />
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <Leaf className="absolute top-20 left-1/4 w-16 h-16 text-emerald-300 opacity-40 animate-[float_6s_ease-in-out_infinite]" />
        <Sprout className="absolute bottom-20 right-1/3 w-20 h-20 text-green-400 opacity-30 animate-[float_8s_ease-in-out_infinite]" />
        <Globe2 className="absolute top-1/3 right-1/4 w-12 h-12 text-teal-300 opacity-50 animate-[float_10s_ease-in-out_infinite]" />
      </section>

      <section className="relative px-8 md:px-0 py-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent mb-6">
              Why Choose GreenBites?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover how our platform transforms your relationship with food
              and the environment
            </p>
          </div>

          <div className="space-y-32">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
                  <img
                    src="home_page.jpg"
                    alt="Track Meals"
                    className="w-full rounded-2xl shadow-lg object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingDown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-800">
                    Track Your Carbon Footprint
                  </h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Every meal has an environmental cost. GreenBites helps you log
                  what you eat and instantly visualize your carbon savings
                  compared to traditional diets — empowering smarter,
                  sustainable choices.
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <CheckCircle className="w-5 h-5" />
                  <span>Real-time carbon tracking</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="lg:w-1/2">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
                  <img
                    src="eco-graph.jpg"
                    alt="Visual Insights"
                    className="w-full rounded-2xl shadow-lg object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-800">
                    Visualize Your Impact
                  </h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Your data deserves better than numbers. See your journey come
                  to life through clean, beautiful visualizations — helping you
                  stay motivated while making meaningful change.
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <CheckCircle className="w-5 h-5" />
                  <span>Beautiful data visualizations</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
                  <img
                    src="better_choices.jpg"
                    alt="Eco Choices"
                    className="w-full rounded-2xl shadow-lg object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-800">
                    Choose Greener Alternatives
                  </h3>
                </div>
                <p className="text-slate-600 text-lg leading-relaxed">
                  GreenBites recommends eco-friendly food swaps that balance
                  taste, health, and sustainability — because the right choice
                  should also be the easiest one.
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                  <CheckCircle className="w-5 h-5" />
                  <span>AI-powered recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
            <Globe2 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-bold mb-6">
            Together, We Make an Impact
          </h2>
          <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto">
            Join thousands of conscious eaters reducing emissions one meal at a
            time. Your plate has power — use it wisely.
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-white text-emerald-700 font-bold text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            <Sparkles className="w-6 h-6" />
            Join GreenBites
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      <footer className="py-16 text-center bg-gradient-to-r from-slate-50 to-emerald-50 border-t border-emerald-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              GreenBites
            </span>
          </div>
          <p className="text-slate-600 text-lg font-medium mb-4">
            © {new Date().getFullYear()} GreenBites — Eat Better. Live Greener.
          </p>
          <p className="text-slate-500 text-sm">
            Making sustainable nutrition accessible to everyone
          </p>
        </div>
      </footer>
    </div>
  );
}
