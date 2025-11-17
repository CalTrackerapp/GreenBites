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
    <div className=" bg-black/20  shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-green-50 to-emerald-50 bg-clip-text text-transparent drop-shadow-2xl">
              {greeting}, {username}! 👋
            </h1>
            <p className="text-white text-lg font-medium ">
              Track your nutrition and environmental impact
            </p>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-2 bg-white/10 border border-white/40 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse shadow-green-300/40"></div>
                <span className="text-white text-sm font-medium drop-shadow-md">
                  Live Tracking
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 border border-white/40 px-3 py-1 rounded-full">
                <span className="text-white text-sm font-medium drop-shadow-md">
                  🌱 Eco-Friendly
                </span>
              </div>
            </div>
          </div>
          <div className="text-right ">
            <div className="text-xl font-bold text-white px-4 py-2 rounded-xl bg-white/10  border border-white/30 ">
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
