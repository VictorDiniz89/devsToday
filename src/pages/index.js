import { useState, useEffect } from 'react';

export default function Home() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .then(response => response.json())
      .then(data => setVehicleTypes(data.Results));
    
    const currentYear = new Date().getFullYear();
    const yearRange = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);
    setYears(yearRange);
  }, []);

  useEffect(() => {
    setIsButtonEnabled(selectedType && selectedYear);
  }, [selectedType, selectedYear]);

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-800 drop-shadow-lg">Car Dealer Application</h1>
      <div className="mb-6 w-full max-w-md">
        <label className="block mb-2 text-lg font-semibold text-blue-700">Vehicle Type</label>
        <select
          className="border border-blue-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition ease-in-out duration-200"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Select a vehicle type</option>
          {vehicleTypes.map((type) => (
            <option key={type.MakeId} value={type.MakeId}>
              {type.MakeName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6 w-full max-w-md">
        <label className="block mb-2 text-lg font-semibold text-blue-700">Model Year</label>
        <select
          className="border border-blue-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition ease-in-out duration-200"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select a model year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <button
        className={`w-full max-w-md p-3 rounded-md text-white font-semibold transition-all duration-200 transform ${
          isButtonEnabled
            ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
            : 'bg-blue-300 cursor-not-allowed'
        }`}
        disabled={!isButtonEnabled}
        onClick={() => {
          if (isButtonEnabled) {
            window.location.href = `/result/${selectedType}/${selectedYear}`;
          }
        }}
      >
        Next
      </button>
    </div>
  );
}  