"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { FaUser, FaIdCard, FaCalendarAlt, FaMapMarkerAlt, FaHome, FaMap, FaCheckCircle, FaRegCalendarCheck, FaTree, FaLeaf, FaGlobe, FaCoins, FaCalculator } from "react-icons/fa";

// Dynamic import for the map to avoid SSR issues
const Map = dynamic(() => import("./MapComponent"), { ssr: false });

// Mock data structure matching the Entry model
const mockEntryData = {
  serialNumber: "p1b1",
  name: "Ghulam Akbar Noor Muhammad",
  fatherName: "Noor Muhammad",
  cnic: "51505-0789042-9",
  villageName: "Noor Muhammad Goth",
  uc: "MC Uthal",
  tehsil: "Uthal",
  location: "Lasbela District",
  dateOfCommissioning: "2025-06-25",
  installationDate: "2025-06-25",
  calculatedValues: {
    daysSinceCommissioning: 45,
    woodSaved: "675.00 kg",
    co2Saved: "1.11 tCO2",
    treesSaved: "0.42",
    areaSaved: "0.00084",
    carbonCredits: "1.11"
  }
};

const iconMap = {
  "Serial Number": <FaIdCard className="text-blue-400 w-5 h-5" />,
  "Name": <FaUser className="text-blue-400 w-5 h-5" />,
  "Father Name": <FaUser className="text-blue-400 w-5 h-5" />,
  "CNIC": <FaIdCard className="text-blue-400 w-5 h-5" />,
  "Village Name": <FaHome className="text-blue-400 w-5 h-5" />,
  "UC": <FaMap className="text-blue-400 w-5 h-5" />,
  "Tehsil": <FaMap className="text-blue-400 w-5 h-5" />,
  "Location": <FaMapMarkerAlt className="text-blue-400 w-5 h-5" />,
  "Date of Commissioning": <FaCheckCircle className="text-blue-400 w-5 h-5" />,
  "Installation Date": <FaRegCalendarCheck className="text-blue-400 w-5 h-5" />,
  "Days Since Commissioning": <FaCalculator className="text-blue-400 w-5 h-5" />,
  "Wood Saved": <FaTree className="text-blue-400 w-5 h-5" />,
  "CO2 Saved": <FaLeaf className="text-blue-400 w-5 h-5" />,
  "Trees Saved": <FaTree className="text-blue-400 w-5 h-5" />,
  "Area Saved": <FaGlobe className="text-blue-400 w-5 h-5" />,
  "Carbon Credits": <FaCoins className="text-blue-400 w-5 h-5" />
};

export default function BeneficiaryPage({ params }) {
  const [entryData, setEntryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntryData = async () => {
      try {
        setLoading(true);
        const serialNumber = params.route; // Extract serial number from route
        const response = await fetch(`http://localhost:5000/api/entry/${serialNumber}`);
        
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
      <div className="relative z-10 w-full max-w-xl bg-white/90 rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-md border border-blue-100 animate-fade-in transition-all duration-700">
        <div className="flex flex-col items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-400 flex items-center justify-center shadow-md mb-2 animate-fade-in">
            <FaUser className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-blue-800 tracking-tight drop-shadow-sm animate-fade-in">Beneficiary Information</h1>
        </div>
        <div className="divide-y divide-blue-50">
          <InfoRow label="Serial Number" value={entryData.serialNumber} />
          <InfoRow label="Name" value={entryData.name} />
          <InfoRow label="Father Name" value={entryData.fatherName} />
          <InfoRow label="CNIC" value={entryData.cnic} />
          <InfoRow label="Village Name" value={entryData.villageName} />
          <InfoRow label="UC" value={entryData.uc} />
          <InfoRow label="Tehsil" value={entryData.tehsil} />
          <InfoRow label="Location" value={entryData.location} />
          <InfoRow label="Date of Commissioning" value={entryData.dateOfCommissioning} />
          <InfoRow label="Installation Date" value={entryData.installationDate} />
        </div>
      </div>

      {/* Environmental Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mb-8">
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

        {/* Carbon Credits Card */}
        <div className="relative z-20 bg-gradient-to-tr from-yellow-400/90 to-orange-400/90 rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center animate-fade-in border border-yellow-200 backdrop-blur-md">
          <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center mb-3 shadow-md animate-pulse">
            <FaCoins className="w-8 h-8 text-white" />
          </div>
          <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg animate-fade-in">{entryData.calculatedValues.carbonCredits}</div>
          <div className="text-base md:text-lg font-medium text-white/80 mt-1 tracking-wide animate-fade-in">Carbon Credits</div>
        </div>
      </div>

      {/* Additional Impact Metrics */}
      <div className="relative z-10 w-full max-w-xl bg-white/90 rounded-2xl shadow-xl p-6 mb-8 backdrop-blur-md border border-blue-100 animate-fade-in transition-all duration-700">
        <div className="flex flex-col items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-400 to-emerald-400 flex items-center justify-center shadow-md mb-2 animate-fade-in">
            <FaGlobe className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-green-800 tracking-tight drop-shadow-sm animate-fade-in">Environmental Impact</h1>
        </div>
        <div className="divide-y divide-green-50">
          <InfoRow label="Days Since Commissioning" value={entryData.calculatedValues.daysSinceCommissioning} />
          <InfoRow label="Area Saved" value={`${entryData.calculatedValues.areaSaved} acres`} />
        </div>
      </div>

      {/* Map Card - Note: You'll need to update this with actual coordinates */}
      <div className="relative z-20 w-full max-w-xl h-64 rounded-2xl overflow-hidden shadow-lg border border-blue-100 bg-white/95 backdrop-blur-md animate-fade-in transition-all duration-700 hover:shadow-2xl flex items-center justify-center" style={{marginBottom:'2rem'}}>
        <div className="text-center text-gray-600">
          <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-2 text-blue-400" />
          <p>Map coordinates to be added</p>
        </div>
        <div className="absolute top-3 left-3 bg-blue-600/80 text-white px-3 py-1 rounded-full text-xs font-medium shadow animate-fade-in">Location Map</div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-row items-center justify-between py-3 px-1 animate-fade-in transition-all duration-700 group">
      <span className="flex items-center gap-2 text-blue-700 font-medium text-base">
        {iconMap[label]}
        {label}:
      </span>
      <span className="text-gray-700 text-sm md:text-base font-normal group-hover:text-blue-600 transition-colors duration-300 text-right min-w-[120px]">{value}</span>
    </div>
  );
} 