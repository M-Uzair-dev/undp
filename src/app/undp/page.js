"use client";
import React, { useState, useEffect } from "react";
import {
  FaUsers,
  FaTree,
  FaLeaf,
  FaGlobe,
  FaCoins,
  FaCalculator,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";

export default function DashboardPage() {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://undp-backend.vercel.app/api/statistics"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }

        const data = await response.json();
        setStatsData(data);
      } catch (err) {
        setError(err.message);
        // Fallback mock data for development
        setStatsData({
          totalEntries: 500,
          averageDaysSinceCommissioning: "45.2",
          totalWoodSaved: "337500.00 kg",
          totalTreesSaved: "210.94",
          totalAreaSaved: "0.42188",
          totalCo2Saved: "556.88 tCO2",
          totalCarbonCredits: "556.88",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div
        className="relative min-h-screen flex flex-col items-center justify-center px-2 py-8"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="text-white text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  if (error && !statsData) {
    return (
      <div
        className="relative min-h-screen flex flex-col items-center justify-center px-2 py-8"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div
      className="dashboard relative min-h-screen flex flex-col items-center justify-center px-2 py-8"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Page Title */}
      <h2
        className="mainheading text-3xl md:text-4xl font-extrabold text-white mb-10 tracking-wide drop-shadow-2xl animate-fade-in text-center"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        UNDP – Fuel Efficient Stoves Dashboard
      </h2>

      {/* Overview Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white/90 rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-md border border-green-100 animate-fade-in transition-all duration-700">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-400 to-emerald-400 flex items-center justify-center shadow-md mb-3 animate-fade-in">
            <FaChartLine className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 tracking-tight drop-shadow-sm animate-fade-in">
            Phase 1
          </h1>
          <p className="text-green-600 mt-2 text-center">
            Comprehensive statistics for all beneficiaries
          </p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div
        style={{ padding: "0 5vw" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mb-8"
      >
        {/* Total Entries Card */}
        <div className="relative z-20 bg-gradient-to-tr from-green-400/90 to-emerald-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-green-200 backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mb-4 shadow-md animate-pulse">
            <FaUsers className="w-9 h-9 text-white" />
          </div>
          <div className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg animate-fade-in">
            {statsData.totalEntries}
          </div>
          <div className="text-lg md:text-xl font-medium text-white/90 mt-2 tracking-wide animate-fade-in">
            Total Beneficiaries
          </div>
          <div className="text-sm text-white/70 mt-3 text-center">
            Fuel efficient stoves installed
          </div>
        </div>

        {/* Average Days Card */}
        <div className="relative z-20 bg-gradient-to-tr from-blue-400/90 to-indigo-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-blue-200 backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mb-4 shadow-md animate-pulse">
            <FaCalendarAlt className="w-9 h-9 text-white" />
          </div>
          <div className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg animate-fade-in">
            {statsData.averageDaysSinceCommissioning}
          </div>
          <div className="text-lg md:text-xl font-medium text-white/90 mt-2 tracking-wide animate-fade-in">
            Avg. Days Since Commissioning
          </div>
          <div className="text-sm text-white/70 mt-3 text-center">
            Average operational time
          </div>
        </div>

        {/* Total Wood Saved Card */}
        <div className="relative z-20 bg-gradient-to-tr from-emerald-400/90 to-teal-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-emerald-200 backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mb-4 shadow-md animate-pulse">
            <FaTree className="w-9 h-9 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in">
            {statsData.totalWoodSaved}
          </div>
          <div className="text-lg md:text-xl font-medium text-white/90 mt-2 tracking-wide animate-fade-in">
            Total Wood Saved
          </div>
          <div className="text-sm text-white/70 mt-3 text-center">
            15 kg saved per day per beneficiary
          </div>
        </div>

        {/* Total CO2 Saved Card */}
        <div className="relative z-20 bg-gradient-to-tr from-cyan-400/90 to-blue-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-cyan-200 backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mb-4 shadow-md animate-pulse">
            <FaLeaf className="w-9 h-9 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in">
            {statsData.totalCo2Saved}
          </div>
          <div className="text-lg md:text-xl font-medium text-white/90 mt-2 tracking-wide animate-fade-in">
            Total CO₂ Emmissions Saved
          </div>
          <div className="text-sm text-white/70 mt-3 text-center">
            1.65× wood saved conversion
          </div>
        </div>

        {/* Total Trees Saved Card */}
        <div className="relative z-20 bg-gradient-to-tr from-teal-400/90 to-green-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-teal-200 backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mb-4 shadow-md animate-pulse">
            <FaTree className="w-9 h-9 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in">
            {statsData.totalTreesSaved}
          </div>
          <div className="text-lg md:text-xl font-medium text-white/90 mt-2 tracking-wide animate-fade-in">
            Total Trees Saved
          </div>
          <div className="text-sm text-white/70 mt-3 text-center">
            500 kg wood = 1 tree equivalent
          </div>
        </div>

        {/* Total Area Saved Card */}
        <div className="relative z-20 bg-gradient-to-tr from-purple-400/90 to-pink-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-purple-200 backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mb-4 shadow-md animate-pulse">
            <FaGlobe className="w-9 h-9 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in">
            {statsData.totalAreaSaved}
          </div>
          <div className="text-lg md:text-xl font-medium text-white/90 mt-2 tracking-wide animate-fade-in">
            Total Forest Saved
          </div>
          <div className="text-sm text-white/70 mt-3 text-center">
            500 trees = 1 acre of forest
          </div>
        </div>

        {/* Total Carbon Credits Card */}
        <div className="relative z-20 bg-gradient-to-tr from-yellow-400/90 to-orange-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-yellow-200 backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mb-4 shadow-md animate-pulse">
            <FaCoins className="w-9 h-9 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in">
            {statsData.totalCarbonCredits}
          </div>
          <div className="text-lg md:text-xl font-medium text-white/90 mt-2 tracking-wide animate-fade-in">
            Total Carbon Credits Earned
          </div>
          <div className="text-sm text-white/70 mt-3 text-center">
            1000 kg CO₂ = 1 carbon credit
          </div>
        </div>
      </div>

      {/* Impact Summary Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white/90 rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-md border border-green-100 animate-fade-in transition-all duration-700">
        <div className="flex flex-col items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-400 to-emerald-400 flex items-center justify-center shadow-md mb-2 animate-fade-in">
            <FaCalculator className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-green-800 tracking-tight drop-shadow-sm animate-fade-in">
            Environmental Impact Summary
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {statsData.totalEntries}
            </div>
            <div className="text-green-700 font-medium">
              Beneficiaries Impacted
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {statsData.totalCo2Saved}
            </div>
            <div className="text-green-700 font-medium">
              CO₂ Emissions Prevented
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-green-800 text-center font-medium">
            This project has successfully prevented deforestation equivalent to{" "}
            {statsData.totalAreaSaved} acres of forest land, saving{" "}
            {statsData.totalTreesSaved} trees and generating{" "}
            {statsData.totalCarbonCredits} carbon credits.
          </p>
        </div>
      </div>
    </div>
  );
}
