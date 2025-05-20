import { PredictionParams } from "./components/predictionParams"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGameHistory from "../../hook/useGameHistory";


export function Prediction() {
  const { id } = useParams();
  const { getGame, response, loading, error } = useGameHistory();

  useEffect(() => {
    getGame(Number(id));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:px-10 lg:px-15">
      <h1>{id}</h1>
      <div className="relative z-10 h-full flex">
        <div className="flex flex-1 justify-end items-center">
          <PredictionParams />
        </div>
      </div>
    </div>
  )
}
