import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

export default function FormWithPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!name) newErrors.push("Name is required.");
    if (!email) newErrors.push("Email is required.");
    if (!phoneNumber) newErrors.push("Phone number is required.");

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("/api/users", {
        name,
        email,
        numberPhone: phoneNumber,
      });
      setName("");
      setEmail("");
      setPhoneNumber("");
      setIsOpen(false);
      setErrors([]);
      // Optional: Trigger a refetch or state update if needed
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error (e.g., show an alert or notification)
    }
  };

  return (
    <div className="flex justify-center my-2 items-center">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Plus
            color="#ffffff"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#BACC58] p-2"
            onClick={() => setIsOpen(!isOpen)}
          />
        </PopoverTrigger>
        <PopoverContent className="p-4 md:p-6 bg-white rounded-lg shadow-lg w-80 z-50">
          <h2 className="text-lg md:text-xl font-bold mb-4">
            Submit your data
          </h2>
          {errors.length > 0 && (
            <div className="mb-4">
              {errors.map((error, index) => (
                <p key={index} className="text-red-500 text-sm">
                  {error}
                </p>
              ))}
            </div>
          )}
          <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm px-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter your phone number"
              />
            </div>
            <button
              type="submit"
              disabled={!name || !email || !phoneNumber}
              className={`w-full py-2 rounded-md text-white focus:outline-none ${
                !name || !email || !phoneNumber
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              }`}
            >
              Submit
            </button>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
