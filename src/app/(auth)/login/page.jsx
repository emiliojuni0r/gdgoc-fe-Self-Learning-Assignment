"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
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
      {/* start of container */}
      <div className="w-full lg:w-[600px] h-full lg:h-[500px] bg-slate-100 shadow-lg rounded-t-[60px] lg:rounded-3xl flex flex-col justify-center items-center p-10">
        <h1 className="mb-auto mt-10 lg:mt-0 text-4xl font-bold">Login</h1>
        {/* start of form */}
        <form action="" className="mb-auto w-fit h-fit flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <label htmlFor="email" className="text-base lg:text-xl">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-64 lg:w-96 h-10 rounded-xl px-1"
            />
            {/* error message below here */}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="password" className="text-base lg:text-xl">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="h-10 rounded-xl px-1"
            />
            {/* error message below here */}
          </div>
          <p>
            Don't have account?
            <Link
              href={"/register"}
              className="ml-1 text-blue-500 hover:text-blue-700"
            >
              Register here
            </Link>
          </p>
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white rounded-2xl w-fit mx-auto px-8 py-2 cursor-pointer"
          >
            Login
          </button>
        </form>
        {/* end of form */}
      </div>
      {/* end of container */}
    </div>
  );
}
