"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  TimeScale,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, remove, get } from "firebase/database";
import "chartjs-adapter-date-fns";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1JuLSJ93CXaHjrt7ESLcZKhG9dKdYqYo",
  authDomain: "ppkormawa-fa414.firebaseapp.com",
  databaseURL:
    "https://ppkormawa-fa414-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ppkormawa-fa414",
  storageBucket: "ppkormawa-fa414.appspot.com",
  messagingSenderId: "305221653321",
  appId: "1:305221653321:web:05276f907d837a5f2a4098",
  measurementId: "G-340S31FLZK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

ChartJS.register(
  LineElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  TimeScale
);

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (context: any) => `${context.dataset.label}: ${context.raw.y}`,
      },
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "second",
        tooltipFormat: "dd MMM yyyy HH:mm:ss",
        displayFormats: {
          second: "HH:mm:ss",
        },
      },
      title: {
        display: true,
        text: "Waktu",
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 6,
        stepSize: 10,
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

const calculateAverage = (data: number[]): number => {
  if (!Array.isArray(data) || data.length === 0) {
    return 0;
  }

  const sum = data.reduce((acc, value) => acc + value, 0);
  return parseFloat((sum / data.length).toFixed(2));
};

const TemperatureMonitor: React.FC = () => {
  const [temperatureData, setTemperatureData] = useState<
    { x: number; y: number }[]
  >([]);
  const [humidityData, setHumidityData] = useState<{ x: number; y: number }[]>(
    []
  );

  useEffect(() => {
    const sensorDataRef = ref(database, "/sensorData");

    const cleanupOldData = async () => {
      const now = Date.now();
      const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

      try {
        const snapshot = await get(sensorDataRef);
        const data = snapshot.val();

        if (data) {
          Object.keys(data).forEach(async (timestamp) => {
            const timestampMillis = new Date(timestamp).getTime();

            if (timestampMillis < oneWeekAgo) {
              // Hapus data yang lebih dari satu minggu
              await remove(ref(database, `/sensorData/${timestamp}`));
            }
          });
        }
      } catch (error) {
        console.error("Error cleaning up old data:", error);
      }
    };

    cleanupOldData();

    onValue(
      sensorDataRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const now = Date.now();
          const threeHoursAgo = now - 3 * 60 * 60 * 1000;

          const filteredTemperatureData: { x: number; y: number }[] = [];
          const filteredHumidityData: { x: number; y: number }[] = [];

          Object.keys(data).forEach((timestamp) => {
            const timestampMillis = new Date(timestamp).getTime();

            if (timestampMillis >= threeHoursAgo && timestampMillis <= now) {
              filteredTemperatureData.push({
                x: timestampMillis,
                y: data[timestamp].temperature,
              });
              filteredHumidityData.push({
                x: timestampMillis,
                y: data[timestamp].humidity,
              });
            }
          });

          console.log("Filtered Temperature Data:", filteredTemperatureData);
          console.log("Filtered Humidity Data:", filteredHumidityData);

          setTemperatureData(filteredTemperatureData);
          setHumidityData(filteredHumidityData);
        } else {
          console.warn("No data found for the given time range.");
        }
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );
  }, []);

  const avgTemperature = calculateAverage(
    temperatureData.map((data) => data.y)
  );
  const avgHumidity = calculateAverage(humidityData.map((data) => data.y));

  const tempChartData: ChartData<"line"> = {
    datasets: [
      {
        label: "Suhu (°C)",
        data: temperatureData,
        borderColor: "#34D399", // Tailwind Green
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        fill: true,
      },
    ],
  };

  const humidityChartData: ChartData<"line"> = {
    datasets: [
      {
        label: "Kelembapan (%)",
        data: humidityData,
        borderColor: "#3B82F6", // Tailwind Blue
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
          Grafik Monitoring Suhu dan Kelembapan
        </h2>

        <div className="mb-6">
          <div className="h-40 md:h-60">
            <Line data={tempChartData} options={options} />
          </div>
          <p className="text-center mt-2 text-sm md:text-base">
            Rata-rata Suhu: {avgTemperature}°C
          </p>
        </div>

        <div>
          <div className="h-40 md:h-60">
            <Line data={humidityChartData} options={options} />
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
