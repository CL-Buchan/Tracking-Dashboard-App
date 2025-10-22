"use client";

import { act, useState } from "react";
import Link from "next/link";
import AIChat from "../components/AIChat/path";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

export default function Dashboard() {
  const data = [
    { day: "Mon", weight: 58.9 },
    { day: "Tue", weight: 78.5 },
    { day: "Wed", weight: 18.4 },
    { day: "Thu", weight: 78.2 },
    { day: "Fri", weight: 88.1 },
    { day: "Sat", weight: 77.9 },
    { day: "Sun", weight: 17.8 },
  ];

  // Each weight. Map transforms each element returning new array
  const weight = data.map(item => item.weight);

  // Combines all elements to single value (one result)
  const avgWeight = (weight.reduce((sum, w) => sum + w, 0) / weight.length).toFixed(1);

  const [stats] = useState([
    { title: "Clients", label: "Total Clients", value: 14 },
    { title: "Weight Progression", label: "Avg Weight Progression", value: `${avgWeight} kg/week` },
    { title: "Training Days", label: "Consistent Days", value: "6 / 7" },
  ]);

  const [activeSection, setActiveSection] = useState("Dashboard");
  const [hovered, setHovered] = useState(false);


  return (
    <div className="flex h-screen">
      <div className="absolute inset-0 z-0"></div>
      {/* Sidebar */}
      <aside className="w-50 flex flex-col relative">
        <div className="absolute inset-0 backdrop-blur-lg z-0"></div>
        <nav className="relative pt-10 pl-8 pr-8 bg-[white] h-screen flex flex-col gap-4 items-start z-10">
          <div className="w-full border-b border-gray-600 pb-5 mb-2">
            <Link href={'../'} className="p-3 text-sm duration-500 ease-in-out rounded-2xl hover:text-[#6c757d]">Home</Link>
          </div>

          {["Dashboard", "Clients", "Programs", "Chart", "Chat"].map((section) => (
            <button key={section} onClick={() => setActiveSection(section)} className={`p-3 text-sm text-left duration-500 ease-in-out rounded-xl w-full hover:text-[#6c757d] hover:bg-[#f8f9fa] ${ activeSection === section ? "bg-[#9BD770]" : "" }`}>
              {section}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 py-20 px-20 overflow-auto relative z-10">
        <h2 className="!text-3xl mb-10">Overview</h2>

        <div className="flex flex-col gap-5 mb-20 p-10 bg-[#1B3409] text-[#ededed] hover:bg-[#66B032] hover:text-black duration-500 ease-in-out rounded-2xl">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In quisquam unde deleniti ratione, quam dolor vel qui dolorem nam odio nulla neque praesentium quod, eveniet autem. Cum, aliquid. Repudiandae, itaque.</p>

          <span className="">
            <Link href={""} className="hover:text-[#e9ecef] hover:underline hover:underline-offset-4 duration-500 ease-in-out">Log Exercise</Link>
          </span>
        </div>

        <div id="Insight-Area">
          {(activeSection === "Dashboard" || activeSection === "Clients" || activeSection === "Programs") && (
            <>
              <div className="mb-10">
                <h2>Insights</h2>
              </div>
              {/* Cards Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-10 gap-20 mb-8">
                {stats
                .filter((stat) => {
                if (activeSection === "Dashboard") return true; // show all cards on Dashboard
                if (activeSection === "Clients") return stat.label === "Total Clients"; // example
                if (activeSection === "Programs") return stat.label !== "Consistent Days"; // example
                  return false;
                })
                .map((stat, i) => (
                  <div
                  key={i}
                  className="p-6 gap-5 flex flex-col items-start justify-center bg-[#f8f9fa] backdrop-blur-lg hover:bg-[#1B3409] hover:text-[#ededed] rounded-xl duration-500 ease-in-out"
                  >
                    <h2 className="!text-lg">{stat.title}</h2>
                    <div className="flex flex-col items-center justify-center mx-auto">
                      <h3 className="!text-[14px] text-[#adb5bd]">{stat.label}</h3>
                      <p className="text-2xl mt-2">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>    

        <div id="Progress-Chart">
          {(activeSection === "Chart" || activeSection === "Dashboard") && (
            <>
              <div className="mt-20">
                <h2>Progression</h2>
              </div>

              {/* Chart Section */}
              <div
              className="mt-10 p-6 duration-500 ease-in-out bg-[#f8f9fa] hover:bg-[#1B3409] hover:text-[#ededed] rounded-2xl"
              id="chart"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              >
                <h3 className="text-lg mb-5">Weekly Weight Progression</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, bottom: 5, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#ced4da" />
                      <XAxis dataKey="day" tick={{ fill: hovered ? "#f8f9fa" : "" }} />
                      <YAxis
                        label={{
                          value: "Weight (kg)",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle", fill: hovered ? "#f8f9fa" : "" },
                        }}
                        tick={{ fill: hovered ? "#f8f9fa" : "" }}
                      />
                      <Tooltip
                        content={({ payload, label }) => {
                        if (!payload || payload.length === 0) return null;
                          return (
                            <div
                              style={{
                                backgroundColor: "#6c757d",
                                color: "black",
                                padding: "10px",
                                borderRadius: "10px",
                              }}
                            >
                              <p>{label}</p>
                              <p>{payload[0].value} kg</p>
                            </div>
                          );
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke={hovered ? "#9BD770" : "#66B032"}
                        strokeWidth={1.5}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>

        <div id="chat">
          {(activeSection === "Chat") && (
            <>
            <div>
              <AIChat />
            </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}