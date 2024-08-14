import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Loading from '../../../components/loading';

export default function ResultPage() {
  const router = useRouter();
  const { makeId, year } = router.query;
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (makeId && year) {
      async function fetchModels() {
        setLoading(true);
        try {
          const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
          const data = await response.json();
          setModels(data.Results);
        } catch (error) {
          console.error('Error fetching models:', error);
        } finally {
          setLoading(false);
        }
      }
      fetchModels();
    }
  }, [makeId, year]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Vehicle Models for {year}</h1>
      {models.length > 0 ? (
        <ul className="bg-white shadow-lg rounded-lg p-4 w-full max-w-lg">
          {models.map((model) => (
            <li key={model.Model_ID} className="mb-2 p-2 border-b last:border-none">
              <span className="text-gray-800 font-semibold">{model.Model_Name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-500">No models found for the selected type and year.</p>
      )}
    </div>
  );
}
