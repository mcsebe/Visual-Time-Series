import { useEffect } from "react";
import useGames from "../../hook/useGames";
import { GameCard } from "./components/GameCard";
import { GameCardSkeleton } from "./components/GameCardSkeleton";

export function Games() {
  const { getGames, response, loading, error } = useGames();

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:px-10 lg:px-15">
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
    </div>
  );
}
