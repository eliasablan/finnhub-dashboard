"use client";

import { useDashboardContext } from "@/providers/DashboardContext";
import { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export function FavouriteStocks() {
  const { setSelectedCompanySymbol } = useDashboardContext();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [favouriteStocks] = useLocalStorage<{ symbol: string; name: string }[]>(
    "favouriteStocks",
    [],
    {
      serializer: (value) => JSON.stringify(value),
      deserializer: (value) => {
        try {
          return JSON.parse(value);
        } catch {
          return [];
        }
      },
    },
  );

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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón con estrella */}
      <button
        aria-label="Seleccionar acción favorita"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        disabled={favouriteStocks?.length === 0}
      >
        <span className="text-lg">⭐</span>
        <span className="text-xs font-bold">{favouriteStocks.length || 0}</span>
        {favouriteStocks.length > 0 && <span className="-mr-1 text-xs">▼</span>}
      </button>

      {/* Lista de opciones */}
      {open && favouriteStocks.length > 0 && (
        <ul className="absolute right-0 z-40 mt-2 w-52 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
          {favouriteStocks.map((stock) => (
            <li
              key={stock.symbol}
              onClick={() => {
                setSelectedCompanySymbol(stock.symbol);
                setOpen(false);
              }}
              className="cursor-pointer px-4 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-blue-50 dark:text-gray-100 dark:hover:bg-blue-600"
            >
              <div className="flex items-center justify-start gap-2">
                <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                  {stock.symbol.toUpperCase()}
                </span>
                <span>{stock.name}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Mensaje cuando no hay favoritos */}
      {open && favouriteStocks.length === 0 && (
        <div className="absolute right-0 z-40 mt-2 w-48 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            No tienes stocks favoritos aún
          </p>
        </div>
      )}
    </div>
  );
}
