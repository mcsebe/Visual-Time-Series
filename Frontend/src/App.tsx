import { Prediction } from "./pages/prediction/prediction"
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom"
import { ThemeProvider } from "./components/themeProvider"

function App() {

  return (
    <div className="bg-background">
      <ThemeProvider>
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
      </ThemeProvider>
    </div>
  )
}

export default App
