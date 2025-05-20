import { useEffect } from "react";
import useGames from "../../hook/useGames";
import { GameCard } from "./components/GameCard";
import { GameCardSkeleton } from "./components/GameCardSkeleton";
import { ErrorMessage } from "../../components/ErrorMessage";

export function Games() {
  const { getGames, response, loading, error } = useGames();

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:px-10 lg:px-15">

      <div className="mt-5 mb-10 px-2 text-center">
        <h1 className="text-4xl font-bold text-heading-1">
          Welcome to the Time Series Forecasting Dashboard
        </h1>
        <p className="mt-2 text-2xl text-heading-3">
          Here you'll find the 100 most-played Steam titles. Select a game to explore its data and generate forecasts.
        </p>
      </div>

      {error ? (
        <ErrorMessage message="Failed to load games. Please try again." />
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
