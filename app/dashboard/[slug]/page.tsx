"use client";

import { Phone, UserRound, WeightIcon } from "lucide-react";
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

  // Decode the slug to handle cases like "Joko%20Khannedy"
  const decodedSlug = decodeURIComponent(slug);

  const [user, setUser] = useState<User | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Fetch user data from the API
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${decodedSlug}`);
        const data = await response.json();
        if (response.ok) {
          setUser(data);
          setAmount(data.beratSampah || 0);
        } else {
          console.error(data.error);
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
        setUser(null);
      }
    };

    fetchUser();
  }, [decodedSlug]);

  const handleSubmit = async () => {
    const newAmount = parseFloat(inputValue);
    if (!isNaN(newAmount) && newAmount >= 0) {
      setAmount(newAmount);
      if (user) {
        const updatedUser = { ...user, beratSampah: newAmount };
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
    } else {
      alert("Please enter a valid number.");
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-row justify-center items-center px-2">
          <h1 className="md:text-3xl text-2xl font-bold">
            Change the amount of waste
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
              <div>
                <h1 className="font-bold mb-2">Amount now</h1>
                <div className="py-3 w-24 px-2 bg-[#3C5480] rounded-xl text-white mb-4">
                  <div className="flex flex-row gap-2">
                    <WeightIcon />
                    <h1>{amount} kg</h1>
                  </div>
                </div>
              </div>
              <div>
                <label>Change Amount</label>
                <div className="flex flex-row justify-between">
                  <input
                    type="text"
                    placeholder="KG"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="bg-blue rounded-xl px-2 w-24 py-2 border-2 border-[#3C5480]"
                  />
                  <Button
                    className="bg-[#BACC58] w-24 hover:bg-[#a1b04d]"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p>User not found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailPage;
