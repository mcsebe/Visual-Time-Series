import { useEffect } from "react";
import useGames from "../../hook/useGames";
import { GameCard } from "./components/GameCard";
import { GameCardSkeleton } from "./components/GameCardSkeleton";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export function Games() {
  const { getGames, response, loading, error } = useGames();

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:px-10 lg:px-15">
      {error ? (
        <div className="flex flex-col items-center justify-center text-center mt-20 text-gray-600">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-400 mb-4" />
          <h2 className="text-4xl font-semibold">Failed to load games</h2>
          <p className="text-xl mt-2">An error occurred while fetching the information. Please try again later.</p>
        </div>
      ) : (
        <div className="relative z-10 w-full flex flex-wrap justify-center gap-8">
          {loading && !response
            ? Array.from({ length: 100 }).map((_, index) => (
                <GameCardSkeleton key={index} />
              ))
            : response.map((game) => (
                <GameCard
                  key={game.app_id}
                  name={game.name}
                  app_id={game.app_id}
                  concurrent_players={game.concurrent_players}
                />
              ))}
        </div>
      )}
    </div>
  );
}
