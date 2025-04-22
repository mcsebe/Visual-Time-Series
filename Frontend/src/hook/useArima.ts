import { useState, useCallback } from 'react';
import { postArima } from '../services/arimaService';
import { ArimaRequest, ArimaData } from '../types/arima';

export default function useArima() {
    const [response, setResponse] = useState<ArimaData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const sendArima = useCallback(async (arima: ArimaRequest) => {
        try {
            setLoading(true)
            setError(null)
            const data = await postArima(arima)
            setResponse(data)
          } catch (error) {
            setError((error as Error).message)
          } finally {
            setLoading(false)
          }
        }, [])
        return {
            sendArima,
            response,
            loading,
            error,
        }
}