import React from "react";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-8 items-center justify-center">
      <div>
        <p className="text-black text-6xl font-bold mb-8">
          Buy and Sell with Ease
        </p>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className=" border-2 border-black w-[80px] text-white border-black bg-black rounded-md hover:text-black hover:bg-white hover:border-2 hover:border-black px-4 py-2"
          >
            Signup
          </button>
          <button
            onClick={() => navigate("/login")}
            className=" border-2 border-black w-[80px] text-white border-black bg-black rounded-md hover:text-black hover:border-2 hover:border-black hover:bg-white px-4 py-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
