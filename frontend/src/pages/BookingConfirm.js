// src/pages/BookingConfirm.jsx
import React, { useState } from "react";

export default function BookingConfirm() {
  const [payment, setPayment] = useState("");

  return (
    <div>
      {/* 🟣 Title */}
      <div className="relative z-10 px-44 pt-10 w-full">
        <h1 className="font-goldman text-4xl font-bold text-[#8F00D7] drop-shadow-[0_0_20px_rgba(143,0,215,0.9)]">
          Summary
        </h1>
      </div>

      {/* 🟣 Booking Card Wrapper */}
      <div className="relative z-10 max-w-6xl mx-auto mt-12 bg-black/60 rounded-3xl p-14 shadow-2xl scale-105">
        <div className="font-battambang grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[500px]">

          {/* 🟣 Left Section */}
          <div className="flex flex-col justify-between border-r border-gray-500 pr-10">
            {/* Booking Summary */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Booking Summary</h3>
              <div className="flex gap-8 items-start">
                <img
                  src="https://i.pinimg.com/736x/bb/f7/0c/bbf70cc9a56b19eb7faf60bdf76bc99d.jpg"
                  alt="Avengers"
                  className="w-50 h-64 object-cover rounded-xl shadow-2xl"
                />
                <div className="text-xl">
                  <p>Avenger : End Game</p>
                  <p className="mt-4 flex items-center">
                    Review :
                    <span className="ml-3 text-yellow-400 text-2xl">★ ★ ★ ★ ☆</span>
                  </p>
                  <p className="mt-4">Seats : E11-E12</p>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mt-10 border-t border-gray-500 pt-8 text-xl">
              <h3 className="text-2xl font-bold mb-6">Payment Details</h3>
              <div className="flex justify-between">
                <span>Ticket : 2</span>
                <span>150 B</span>
              </div>
              <div className="flex justify-between">
                <span>Promotion :</span>
                <span>-50 B</span>
              </div>
              <div className="flex justify-between mt-6 font-bold text-3xl">
                <span>Total</span>
                <span className="text-white">250 Bath</span>
              </div>
            </div>
          </div>

          {/* 🟣 Right Section */}
          <div className="flex flex-col justify-between pl-12 text-xl">
            {/* Payment Method */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Payment Method</h3>
              <div className="flex flex-col gap-6">
                {["QR Code", "True Money", "PayPal", "Credit Card"].map((method, i) => (
                  <label key={i} className="flex items-center gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={payment === method}
                      onChange={(e) => setPayment(e.target.value)}
                      className="w-6 h-6 accent-purple-600"
                    />
                    {method}
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-8 mt-12">
              <button className="flex-1 px-12 py-3 text-xl rounded-full bg-gradient-to-r from-[#560081] via-[#5335FF] to-[#1091FB] hover:opacity-90">
                Confirm
              </button>
              <button className="flex-1 px-12 py-3 text-xl rounded-full bg-gray-600 hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}