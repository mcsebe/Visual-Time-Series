import { PredictionParams } from "./components/predictionParams"
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGameHistory from "../../hook/useGameHistory";
import { ErrorMessage } from "../../components/ErrorMessage";
import { ComposedChart, Line, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, } from 'recharts';



const data = [
  { date: '16 May', value: 800000 },
  { date: '17 May', value: 1500000 },
  { date: '18 May', value: 1450000 },
  { date: '19 May', value: 1420000 },
  { date: '20 May', value: 1400000 },
  { date: '21 May', value: 1000000 },
  { date: '22 May', value: 1500000 },
];


export function Prediction() {
  const { id } = useParams();
  const { getGame, response, loading, error } = useGameHistory();

  useEffect(() => {
    getGame(Number(id));
  }, []);

  return (
    <div className="relative min-h-screen p-4 lg:px-15">
      {error ? (
        <ErrorMessage message='Failed to load information'/>
      ) : (
        <div className="mx-auto w-full px-2 flex flex-col lg:flex-row gap-5 items-center">
          <div className="w-full md:w-full lg:w-2/5     border-2 border-gray-200 rounded-lg shadow-md p-4">
            <div className="w-full relative">
              <h1>{id}</h1>
              <PredictionParams />
            </div>
          </div>



          <div className="h-100 w-full md:w-full lg:w-2/3 flex flex-col            border-2 border-gray-200 rounded-lg shadow-md"> {/* bg-white */}
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <defs>
                  <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d9ff00" stopOpacity={0.05} />
                    <stop offset="100%" stopColor="#d9ff00" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#444" vertical={false} /> {/* líneas continuas */}
                <XAxis
                  dataKey="date"
                  stroke="#ccc"
                  tick={{ fill: '#ccc', dy: 10  }}
                  tickFormatter={(value) => {
                    const index = data.findIndex((d) => d.date === value);
                    if (index === 0 || index === data.length - 1) return ''; 
                    return value;
                  }}
                />
                <YAxis
                  stroke="#ccc"
                  tick={{ fill: '#ccc', dx: -10, textAnchor: 'start', dy: -10}}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) =>  (val / 1000).toLocaleString('de-DE') + 'k'}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#d9ff00' }}
                  formatter={(val) => [val.toLocaleString('de-DE'), 'Players']}
                />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="none"
                  fill="url(#gradientArea)"
                  tooltipType="none" // <- Evita duplicación en tooltip
                />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#97C34B"
                  strokeWidth={4}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>

          </div>



        </div>
       )}
    </div>
  )
}
