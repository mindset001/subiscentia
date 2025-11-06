import { Card } from "@/components/ui/card";
import { TrendingUp, FileText, Users, BarChart } from "lucide-react";

export default function AnalyticsReports() {
    return (
        <div className="">
            <h1 className="text-3xl font-bold text-[#4C406E] mb-2 font-sackers">Analytics & Reports</h1>
            <p className="text-[#4C406E] mb-6 font-circular">Insights and performance metrics</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-purple-100 rounded-none shadow-none">
                    <div className="p-2 flex flex-col gap-4">
                        <div className="flex justify-between">
                            <div className="text-xs text-[#4C406E]">Total Revenue</div>
                            <TrendingUp className="text-[#4C406E]" />
                        </div>
                        <div>

                            <div className="text-2xl font-bold text-[#4C406E]">$847,468.97</div>

                        </div>
                        <div className="flex gap-2">
                            <TrendingUp className="text-[#4C406E] w-4" />
                            <div className="text-xs text-gray-500">+12% from last month</div>
                        </div>

                    </div>
                </Card>

                  <Card className="bg-purple-100 rounded-none shadow-none">
                    <div className="p-2 flex flex-col gap-4">
                        <div className="flex justify-between">
                            <div className="text-xs text-[#4C406E]">Total Orders</div>
                            <FileText className="text-[#4C406E]" />
                        </div>
                        <div>

                            <div className="text-2xl font-bold text-[#4C406E]">$47</div>

                        </div>
                        <div className="flex gap-2">
                            <TrendingUp className="text-[#4C406E] w-4" />
                            <div className="text-xs text-gray-500">+3 from last month</div>
                        </div>

                    </div>
                </Card>
                  <Card className="bg-purple-100 rounded-none shadow-none">
                    <div className="p-2 flex flex-col gap-4">
                        <div className="flex justify-between">
                            <div className="text-xs text-[#4C406E]">New Customers</div>
                            <Users className="text-[#4C406E]" />
                        </div>
                        <div>

                            <div className="text-2xl font-bold text-[#4C406E]">466</div>

                        </div>
                        <div className="flex gap-2">
                            <TrendingUp className="text-[#4C406E] w-4" />
                            <div className="text-xs text-gray-500">+12% from last month</div>
                        </div>

                    </div>
                </Card>
                  <Card className="bg-purple-100 rounded-none shadow-none">
                    <div className="p-2 flex flex-col gap-4">
                        <div className="flex justify-between">
                            <div className="text-xs text-[#4C406E]">Avg Order Value</div>
                            <TrendingUp className="text-[#4C406E]" />
                        </div>
                        <div>

                            <div className="text-2xl font-bold text-[#4C406E]">$47</div>

                        </div>
                        <div className="flex gap-2">
                            <TrendingUp className="text-[#4C406E] w-4" />
                            <div className="text-xs text-gray-500">+12% from last month</div>
                        </div>

                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6 rounded-none shadow-none border-none">
                    <div className="mb-2">
                        <div className="text-lg font-semibold text-[#4C406E]">Sales trend</div>
                        <div className="text-xs text-gray-500">Revenue and order volume over time</div>
                    </div>
                    <div className="w-full h-56">
                        {/* SVG line chart mockup */}
                        <svg viewBox="0 0 400 180" className="w-full h-full">
                            <rect x="0" y="0" width="400" height="180" fill="#fff" />
                            {[0, 1, 2, 3, 4].map(i => (
                                <line key={i} x1={40} x2={360} y1={30 + i * 30} y2={30 + i * 30} stroke="#e5e5f7" />
                            ))}
                            <path d="M40 130 C90 90 140 150 190 120 C240 90 290 110 340 80" fill="none" stroke="#6B46C1" strokeWidth="3" />
                            {[{ x: 40, y: 130 }, { x: 90, y: 90 }, { x: 140, y: 150 }, { x: 190, y: 120 }, { x: 240, y: 90 }, { x: 290, y: 110 }, { x: 340, y: 80 }].map((d, i) => (
                                <circle key={i} cx={d.x} cy={d.y} r="4" fill="#fff" stroke="#6B46C1" />
                            ))}
                            {/* X axis labels */}
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m, i) => (
                                <text key={m} x={40 + i * 50} y={170} fontSize="12" fill="#4C406E">{m}</text>
                            ))}
                        </svg>
                    </div>
                </Card>
                <Card className="p-6 rounded-none shadow-none border-none">
                    <div className="mb-2">
                        <div className="text-lg font-semibold text-[#4C406E]">Sales by Collection</div>
                        <div className="text-xs text-gray-500">Performance by product line</div>
                    </div>
                    <div className="w-full h-72 flex items-end gap-2">
                        {/* SVG bar chart mockup - improved to match provided mockup */}
                        <svg viewBox="0 0 500 300" className="w-full h-full">
                            <rect x="0" y="0" width="500" height="300" fill="#fff" />
                            {/* grid lines */}
                            {[0, 1, 2, 3, 4].map(i => (
                                <line key={i} x1={50} x2={470} y1={50 + i * 50} y2={50 + i * 50} stroke="#d9d9d9" strokeDasharray="4 2" />
                            ))}
                            {/* y-axis */}
                            <line x1={50} x2={50} y1={50} y2={250} stroke="#888" />
                            {/* x-axis */}
                            <line x1={50} x2={470} y1={250} y2={250} stroke="#888" />
                            {/* bars */}
                            {[120, 90, 180, 80, 80].map((h, i) => (
                                <rect key={i} x={90 + i * 75} y={250 - h} width={50} height={h} fill="#4C406E" rx={4} />
                            ))}
                            {/* y-axis labels */}
                            {[400, 300, 200, 100, 0].map((v, i) => (
                                <text key={v} x={35} y={55 + i * 50} fontSize="13" fill="#4C406E" textAnchor="end">{v}</text>
                            ))}
                            {/* x-axis labels, rotated */}
                            {['Noir Collection', 'Noir Collection', 'Noir Collection', 'Noir Collection', 'Noir Collection'].map((c, i) => (
                                <text key={c + i} x={115 + i * 75} y={270} fontSize="13" fill="#4C406E" textAnchor="end" transform={`rotate(-30,${115 + i * 75},270)`}>{c}</text>
                            ))}
                        </svg>
                    </div>
                </Card>
                <Card className="p-6 rounded-none shadow-none border-none">
                    <div className="mb-2">
                        <div className="text-lg font-semibold text-[#4C406E]">Recent orders</div>
                        <div className="text-xs text-gray-500">Latest customer purchases</div>
                    </div>
                    <ul className="space-y-4">
                        {[1, 2, 3].map(i => (
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
                </Card>
                <Card className="p-6 rounded-none shadow-none border-none">
                    <div className="mb-2">
                        <div className="text-lg font-semibold text-[#4C406E]">Sales by Collection</div>
                        <div className="text-xs text-gray-500">Performance by product line</div>
                    </div>
                    <div className="w-full h-72 flex items-end gap-2">
                        {/* SVG bar chart mockup - improved to match provided mockup */}
                        <svg viewBox="0 0 500 300" className="w-full h-full">
                            <rect x="0" y="0" width="500" height="300" fill="#fff" />
                            {/* grid lines */}
                            {[0, 1, 2, 3, 4].map(i => (
                                <line key={i} x1={50} x2={470} y1={50 + i * 50} y2={50 + i * 50} stroke="#d9d9d9" strokeDasharray="4 2" />
                            ))}
                            {/* y-axis */}
                            <line x1={50} x2={50} y1={50} y2={250} stroke="#888" />
                            {/* x-axis */}
                            <line x1={50} x2={470} y1={250} y2={250} stroke="#888" />
                            {/* bars */}
                            {[120, 90, 180, 80, 80].map((h, i) => (
                                <rect key={i} x={90 + i * 75} y={250 - h} width={50} height={h} fill="#4C406E" rx={4} />
                            ))}
                            {/* y-axis labels */}
                            {[400, 300, 200, 100, 0].map((v, i) => (
                                <text key={v} x={35} y={55 + i * 50} fontSize="13" fill="#4C406E" textAnchor="end">{v}</text>
                            ))}
                            {/* x-axis labels, rotated */}
                            {['Noir Collection', 'Noir Collection', 'Noir Collection', 'Noir Collection', 'Noir Collection'].map((c, i) => (
                                <text key={c + i} x={115 + i * 75} y={270} fontSize="13" fill="#4C406E" textAnchor="end" transform={`rotate(-30,${115 + i * 75},270)`}>{c}</text>
                            ))}
                        </svg>
                    </div>
                </Card>
            </div>
        </div>
    );
}
