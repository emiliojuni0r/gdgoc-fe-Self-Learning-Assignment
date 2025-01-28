"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5500/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Redirect to login page after successful registration
      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-200 flex flex-col justify-center items-center">
      <div className="w-fit h-fit flex flex-row justify-center items-center mb-10 mt-10 lg:mt-0 gap-x-2">
        <Image
          src={"/note-icon.svg"}
          width={0}
          height={0}
          className="w-6 h-6 lg:w-[40px] lg:h-[40px]"
          alt="icon note"
        />
        <h1 className="text-base lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-black to-slate-600">
          Welcome To Note Keren
        </h1>
      </div>
      <div className="w-full lg:w-[600px] h-full lg:h-[600px] bg-slate-100 shadow-lg rounded-t-[60px] lg:rounded-3xl flex flex-col justify-center items-center p-10">
        <h1 className="mb-auto mt-10 lg:mt-0 text-4xl font-bold">Register</h1>
        <form onSubmit={handleRegister} className="mb-auto w-fit h-fit flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="name" className="text-base lg:text-xl">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-64 lg:w-96 h-10 rounded-xl px-1"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-base lg:text-xl">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-64 lg:w-96 h-10 rounded-xl px-1"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="password"
              className="text-base lg:text-xl">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 rounded-xl px-1"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <p>
            Already have an account?
            <Link href={"/login"} className="ml-1 text-blue-500 hover:text-blue-700">Login here</Link>
          </p>
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white rounded-2xl w-fit mx-auto px-8 py-2 cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}