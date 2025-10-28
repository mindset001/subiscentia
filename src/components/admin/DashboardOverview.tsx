import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#4C406E] mb-2">Dashboard Overview</h1>
      <p className="text-[#4C406E] mb-6">Welcome back. Here's what's happening today.</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#4C406E] rounded-sm">
          <CardHeader className="text-white">Total Revenue</CardHeader>
          <CardContent className="text-white">
            <div className="text-2xl font-bold ">$847</div>
            <div className="text-xs ">+12% from last month</div>
          </CardContent>
        </Card>
        <Card className="bg-[#4C406E] rounded-sm">
          <CardHeader className="text-white">Orders</CardHeader>
          <CardContent className="text-white">
            <div className="text-2xl font-bold ">47</div>
            <div className="text-xs ">+3 from last yesterday</div>
          </CardContent>
        </Card>
        <Card className="bg-[#4C406E] rounded-sm">
          <CardHeader className="text-white">Avg Order Value</CardHeader>
          <CardContent className="text-white">
            <div className="text-2xl font-bold ">$47</div>
            <div className="text-xs ">+12% from last week</div>
          </CardContent>
        </Card>
        <Card className="bg-[#4C406E] rounded-sm">
          <CardHeader className="text-white">Stock Alerts</CardHeader>
          <CardContent className="text-white">
            <div className="text-2xl font-bold ">3</div>
            <div className="text-xs ">item below minimum stock</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Revenue trend (top) and Recent orders (bottom) */}
        <div className="space-y-6">
          <Card className="rounded-sm shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#4C406E]">Revenue trend</h3>
                  <p className="text-xs text-gray-500">Last 7 days performance</p>
                </div>
                <div className="text-sm text-gray-400">400 - 0</div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Simple illustrative SVG line chart to mimic the mockup */}
              <div className="w-full h-56">
                <svg viewBox="0 0 600 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
                  {/* grid lines */}
                  {[0,1,2,3,4].map(i => (
                    <line key={i} x1={20} x2={580} y1={20 + i*36} y2={20 + i*36} stroke="#f1f1f1" />
                  ))}
                  {/* example path */}
                  <path d="M40 130 C110 90 180 150 250 120 C320 90 390 110 460 80 C520 55 560 120 580 40"
                    fill="none" stroke="#6B46C1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  {/* dots */}
                  {[[40,130],[110,90],[180,150],[250,120],[320,90],[390,110],[460,80],[520,55],[560,120],[580,40]].map((d,i)=> (
                    <circle key={i} cx={d[0]} cy={d[1]} r="4" fill="#fff" stroke="#6B46C1" />
                  ))}
                </svg>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm shadow-none">
            <CardHeader>
              <div>
                <h3 className="text-lg font-semibold text-[#4C406E]">Recent orders</h3>
                <p className="text-xs text-gray-500">Latest customer purchases</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[1,2,3].map(i => (
                  <li key={i} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-[#4C406E]">#2534</div>
                      <div className="text-xs text-gray-500">Adam Lukat</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">$537</div>
                      <div className="text-xs text-gray-400">2hr ago</div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right column: Top Products (top) and Activity feed (bottom) */}
        <div className="space-y-6">
          <Card className="rounded-sm shadow-none">
            <CardHeader>
              <div>
                <h3 className="text-lg font-semibold text-[#4C406E]">Top Products</h3>
                <p className="text-xs text-gray-500">Best performers this week</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Midnight Garden","Midnight Garden","Midnight Garden","Midnight Garden"].map((name, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-[#4C406E]">{name}</div>
                      <div className="text-xs text-gray-400">Noir collection</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-[#4C406E]">123 Sold</div>
                      <div className="text-xs text-gray-400">23 in stock</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-sm shadow-none">
            <CardHeader>
              <div>
                <h3 className="text-lg font-semibold text-[#4C406E]">Activity feed</h3>
                <p className="text-xs text-gray-500">Recent system activities</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#4C406E] mt-2" />
                  <div>
                    <div className="text-sm text-[#4C406E]">Product added: Dessert Rose au de parfum</div>
                    <div className="text-xs text-gray-400">2 mins ago</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#4C406E] mt-2" />
                  <div>
                    <div className="text-sm text-[#4C406E]">Order fulfilled: Order #8642</div>
                    <div className="text-xs text-gray-400">2 mins ago</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#4C406E] mt-2" />
                  <div>
                    <div className="text-sm text-[#4C406E]">New subscriber: newsletter@subiscentia.com</div>
                    <div className="text-xs text-gray-400">2 mins ago</div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
