import { useState, useCallback } from 'react';
import { getTopGames } from '../services/gamesService';
import { GameData } from "../types/games";

export default function useGames() {
    const [response, setResponse] = useState<GameData[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const getGames = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await getTopGames()
            setResponse(data)
          } catch (error) {
            setError((error as Error).message)
          } finally {
            setLoading(false)
          }
        }, [])
        return {
          getGames,
          response,
          loading,
          error,
        }
}