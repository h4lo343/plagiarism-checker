import {HomePage} from "./pages";
import {BrowserRouter, Route, Routes} from "react-router-dom";

const App = () => {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<HomePage />} />
              </Routes>
          </BrowserRouter>
      </div>
  );
};

export default App;

