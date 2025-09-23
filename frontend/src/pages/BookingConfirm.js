// src/pages/BookingConfirm.jsx
import React, { useState } from "react";

export default function BookingConfirm() {
  const [payment, setPayment] = useState("");

  return (
    <div className="text-white font-saira">
      {/* 🟣 Title */}
      <div className="h-30 flex items-center px-28">
        <h1 className="text-4xl font-bold text-[#8F00D7] drop-shadow-[0_0_15px_rgba(143,0,215,0.9)]">
          Summary
        </h1>
      </div>

      {/* 🟣 Booking Card Wrapper */}
      <div className="max-w-5xl mx-auto mt-12 bg-black/40 rounded-2xl p-10 shadow-xl">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 min-h-[400px]">
    
    {/* 🟣 Left Section */}
    <div className="flex flex-col justify-between border-r border-gray-500 pr-10">
      {/* Booking Summary */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Booking Summary</h3>
        <div className="flex gap-6 items-start">
          <img
            src="https://i.pinimg.com/736x/bb/f7/0c/bbf70cc9a56b19eb7faf60bdf76bc99d.jpg"
            alt="Avengers"
            className="w-40 h-52 object-cover rounded-lg shadow-lg"
          />
          <div className="text-xl">
            <p className="font-semibold text-xl">Avenger : End Game</p>
            <p className="mt-3 flex items-center">
              Review :
              <span className="ml-2 text-yellow-400 text-2xl">★ ★ ★ ★ ☆</span>
            </p>
            <p className="mt-3">Seats : E11-E12</p>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="mt-8 border-t border-gray-500 pt-6 text-lg">
        <h3 className="text-2xl font-bold mb-4">Payment Details</h3>
        <div className="flex justify-between">
          <span>Ticket : 2</span>
          <span>150 B</span>
        </div>
        <div className="flex justify-between">
          <span>Promotion :</span>
          <span>-50 B</span>
        </div>
        <div className="flex justify-between mt-5 font-bold text-xl">
          <span>Total</span>
          <span className="text-white">250 Bath</span>
        </div>
      </div>
    </div>

    {/* 🟣 Right Section */}
    <div className="flex flex-col justify-between pl-10 text-lg">
      {/* Payment Method */}
      <div>
        <h3 className="text-2xl font-bold mb-6">Payment Method</h3>
        <div className="flex flex-col gap-5">
          {["QR Code", "True Money", "PayPal", "Credit Card"].map((method, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={payment === method}
                onChange={(e) => setPayment(e.target.value)}
                className="w-5 h-5 accent-purple-600"
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-6 mt-10">
        <button className="flex-1 px-8 py-2 text-xl rounded-full bg-gradient-to-r from-[#560081] via-[#5335FF] to-[#1091FB] hover:opacity-90">
          Confirm
        </button>
        <button className="flex-1 px-8 py-2 text-xl rounded-full bg-gray-600 hover:bg-gray-700">
          Cancel
        </button>
      </div>
    </div>

  </div>
</div>

    </div>
  );
}