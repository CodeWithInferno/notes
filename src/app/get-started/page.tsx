import Link from "next/link"

export default function GetStarted() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#8e0e00] to-[#1f1c18] py-10 px-4">
      <div className="bg-[#a10f1e] p-10 rounded-[15px] w-full max-w-[400px] shadow-[0_8px_20px_rgba(0,0,0,0.4)] text-center">
        <h1 className="text-[1.8rem] text-white font-bold mb-2">NOTELY</h1>
        <h2 className="text-[1.4rem] text-white font-semibold mb-2">Create a free account</h2>
        <p className="text-[0.95rem] text-[#ddd] mb-6">
          Join Notely for free. Create and share unlimited notes with your friends.
        </p>

        <form className="text-left">
          <label htmlFor="fullname" className="block text-white font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Salman Khan"
            className="w-full p-3 rounded-lg border-none mb-4 text-black"
            required
          />

          <label htmlFor="email" className="block text-white font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="mesalmank@gmail.com"
            className="w-full p-3 rounded-lg border-none mb-4 text-black"
            required
          />

          <label htmlFor="password" className="block text-white font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*************"
            className="w-full p-3 rounded-lg border-none mb-5 text-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#f7d354] text-black p-3 font-bold text-base rounded-lg cursor-pointer hover:bg-[#ffe28a] transition-colors"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-[#ddd] text-[0.9rem]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#f7d354] no-underline hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
