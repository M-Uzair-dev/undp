"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { FaUser, FaIdCard, FaCalendarAlt, FaMapMarkerAlt, FaHome, FaMap, FaCheckCircle, FaRegCalendarCheck, FaTree, FaLeaf, FaGlobe, FaCoins, FaCalculator } from "react-icons/fa";

// Dynamic import for the map to avoid SSR issues
const Map = dynamic(() => import("./MapComponent"), { ssr: false });


const iconMap = {
  "Serial Number": <FaIdCard className="text-green-500 w-5 h-5" />,
  "Name": <FaUser className="text-green-500 w-5 h-5" />,
  "Father Name": <FaUser className="text-green-500 w-5 h-5" />,
  "CNIC": <FaIdCard className="text-green-500 w-5 h-5" />,
  "Village Name": <FaHome className="text-green-500 w-5 h-5" />,
  "UC": <FaMap className="text-green-500 w-5 h-5" />,
  "Tehsil": <FaMap className="text-green-500 w-5 h-5" />,
  "Location": <FaMapMarkerAlt className="text-green-500 w-5 h-5" />,
  "Date of Commissioning": <FaCheckCircle className="text-green-500 w-5 h-5" />,
  "Installation Date": <FaRegCalendarCheck className="text-green-500 w-5 h-5" />,
  "Days Since Commissioning": <FaCalculator className="text-green-500 w-5 h-5" />,
  "Wood Saved": <FaTree className="text-green-500 w-5 h-5" />,
  "CO2 Saved": <FaLeaf className="text-green-500 w-5 h-5" />,
  "Trees Saved": <FaTree className="text-green-500 w-5 h-5" />,
  "Area Saved": <FaGlobe className="text-green-500 w-5 h-5" />,
  "Carbon Credits": <FaCoins className="text-green-500 w-5 h-5" />
};

export default function BeneficiaryPage({ params }) {
  const [entryData, setEntryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntryData = async () => {
      try {
        setLoading(true);
        const serialNumber = params.route.split("b")[1];
        const response = await fetch(`https://undp-backend.vercel.app/api/entry/${serialNumber}`);
        
        if (!response.ok) {
          throw new Error('Entry not found');
        }
        
        const data = await response.json();
        setEntryData(data);
      } catch (err) {
        setError(err.message);
        // Fallback to mock data for development
        setEntryData(mockEntryData);
      } finally {
        setLoading(false);
      }
    };

    fetchEntryData();
  }, [params.route]);

  if (loading) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center px-2 py-8" style={{fontFamily: 'Poppins, sans-serif'}}>
        <div className="text-white text-xl">Loading beneficiary data...</div>
      </div>
    );
  }

  if (error && !entryData) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center px-2 py-8" style={{fontFamily: 'Poppins, sans-serif'}}>
        <div className="text-white text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-2 py-8" style={{fontFamily: 'Poppins, sans-serif'}}>
      {/* Page Title */}
      <h2 className="mainheading text-3xl md:text-3xl font-extrabold text-white mb-10 tracking-wide drop-shadow-2xl animate-fade-in text-center" style={{fontFamily: 'Poppins, sans-serif'}}>
        UNDP – Fuel Efficient Stoves in Lasbela
      </h2>
      
      {/* Beneficiary Information Card */}
      <div className="relative z-10 w-full max-w-xl bg-white/90 rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-md border border-green-100 animate-fade-in transition-all duration-700">
        <div className="flex flex-col items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-400 to-emerald-400 flex items-center justify-center shadow-md mb-2 animate-fade-in">
            <FaUser className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-green-800 tracking-tight drop-shadow-sm animate-fade-in">Beneficiary Information</h1>
        </div>
        <div className="divide-y divide-green-50">
          <InfoRow label="Serial Number" value={entryData.serialNumber} />
          <InfoRow label="Name" value={entryData.name} />
          <InfoRow label="Father Name" value={entryData.fatherName} />
          <InfoRow label="CNIC" value={entryData.cnic} />
          <InfoRow label="Village Name" value={entryData.villageName} />
          <InfoRow label="UC" value={entryData.uc} />
          <InfoRow label="Tehsil" value={entryData.tehsil} />
          <InfoRow label="Installation Date" value={entryData.installationDate} />
        </div>
      </div>
      <div className="relative z-20 w-full max-w-xl h-64 rounded-2xl overflow-hidden shadow-lg border border-green-100 bg-white/95 backdrop-blur-md animate-fade-in transition-all duration-700 hover:shadow-2xl" style={{marginBottom:'2rem'}}>
        <Map entryData={entryData} />
      </div>
      {/* Environmental Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl mb-8">
        {/* Wood Saved Card */}
        <div className="relative z-20 bg-gradient-to-tr from-green-400/90 to-emerald-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-green-200 backdrop-blur-md">
          <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center mb-3 shadow-md animate-pulse">
            <FaTree className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in">{entryData.calculatedValues.woodSaved}</div>
          <div className="text-base md:text-lg font-medium text-white/80 mt-1 tracking-wide animate-fade-in">Wood Saved</div>
         
        </div>

        {/* CO2 Saved Card */}
        <div className="relative z-20 bg-gradient-to-tr from-blue-400/90 to-indigo-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-blue-200 backdrop-blur-md">
          <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center mb-3 shadow-md animate-pulse">
            <FaLeaf className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in">{entryData.calculatedValues.co2Saved}</div>
          <div className="text-base md:text-lg font-medium text-white/80 mt-1 tracking-wide animate-fade-in">CO₂ Saved</div>
          
        </div>

        {/* Trees Saved Card */}
        <div className="relative z-20 bg-gradient-to-tr from-emerald-400/90 to-teal-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-emerald-200 backdrop-blur-md">
          <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center mb-3 shadow-md animate-pulse">
            <FaTree className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in">{entryData.calculatedValues.treesSaved}</div>
          <div className="text-base md:text-lg font-medium text-white/80 mt-1 tracking-wide animate-fade-in">Trees Saved</div>
          
        </div>

        {/* Area Saved Card */}
        <div className="relative z-20 bg-gradient-to-tr from-purple-400/90 to-pink-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-purple-200 backdrop-blur-md">
          <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center mb-3 shadow-md animate-pulse">
            <FaGlobe className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in">{entryData.calculatedValues.areaSaved}</div>
          <div className="text-base md:text-lg font-medium text-white/80 mt-1 tracking-wide animate-fade-in">Acres of Area Saved</div>
         
        </div>

        {/* Carbon Credits Card */}
        <div className="relative z-20 bg-gradient-to-tr from-yellow-400/90 to-orange-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-yellow-200 backdrop-blur-md">
          <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center mb-3 shadow-md animate-pulse">
            <FaCoins className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in">{entryData.calculatedValues.carbonCredits}</div>
          <div className="text-base md:text-lg font-medium text-white/80 mt-1 tracking-wide animate-fade-in">Carbon Credits</div>
          
        </div>
      </div>

      {/* Map Card */}
      
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-row items-center justify-between py-3 px-1 animate-fade-in transition-all duration-700 group">
      <span className="flex items-center gap-2 text-green-700 font-medium text-base">
        {iconMap[label]}
        {label}:
      </span>
      <span className="text-gray-700 text-sm md:text-base font-normal group-hover:text-green-600 transition-colors duration-300 text-right min-w-[120px]">{value}</span>
    </div>
  );
} 