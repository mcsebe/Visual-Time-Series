import { useState } from "react"
import useArima from "../../../hook/useArima"
import { ArimaRequest } from "../../../types/arima"

export function PredictionParams() {
  const { sendArima, response, loading, error } = useArima()
  const [formData, setFormData] = useState<ArimaRequest>({
    data: [],
    params: {
      exog: null,
      order: [0, 0, 0],
      trend: null,
      enforce_stationarity: true,
      enforce_invertibility: true,
      concentrate_scale: false,
      trend_offset: 1,
      dates: null,
      freq: null,
      validate_specification: true
    },
    number_test: 0,
    number_predict: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendArima(formData)
    console.log('ARIMA Response:', response)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof ArimaRequest],
          [child]: type === 'number' ? Number(value) : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }))
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">ARIMA Parameters</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data (comma-separated numbers)</label>
          <input
            type="text"
            name="data"
            onChange={(e) => setFormData(prev => ({
              ...prev,
              data: e.target.value.split(',').map(num => Number(num.trim()))
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Order (p,d,q)</label>
          <input
            type="text"
            name="params.order"
            onChange={(e) => setFormData(prev => ({
              ...prev,
              params: {
                ...prev.params,
                order: e.target.value.split(',').map(num => Number(num.trim())) as [number, number, number]
              }
            }))}
            placeholder="0,0,0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Trend</label>
          <select
            name="params.trend"
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">None</option>
            <option value="c">Constant</option>
            <option value="t">Linear</option>
            <option value="ct">Constant and Linear</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Test Samples</label>
          <input
            type="number"
            name="number_test"
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Predictions</label>
          <input
            type="number"
            name="number_predict"
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="params.enforce_stationarity"
              checked={formData.params.enforce_stationarity}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                params: {
                  ...prev.params,
                  enforce_stationarity: e.target.checked
                }
              }))}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Enforce Stationarity</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Processing...' : 'Run ARIMA'}
        </button>

        {error && (
          <div className="text-red-600 text-sm mt-2">
            Error: {error}
          </div>
        )}
      </form>
    </div>
  )
}