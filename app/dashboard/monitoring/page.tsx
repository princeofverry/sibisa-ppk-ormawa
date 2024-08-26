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

// Fungsi untuk menghitung nilai rata-rata
const calculateAverage = (data: number[]): number => {
  const sum = data.reduce((acc, value) => acc + value, 0);
  return parseFloat((sum / data.length).toFixed(2));
};

const TemperatureMonitor: React.FC = () => {
  const avgTemperature = calculateAverage(
    temperatureData.datasets[0].data as number[]
  );
  const avgHumidity = calculateAverage(
    humidityData.datasets[0].data as number[]
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
          Grafik Monitoring Suhu dan Kelembapan
        </h2>

        {/* Grafik Suhu */}
        <div className="mb-6">
          <div className="h-40 md:h-60">
            <Line data={temperatureData} options={options} />
          </div>
          <p className="text-center mt-2 text-sm md:text-base">
            Rata-rata Suhu: {avgTemperature}°C
          </p>
        </div>

        {/* Grafik Kelembapan */}
        <div>
          <div className="h-40 md:h-60">
            <Line data={humidityData} options={options} />
          </div>
          <p className="text-center mt-2 text-sm md:text-base">
            Rata-rata Kelembapan: {avgHumidity}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemperatureMonitor;
