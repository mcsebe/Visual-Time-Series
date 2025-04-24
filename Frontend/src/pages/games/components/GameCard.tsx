import { GameData } from "../../../types/games";
import { useState } from "react";
import ImageNotFound from "../../../assets/NotFound.png";

export const GameCard = ({ name, app_id, concurrent_players }: GameData) => {
  const [imgSrc, setImgSrc] = useState(`https://cdn.cloudflare.steamstatic.com/steam/apps/${app_id}/header.jpg`);

  return (
    <div className="relative max-w-115 max-h-55 overflow-hidden rounded-2xl shadow-color-1 group">
        <a href={`/prediction/${app_id}`}>
            <img
                src={imgSrc}
                onError={() => setImgSrc(ImageNotFound)}
                alt={name}
                className="transition-transform group-hover:scale-110 duration-200"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex justify-between w-full p-3">
                <div className="text-xl text-white">{name}</div>
                <div className="text-l text-green-400">{concurrent_players}</div>
                </div>
            </div>
        </a>
    </div>
  );
};