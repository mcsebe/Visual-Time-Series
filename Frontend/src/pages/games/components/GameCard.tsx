import { GameData } from "../../../types/games";

export const GameCard = ({name, app_id, concurrent_players}: GameData) => {
    return (
        <div className="relative max-w-s overflow-hidden rounded-2xl shadow-color-1 group">
            <img src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${app_id}/header.jpg`} alt={name} className="transition-transform group-hover:scale-110 duration-200" />
            <div className="absolute inset-0 flex  flex-row items-end bg-gradient-to-t from-black/60 to-transparent">
                <div className="p-4 text-white">{name}</div>
                <div className="p-4 text-white">{concurrent_players}</div>
            </div>
        </div>
    );
}