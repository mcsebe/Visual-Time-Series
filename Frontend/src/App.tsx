import { Prediction } from "./pages/prediction/Prediction"
import { Games } from "./pages/games/Games"
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"
import { Layout } from "./components/Layout"

function App() {

  return (
      <Layout title="TimeSeries">
        <Router>
          <Routes>

            <Route
              path="/"
              element={
                    <Games />
              }
            />
          </Routes>
        </Router>
      </Layout>
  )
}

export default App
