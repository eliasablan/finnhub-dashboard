"use client";

import { useDashboardContext } from "@/providers/DashboardContext";
import { useState, useRef, useEffect } from "react";

export function FavouriteStocks() {
  const { setSelectedCompanySymbol } = useDashboardContext();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú si se hace clic fuera del mismo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const options = [
    { value: "googl", label: "Google" },
    { value: "aapl", label: "Apple" },
    { value: "msft", label: "Microsoft" },
    { value: "amzn", label: "Amazon" },
    { value: "tsla", label: "Tesla" },
    { value: "nflx", label: "Netflix" },
    { value: "sony", label: "Sony" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón con estrella */}
      <button
        aria-label="Seleccionar acción favorita"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
      >
        <span className="text-lg">⭐</span>
        <span className="-mr-1 text-xs">▼</span>
      </button>

      {/* Lista de opciones */}
      {open && (
        <ul className="absolute right-0 z-40 mt-2 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                setSelectedCompanySymbol(option.value);
                setOpen(false);
              }}
              className="cursor-pointer px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-blue-50 dark:text-gray-100 dark:hover:bg-blue-600"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
