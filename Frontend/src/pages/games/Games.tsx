import { useEffect } from "react";
import useGames from "../../hook/useGames";
import { GameCard } from "./components/GameCard";

export function Games() {
  const { getGames, response, loading, error } = useGames();

  useEffect(() => {
    getGames();
  }, []);

  if (loading && !response) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden p-4">
      <div className="relative z-10 w-full flex flex-wrap justify-center gap-4">
        {response.map((game) => (
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
