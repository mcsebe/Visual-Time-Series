import { PredictionParams } from "./components/predictionParams"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGameHistory from "../../hook/useGameHistory";
import { ErrorMessage } from "../../components/ErrorMessage";
import { LineChart } from '@mui/x-charts/LineChart';


export const dataset = [
  { x: 1, y: 2 },
  { x: 2, y: 5.5 },
  { x: 3, y: 2 },
  { x: 5, y: 8.5 },
  { x: 8, y: 1.5 },
  { x: 10, y: 5 },
];


export function Prediction() {
  const { id } = useParams();
  const { getGame, response, loading, error } = useGameHistory();

  useEffect(() => {
    getGame(Number(id));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:px-10 lg:px-15">
      {error ? (
        <ErrorMessage message='Failed to load information'/>
      ) : (
        <div className="mx-auto max-w-7xl w-full px-10 sm:px-8 md:px-14 lg:px-5      flex flex-col md:flex-row gap-10 lg:gap-12 items-center">
          <div className="w-full md:w-5/12 lg:w-1/3     border-2 border-gray-200 rounded-lg shadow-md p-4">
            <div className="w-full relative">
              <h1>{id}</h1>
              <PredictionParams />
            </div>
          </div>


          <div className="w-full md:w-7/12 lg:w-3/4 flex flex-col    border-2 border-gray-200 rounded-lg shadow-md p-4">
            <LineChart
              dataset={dataset}
              xAxis={[{ dataKey: 'x' }]}
              series={[{ dataKey: 'y' }]}
              height={300}
              grid={{ vertical: true, horizontal: true }}
            />
          </div>

        </div>
       )}
    </div>
  )
}
