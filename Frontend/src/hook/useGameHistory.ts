import { useState, useCallback } from 'react';
import { getGameHistory } from '../services/gameHistoryService';
import { GameHistory } from '../types/gameHistory';

export default function useGameHistory() {
    const [response, setResponse] = useState<GameHistory | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const getGame = useCallback(async (id: number) => {
        try {
            setLoading(true)
            setError(null)
            const data = await getGameHistory(id)
            setResponse(data)
          } catch (error) {
            setError((error as Error).message)
          } finally {
            setLoading(false)
          }
        }, [])
        return {
          getGame,
          response,
          loading,
          error,
        }
}