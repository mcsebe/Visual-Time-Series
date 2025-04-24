import { PredictionParams } from "./components/PredictionParams";

export function Games() {
  return (
    <div className="relative h-screen overflow-hidden">

      <div className="relative z-10 h-full flex">
        <div className="flex flex-1 justify-end items-center">
          <PredictionParams />
        </div>
      </div>
    </div>
  )
}