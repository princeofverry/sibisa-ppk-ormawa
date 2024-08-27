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
import { getDatabase, ref, onValue } from "firebase/database";
import "chartjs-adapter-date-fns"; // Import the date adapter

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

// Options for the chart
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
      type: "time", // Tetap gunakan "time"
      time: {
        unit: "second",
        tooltipFormat: "dd MMM yyyy HH:mm:ss",
        displayFormats: {
          second: "HH:mm:ss", // Format tampilan untuk sumbu X
        },
      },
      title: {
        display: true,
        text: "Waktu",
      },
      ticks: {
        autoSkip: true, // Menghindari label yang terlalu banyak
        maxTicksLimit: 6, // Maksimal label yang ditampilkan
        stepSize: 10, // Hanya menampilkan label setiap 10 detik
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

// Function to calculate average
const calculateAverage = (data: number[]): number => {
  if (!Array.isArray(data) || data.length === 0) {
    return 0; // Default value if data is not an array or empty
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
    const tempRef = ref(database, "/sensorData/latestData/temperature");
    const humidityRef = ref(database, "/sensorData/latestData/humidity");

    const fetchData = () => {
      const now = new Date().getTime(); // Ambil waktu saat ini dalam milidetik

      onValue(tempRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Tambahkan data baru ke temperatureData
          setTemperatureData((prevData) => [...prevData, { x: now, y: data }]);
        }
      });

      onValue(humidityRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Tambahkan data baru ke humidityData
          setHumidityData((prevData) => [...prevData, { x: now, y: data }]);
        }
      });
    };

    fetchData();

    const intervalId = setInterval(() => {
      // Simpan hanya data 1 menit terakhir
      setTemperatureData((prevData) => prevData.slice(-60));
      setHumidityData((prevData) => prevData.slice(-60));
      fetchData();
    }, 10000); // Fetch data setiap 10 detik

    return () => {
      clearInterval(intervalId);
    };
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

        {/* Suhu Chart */}
        <div className="mb-6">
          <div className="h-40 md:h-60">
            <Line data={tempChartData} options={options} />
          </div>
          <p className="text-center mt-2 text-sm md:text-base">
            Rata-rata Suhu: {avgTemperature}°C
          </p>
        </div>

        {/* Kelembapan Chart */}
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
