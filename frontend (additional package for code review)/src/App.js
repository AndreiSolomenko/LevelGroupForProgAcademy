import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from './components/AnimatedRoutes';
import { LanguageProvider } from './components/LanguageProvider';

function App() {
  return (
    <div className="App">

      <Router>
        <LanguageProvider>
          <AnimatedRoutes />
        </LanguageProvider>
      </Router>

    </div>
  );
}

export default App;
