// src/pages/Home.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { FaPlay, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* ---------- Small helpers ---------- */
const Badge = ({ children }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/15 text-white/90 backdrop-blur">
    {children}
  </span>
);

function PosterSkeleton({ className = "" }) {
  return (
    <div
      className={
        "rounded-2xl overflow-hidden bg-white/10 animate-pulse " + className
      }
      style={{ aspectRatio: "2 / 3" }}
    />
  );
}

/* ---------- HERO (ลดขนาดกล่องสไลด์) ---------- */
function HeroCarousel({ items = [] }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const stripRef = useRef(null);

  const next = () =>
    setCurrent((i) => (i === items.length - 1 ? 0 : i + 1));
  const goTo = (i) => setCurrent(i);

  useEffect(() => {
    if (!items.length || paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused, current, items.length]);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const active = el.querySelector(`[data-index="${current}"]`);
    if (active) {
      const offset =
        active.offsetLeft - (el.clientWidth - active.clientWidth) / 2;
      el.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [current]);

  if (!items.length) return null;

  return (
    <section
      className="relative w-screen h-[450px] text-white select-none overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {items.map((m, i) => (
        <div
          key={m.movie_id || i}
          className={`absolute inset-0 transition-opacity duration-[1200ms]
                     ${i === current ? "opacity-100 z-20" : "opacity-0 z-10"}`}
        >
          <img
            src={m.poster}
            alt={m.title}
            className={`w-full h-full object-cover transition-transform duration-[2000ms]
                        ${i === current ? "scale-100" : "scale-[1.08]"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        </div>
      ))}

      <div className="absolute z-30 left-8 md:left-16 top-[28%] max-w-[48rem]">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-[0_6px_18px_rgba(0,0,0,0.9)]">
          {items[current].title}
        </h1>
        <div className="flex gap-4">
          <button className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 hover:to-red-700 text-lg font-semibold shadow-xl transition">
            <FaPlay className="transition-transform group-hover:scale-110" />
            Watch Now
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur text-lg font-semibold shadow-md transition">
            <FaPlus /> Add to List
          </button>
        </div>
      </div>

      {/* Thumbs (กล่องเล็กลง + กระชับ 5 รูป) */}
      <div className="absolute z-30 bottom-10 left-0 right-0 flex justify-center">
        {/* เดิม max-w-[1100px] → ลดเหลือ ~700px ให้พอดี 5 รูป */}
        <div className="w-full max-w-[700px] px-4">
          <div className="relative p-[2px] rounded-[20px] bg-gradient-to-r from-white/20 via-white/10 to-transparent shadow-[0_15px_40px_rgba(0,0,0,.45)]">
            <div
              ref={stripRef}
              className="relative flex gap-3 h-20 md:h-24 w-full overflow-x-auto rounded-[18px] px-3 py-2
                         bg-black/45 backdrop-blur-xl scrollbar-none"
            >
              {items.map((m, i) => (
                <button
                  key={m.movie_id || i}
                  data-index={i}
                  onClick={() => goTo(i)}
                  title={m.title}
                  className={`group relative shrink-0 overflow-hidden rounded-2xl w-[120px] h-full transition-all duration-500
                             ${
                               i === current
                                 ? "ring-[3px] ring-red-500/90 shadow-[0_10px_30px_rgba(0,0,0,.55)] scale-[1.02]"
                                 : "opacity-85 hover:opacity-100 hover:scale-[1.02]"
                             }`}
                >
                  <img
                    src={m.poster}
                    alt={m.title}
                    className="w-full h-full object-cover"
                  />
                  {/* badge ลำดับ/ทั้งหมด + ขอบบาง ๆ */}
                  <span className="absolute top-1 right-1 px-2 py-0.5 text-[10px] font-bold rounded-md
                                   bg-black/70 text-white/90 ring-1 ring-white/40 backdrop-blur-sm">
                    {i + 1} / {items.length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- HORIZONTAL ROW (Popular) ---------- */
function HorizontalRow({ title, items = [] }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    if (!rowRef.current) return;
    const { clientWidth } = rowRef.current;
    rowRef.current.scrollTo({
      left:
        rowRef.current.scrollLeft +
        (dir === "left" ? -clientWidth : clientWidth),
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-screen text-white px-6 md:px-10 mt-8 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>

      <div className="relative">
        {/* ปุ่มเลื่อนซ้าย */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full
                     bg-black/70 hover:bg-black/90 text-white shadow-lg hover:scale-110 transition"
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>

        {/* หนัง: คลิกแล้วไป detail/:id */}
        <div
          ref={rowRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-6 py-2 select-none scrollbar-none"
        >
          {items.map((m) => (
            <Link
              key={m.movie_id}
              to={`/detail/${m.movie_id}`}
              className="shrink-0 w-[190px] group relative rounded-2xl overflow-hidden
                         bg-white/5 ring-1 ring-white/10 shadow-lg hover:scale-[1.05] hover:shadow-2xl transition"
            >
              <img
                src={m.poster}
                alt={m.title}
                className="w-full aspect-[2/3] object-cover"
                loading="lazy"
              />
              <p className="mt-2 text-center text-sm text-white/90 line-clamp-1">
                {m.title}
              </p>
            </Link>
          ))}
        </div>

        {/* ปุ่มเลื่อนขวา */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full
                     bg-black/70 hover:bg-black/90 text-white shadow-lg hover:scale-110 transition"
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

/* ---------- GRID (Recommended) ---------- */
function GridSection({ title, items = [] }) {
  return (
    <section className="w-screen text-white px-6 md:px-10 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
        {items.map((m) => (
          <Link
            key={m.movie_id}
            to={`/detail/${m.movie_id}`}
            className="group rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 shadow-md hover:shadow-2xl hover:-translate-y-1 transition"
          >
            <img
              src={m.poster}
              alt={m.title}
              className="w-full aspect-[2/3] object-cover"
            />
            <p className="text-center mt-2 text-sm">{m.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------- HOME (API) ---------- */
export default function Home() {
  const [hero, setHero] = useState([]);
  const [popular, setPopular] = useState([]);
  const [grid, setGrid] = useState([]);

  const loadAll = async () => {
    const { data } = await api.get("/movie");
    const list = data?.movies || [];
    setHero(list.slice(0, 5));
    setPopular(list.slice(0, 12));
    setGrid(list.slice(12, 37));
  };

  useEffect(() => {
    loadAll();
  }, []);

  const heroItems = useMemo(() => hero, [hero]);

  return (
    <div className="min-h-screen overflow-x-hidden text-white">
      <HeroCarousel items={heroItems} />
      <HorizontalRow title="Popular This Week" items={popular} />
      <GridSection title="Recommended" items={grid} />
    </div>
  );
}
