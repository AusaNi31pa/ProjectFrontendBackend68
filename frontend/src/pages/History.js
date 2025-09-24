// src/pages/History.js
import React from "react";

export default function History() {
  const bookings = [
    {
      id: "C1011",
      movie: "DeadPool",
      poster:
        "https://i.pinimg.com/1200x/5e/34/68/5e3468a4278213d9cbaa7c40c533d5ab.jpg",
      showtime: "September 20, 2023 2:00 PM",
      theater: "Theater 2",
      seats: "E13",
      status: "Complete",
      price: 150,
    },
    {
      id: "C1012",
      movie: "Avengers Endgame",
      poster:
        "https://i.pinimg.com/736x/bb/f7/0c/bbf70cc9a56b19eb7faf60bdf76bc99d.jpg",
      showtime: "October 1, 2023 7:00 PM",
      theater: "Theater 1",
      seats: "A10-A11",
      status: "Cancel",
      price: 300,
    },
  ];

  return (
    <div className="text-white">
      {/* 🟣 Title */}
      <div className="px-44 pt-12 w-full">
        <h1 className="font-goldman text-4xl font-bold text-[#8F00D7] drop-shadow-[0_0_20px_rgba(143,0,215,0.9)]">
          History & Cancel
        </h1>
      </div>

      {/* 🟣 Container Box */}
      <div className="max-w-7xl mx-auto mt-12 bg-black/50 font-battambang rounded-3xl shadow-2xl p-10">
        <div className="border-2 border-white rounded-xl overflow-hidden">
          <table className="w-full border-collapse text-center text-xl">
            <thead className="bg-black/60 text-xl">
              <tr>
                <th className="border border-white px-4 py-2 whitespace-nowrap">
                  Booking ID
                </th>
                <th className="border border-white px-4 py-2 whitespace-nowrap">
                  Movie
                </th>
                <th className="border border-white px-4 py-2 whitespace-nowrap">
                  ShowTime
                </th>
                <th className="border border-white px-4 py-2 whitespace-nowrap">
                  Theater
                </th>
                <th className="border border-white px-4 py-2 whitespace-nowrap">
                  Seats
                </th>
                <th className="border border-white px-4 py-2 whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i} className="hover:bg-white/10">
                  <td className="border border-white px-4 py-2">{b.id}</td>
                  <td className="border border-white px-4 py-2 flex items-center gap-3 justify-start">
                    <img
                      src={b.poster}
                      alt={b.movie}
                      className="w-40 h-56 object-cover rounded-md"
                    />
                    <span className="truncate max-w-[150px]">{b.movie}</span>
                  </td>
                  <td className="border border-white px-4 py-2 whitespace-nowrap">
                    {b.showtime}
                  </td>
                  <td className="border border-white px-4 py-2">{b.theater}</td>
                  <td className="border border-white px-4 py-2">{b.seats}</td>
                  <td className="border border-white px-4 py-2">
                    {b.status === "Complete" ? (
                      <span className="px-3 py-1 rounded bg-green-600 text-base">
                        Complete
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded bg-red-600 text-base">
                        Cancel
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🟣 Action Box (นอกตาราง) */}
        <div className="mt-6 px-6 py-4 flex justify-between items-center text-white text-2xl">
        {/* ฝั่งซ้าย */}
        <div className="flex items-center gap-28">
        <span className="font-semibold">C1011</span>
        <span className="font-semibold">DeadPool</span>
        <button className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-700">
            Cancel
        </button>
        <span className="font-bold">150 B</span>
        </div>
        {/* ฝั่งขวา */}
        <div className="flex items-center gap-4 ">
        <button className="px-6 py-2 rounded-full bg-green-600 hover:bg-green-700">
            OK
        </button>
        <button className="px-6 py-2 rounded-full bg-gray-500 hover:bg-gray-600">
            Cancel
        </button>
        </div>
    </div>
            
      </div>
    </div>
  );
}