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
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TemperatureMonitor: React.FC = () => {
  const [temperatureData, setTemperatureData] = useState<
    { x: number; y: number }[]
  >([]);
  const [humidityData, setHumidityData] = useState<{ x: number; y: number }[]>(
    []
  );
  const [lastFertilizerTime, setLastFertilizerTime] = useState<number | null>(
    null
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const storedFertilizerTime = localStorage.getItem("lastFertilizerTime");
    if (storedFertilizerTime) {
      const lastFertilizerTimeMillis = parseInt(storedFertilizerTime, 10);
      const countdownEnd = lastFertilizerTimeMillis + 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

      if (Date.now() < countdownEnd) {
        setLastFertilizerTime(lastFertilizerTimeMillis);
      } else {
        localStorage.removeItem("lastFertilizerTime");
        setIsPopupOpen(true);
      }
    } else {
      setIsPopupOpen(true);
    }
  }, []);

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

  useEffect(() => {
    if (lastFertilizerTime) {
      const countdownEnd = lastFertilizerTime + 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
      const intervalId = setInterval(() => {
        const remainingTime = countdownEnd - Date.now();
        console.log(
          `Countdown: ${Math.max(remainingTime / 1000, 0).toFixed(0)} seconds`
        );

        if (remainingTime <= 0) {
          // Hapus semua data setelah 3 hari
          setTemperatureData([]);
          setHumidityData([]);
          setLastFertilizerTime(null);
          localStorage.removeItem("lastFertilizerTime");
          setIsPopupOpen(true);
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [lastFertilizerTime]);

  const handleFertilizerSubmit = () => {
    if (selectedDate) {
      const now = selectedDate.getTime();
      setLastFertilizerTime(now);
      localStorage.setItem("lastFertilizerTime", now.toString());
      setIsPopupOpen(false);
    }
  };

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
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Monitoring Suhu dan Kelembapan
        </h1>
        {/* Button to open the fertilizer popup manually */}
        <div className="flex flex-col items-center justify-center">
          <Button
            className="mb-4  justify-center"
            onClick={() => setIsPopupOpen(true)}
          >
            Pengisian Pupuk
          </Button>
        </div>

        {/* Display selected fertilizer date */}
        {lastFertilizerTime && (
          <p className="mb-4 text-gray-600">
            Tanggal pengisian pupuk terakhir:{" "}
            <span className="font-semibold">
              {formatDate(lastFertilizerTime)}
            </span>
          </p>
        )}

        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pengisian Pupuk</DialogTitle>
              <DialogDescription>
                Silakan pilih tanggal pengisian pupuk untuk memulai countdown 3
                hari.
              </DialogDescription>
            </DialogHeader>

            <Calendar
              mode="single"
              selected={selectedDate ? selectedDate.toISOString() : null} // Ensure correct format
              onSelect={(date: any) =>
                setSelectedDate(date ? new Date(date) : null)
              } // Handle date selection
              initialFocus
            />

            <div className="flex justify-end mt-4">
              <Button onClick={handleFertilizerSubmit} disabled={!selectedDate}>
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Suhu Rata-Rata: {avgTemperature} °C
          </h3>
          <Line data={tempChartData} options={options} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            Kelembapan Rata-Rata: {avgHumidity} %
          </h3>
          <Line data={humidityChartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TemperatureMonitor;
