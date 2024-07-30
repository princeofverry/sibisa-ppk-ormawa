"use client";
// src/components/TemperatureMonitor.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import Navbar from "@/components/navbar/navbar";

// Register chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

// Data dummy suhu
const temperatureData: ChartData<"line"> = {
  labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00"],
  datasets: [
    {
      label: "Suhu (°C)",
      data: [22, 21, 23, 24, 22, 20, 19],
      borderColor: "#34D399", // Tailwind Green
      backgroundColor: "rgba(52, 211, 153, 0.2)",
      fill: true,
    },
  ],
};

// Data dummy kelembapan
const humidityData: ChartData<"line"> = {
  labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00"],
  datasets: [
    {
      label: "Kelembapan (%)",
      data: [55, 60, 58, 65, 62, 64, 70],
      borderColor: "#3B82F6", // Tailwind Blue
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      fill: true,
    },
  ],
};

// Opsi grafik
const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.dataset.label}: ${context.raw}`,
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Waktu",
      },
    },
    y: {
      title: {
        display: true,
        text: "Nilai",
      },
      beginAtZero: true,
    },
  },
};

const TemperatureMonitor: React.FC = () => {
  return (
    <div>
      <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          Grafik Monitoring Suhu dan Kelembapan
        </h2>

        {/* Grafik Suhu */}
        <div className="w-full h-60 mb-6">
          <Line data={temperatureData} options={options} />
        </div>

        {/* Grafik Kelembapan */}
        <div className="w-full h-60">
          <Line data={humidityData} options={options} />
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default TemperatureMonitor;
