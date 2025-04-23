import { Prediction } from "./pages/prediction/prediction"
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
                    <Prediction />
              }
            />
          </Routes>
        </Router>
      </Layout>
  )
}

export default App
