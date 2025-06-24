"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useDashboardContext } from "@/providers/DashboardContext";
import { useLocalStorage } from "usehooks-ts";
import { cn } from "@/lib/utils";

function Dashboard() {
  const { companyData, isLoadingCompanyData, selectedCompanySymbol } =
    useDashboardContext();

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-[1440px]">
        <CompanyHeader />
        {selectedCompanySymbol && !isLoadingCompanyData && companyData && (
          <div className="p-8">
            <CompanyOverview />

            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <StockQuote />
              <CompanyNews />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Componentes auxiliares
function CompanyHeader() {
  const {
    companyData,
    selectedCompanyHasData,
    selectedCompanySymbol,
    isLoadingCompanyData,
  } = useDashboardContext();

  const [favouriteStocks, setFavouriteStocks] = useLocalStorage<
    { symbol: string; name: string }[]
  >("favouriteStocks", [], {
    serializer: (value) => JSON.stringify(value),
    deserializer: (value) => {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    },
  });

  const isFavourite = favouriteStocks.some(
    (stock) => stock.symbol === selectedCompanySymbol,
  );

  const toggleFavourite = () => {
    if (!selectedCompanySymbol || !companyData?.name) return;

    const stockToToggle = {
      symbol: selectedCompanySymbol,
      name: companyData.name,
    };

    if (isFavourite) {
      // Remover de favoritos
      setFavouriteStocks((prev) =>
        prev.filter((stock) => stock.symbol !== selectedCompanySymbol),
      );
    } else {
      // Agregar a favoritos
      setFavouriteStocks((prev) => [...prev, stockToToggle]);
    }
  };

  if (isLoadingCompanyData) {
    return (
      <div className="mx-6 flex h-dvh items-center justify-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-spin text-slate-600"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <div className="flex flex-col items-start justify-center gap-4">
          <h3 className="text-xl font-semibold text-slate-900">
            Cargando información de la empresa
          </h3>
          <p className="text-slate-600">Espere un momento...</p>
        </div>
      </div>
    );
  }

  if (
    !selectedCompanyHasData &&
    selectedCompanySymbol &&
    !isLoadingCompanyData
  ) {
    return (
      <div className="mx-6 flex h-dvh flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold text-slate-900">
          {selectedCompanySymbol}
        </h2>
        <h3 className="text-xl font-semibold text-orange-800">
          Información de la empresa
        </h3>
        <p className="text-slate-600">
          No se pudo cargar la información de la empresa
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-orange-800"
        >
          <path d="M12 12v4" />
          <path d="M12 20h.01" />
          <path d="M17 18h.5a1 1 0 0 0 0-9h-1.79A7 7 0 1 0 7 17.708" />
        </svg>
      </div>
    );
  }

  if (!selectedCompanySymbol || !companyData) {
    return (
      <div className="mx-6 flex h-dvh items-center justify-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-600"
        >
          <path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z" />
          <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
        </svg>
        <div className="flex flex-col items-start justify-center gap-4">
          <h3 className="text-xl font-semibold text-slate-900">
            Información de la empresa
          </h3>
          <p className="text-slate-600">
            Selecciona una empresa del panel lateral para ver su información
          </p>
        </div>
      </div>
    );
  }

  return (
    <header className="@container p-4 pb-0 sm:p-8">
      <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-slate-600 p-4 sm:p-6">
        {/* Fila superior con logo, nombre y botón favorito */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {companyData?.logo && (
              <Image
                src={companyData.logo}
                alt={companyData.name || ""}
                width={64}
                height={64}
                className="w-12 rounded-full border-2 border-slate-200 sm:w-[64px]"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-amber-200 sm:text-3xl">
                {companyData?.name}
              </h1>
              <p className="mt-1 text-base text-slate-200 sm:text-lg">
                {companyData?.ticker} • {companyData?.exchange}
              </p>
            </div>
          </div>

          <button
            className={cn(
              "group flex size-auto items-start justify-end text-slate-400 duration-300",
              isFavourite && "text-amber-200",
            )}
            aria-label={
              isFavourite ? "Quitar de favoritos" : "Agregar a favoritos"
            }
            title={isFavourite ? "Quitar de favoritos" : "Agregar a favoritos"}
            onClick={toggleFavourite}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isFavourite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-star-icon lucide-star group-hover:animate-pulse"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
          </button>
        </div>

        {/* Fila inferior con detalles */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <p className="text-sm text-slate-200">
            <span className="font-medium text-orange-200">País:</span>{" "}
            {companyData?.country}
          </p>
          <p className="text-sm text-slate-200">
            <span className="font-medium text-orange-200">Industria:</span>{" "}
            {companyData?.finnhubIndustry}
          </p>
          <p className="text-sm text-slate-200">
            <span className="font-medium text-orange-200">Moneda:</span>{" "}
            {companyData?.currency}
          </p>
        </div>
      </div>
    </header>
  );
}

function CompanyOverview() {
  const { companyData } = useDashboardContext();

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return `$${value?.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Información General
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-slate-700">
              Capitalización de Mercado
            </p>
            <p className="text-xl font-bold text-slate-900">
              {formatMarketCap(companyData?.marketCapitalization || 0)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">
              Acciones en Circulación
            </p>
            <p className="text-lg text-slate-900">
              {companyData?.shareOutstanding?.toLocaleString() || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">IPO</p>
            <p className="text-lg text-slate-900">
              {companyData?.ipo ? formatDate(companyData.ipo) : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Contacto</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-slate-700">Teléfono</p>
            <p className="text-lg text-slate-900">
              {companyData?.phone || "No disponible"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">Sitio Web</p>
            {companyData?.weburl ? (
              <a
                href={companyData.weburl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-blue-600 underline hover:text-blue-800"
              >
                Visitar sitio web
              </a>
            ) : (
              <p className="text-lg text-slate-900">No disponible</p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Datos de Trading
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-slate-700">Intercambio</p>
            <p className="text-lg text-slate-900">{companyData?.exchange}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">
              Moneda de Estimación
            </p>
            <p className="text-lg text-slate-900">
              {companyData?.estimateCurrency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type StockQuoteData = {
  c: number; // precio actual
  h: number; // precio alto del día
  l: number; // precio bajo del día
  o: number; // precio de apertura
  pc: number; // precio de cierre anterior
  t: number; // timestamp
};

function StockQuote() {
  const { selectedCompanySymbol } = useDashboardContext();
  const [quote, setQuote] = useState<StockQuoteData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCompanySymbol) return;

    const fetchQuote = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/stocks/${selectedCompanySymbol}/quote`,
        );
        if (response.ok) {
          const { data }: { data: StockQuoteData } = await response.json();
          setQuote(data);
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [selectedCompanySymbol]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Cotización Actual
        </h3>
        <div className="animate-pulse space-y-3">
          <div className="h-8 rounded bg-slate-200"></div>
          <div className="h-6 rounded bg-slate-200"></div>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Cotización Actual
        </h3>
        <p className="text-slate-600">No se pudo cargar la cotización actual</p>
      </div>
    );
  }

  const changePercent = ((quote.c - quote.pc) / quote.pc) * 100;
  const isPositive = changePercent >= 0;

  return (
    <div className="h-fit rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        Cotización Actual
      </h3>
      <div className="space-y-4">
        <div>
          <p className="text-3xl font-bold text-slate-900">${quote.c}</p>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`text-sm font-medium ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? "+" : ""}
              {(quote.c - quote.pc).toFixed(2)}
            </span>
            <span
              className={`text-sm font-medium ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              ({isPositive ? "+" : ""}
              {changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-600">Alto</p>
            <p className="font-medium">${quote.h}</p>
          </div>
          <div>
            <p className="text-slate-600">Bajo</p>
            <p className="font-medium">${quote.l}</p>
          </div>
          <div>
            <p className="text-slate-600">Apertura</p>
            <p className="font-medium">${quote.o}</p>
          </div>
          <div>
            <p className="text-slate-600">Cierre Anterior</p>
            <p className="font-medium">${quote.pc}</p>
          </div>
        </div>
        <div className="border-t pt-2">
          <p className="text-xs text-slate-500">
            Actualizado: {new Date(quote.t * 1000).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

type NewsArticle = {
  headline: string;
  summary: string;
  url: string;
  datetime: number;
};

function CompanyNews() {
  const { selectedCompanySymbol } = useDashboardContext();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCompanySymbol) return;

    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/stocks/${selectedCompanySymbol}/news`,
        );
        if (response.ok) {
          const { data }: { data: NewsArticle[] } = await response.json();
          setNews(data.slice(0, 5)); // Solo mostramos las 5 noticias más recientes
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCompanySymbol]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Noticias Recientes
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-2 h-4 rounded bg-slate-200"></div>
              <div className="h-3 w-2/3 rounded bg-slate-200"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        Noticias Recientes
      </h3>
      {news.length === 0 ? (
        <p className="text-slate-600">No hay noticias disponibles</p>
      ) : (
        <div className="space-y-4">
          {news.map((article, index) => (
            <div
              key={index}
              className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
            >
              <h4 className="mb-1 line-clamp-2 text-sm font-medium text-slate-900">
                {article.headline}
              </h4>
              <p className="mb-2 text-xs text-slate-600">
                {new Date(article.datetime * 1000).toLocaleDateString("es-ES")}
              </p>
              <p className="line-clamp-2 text-xs text-slate-700">
                {article.summary}
              </p>
              {article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs text-blue-600 underline hover:text-blue-800"
                >
                  Leer más
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
