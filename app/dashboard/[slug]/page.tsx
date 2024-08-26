"use client";

import { Phone, UserRound } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import looking from "/public/images/looking.png";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

interface DetailPageProps {
  params: {
    slug: string;
  };
}

const DetailPage: React.FC<DetailPageProps> = ({ params }) => {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);

  const [user, setUser] = useState<User | null>(null);
  const [besi, setBesi] = useState<number>(0);
  const [kaca, setKaca] = useState<number>(0);
  const [kertas, setKertas] = useState<number>(0);
  const [plastik, setPlastik] = useState<number>(0);
  const [sterofoam, setSterofoam] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const pointRates = {
    besi: 5000,
    kaca: 4000,
    kertas: 3000,
    plastik: 2000,
    sterofoam: 1000,
  };

  const calculateTotalPoints = () => {
    return (
      besi * pointRates.besi +
      kaca * pointRates.kaca +
      kertas * pointRates.kertas +
      plastik * pointRates.plastik +
      sterofoam * pointRates.sterofoam
    );
  };

  const calculateTotalWeight = () => {
    return besi + kaca + kertas + plastik + sterofoam;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${decodedSlug}`);
        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setBesi(data.besi || 0);
          setKaca(data.kaca || 0);
          setKertas(data.kertas || 0);
          setPlastik(data.plastik || 0);
          setSterofoam(data.sterofoam || 0);
        } else {
          console.error(data.error);
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [decodedSlug]);

  const handleSubmit = async () => {
    if (user) {
      const updatedUser = {
        ...user,
        besi,
        kaca,
        kertas,
        plastik,
        sterofoam,
        totalWeight: calculateTotalWeight(),
        totalPoints: calculateTotalPoints(),
      };

      setUser(updatedUser);

      try {
        await fetch(`/api/users/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        });
      } catch (error) {
        console.error("Failed to update user", error);
      }
    }
  };

  if (loading) {
    return (
      <p className="text-center flex flex-col items-center justify-center">
        Loading...
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-row justify-center items-center px-2">
        <h1 className="md:text-3xl text-2xl font-bold">
          Update Waste and Points
        </h1>
        <Image src={looking} alt="looking" />
      </div>
      <div className="flex flex-col items-center">
        {user ? (
          <div>
            <div className="py-3 w-72 px-2 bg-[#3C5480] rounded-xl text-white mb-4">
              <div className="flex flex-row gap-2">
                <UserRound />
                <h1>{user.name}</h1>
              </div>
            </div>
            <div className="py-3 w-72 px-2 bg-[#3C5480] rounded-xl text-white mb-4">
              <div className="flex flex-row gap-2">
                <Phone />
                <h1>{user.numberPhone}</h1>
              </div>
            </div>
            <div className="w-72 mb-4">
              <h2 className="font-bold mb-2">Waste Input</h2>
              <div className="bg-[#3C5480] rounded-xl text-black p-4">
                <div className="flex justify-between mb-2">
                  <label>Besi (kg):</label>
                  <input
                    type="number"
                    value={besi}
                    onChange={(e) => setBesi(parseFloat(e.target.value))}
                    className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#BACC58]"
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label>Kaca (kg):</label>
                  <input
                    type="number"
                    value={kaca}
                    onChange={(e) => setKaca(parseFloat(e.target.value))}
                    className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#BACC58]"
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label>Kertas (kg):</label>
                  <input
                    type="number"
                    value={kertas}
                    onChange={(e) => setKertas(parseFloat(e.target.value))}
                    className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#BACC58]"
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label>Plastik (kg):</label>
                  <input
                    type="number"
                    value={plastik}
                    onChange={(e) => setPlastik(parseFloat(e.target.value))}
                    className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#BACC58]"
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label>Sterofoam (kg):</label>
                  <input
                    type="number"
                    value={sterofoam}
                    onChange={(e) => setSterofoam(parseFloat(e.target.value))}
                    className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#BACC58]"
                  />
                </div>
              </div>
            </div>
            <div className="w-72 mb-4">
              <h2 className="font-bold mb-2">Summary</h2>
              <div className="bg-[#3C5480] rounded-xl text-white p-4">
                <div className="flex justify-between mb-2">
                  <span>Total Weight:</span>
                  <span>{calculateTotalWeight()} kg</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total Points:</span>
                  <span>{calculateTotalPoints()} pts</span>
                </div>
              </div>
            </div>
            <Button
              className="bg-[#BACC58] w-24 hover:bg-[#a1b04d]"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        ) : (
          <p>User not found</p>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
