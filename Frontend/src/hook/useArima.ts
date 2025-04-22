import { useState, useEffect } from 'react';
import { postArima } from '../services/arimaService';
import { ArimaRequest, ArimaData } from '../types/arima';



export default function useArima(params: ArimaRequest) {
    const [arima, setArima] = useState<ArimaData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true)
                setError(null)
                const { data } = await postArima(params)
                setArima(data)
            } catch (error) {
                setError((error as Error).message)
            } finally {
                setLoading(false)
            }
        };
    
        fetchBrands();
    }, []);
    
    return {
        arima,
        loading,
        error,
    }
}