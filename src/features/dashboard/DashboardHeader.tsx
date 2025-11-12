type HeaderProps = {
  username: string;
};

export default function DashboardHeader({ username }: HeaderProps) {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className="relative bg-white/90 backdrop-blur-md border-b border-white/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-800 via-green-700 to-teal-700 bg-clip-text text-transparent hover:animate-none transition-all duration-300 hover:scale-105 drop-shadow-lg">
              {greeting}, {username}! 👋
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              Track your nutrition and environmental impact
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">
                  Live Tracking
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                <span className="text-blue-700 text-sm font-medium">
                  🌱 Eco-Friendly
                </span>
              </div>
            </div>
          </div>
          <div className="text-right space-y-2">
            <div className="text-sm text-slate-500 font-medium">
              Today's Date
            </div>
            <div className="text-xl font-bold text-slate-700 bg-white/50 px-4 py-2 rounded-xl">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
