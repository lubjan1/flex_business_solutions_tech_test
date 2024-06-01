import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/home/Home";
import InventoryDashboard from "./component/home/InventoryDashboard";

function App() {

  return (
    <BrowserRouter>
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/inventory" element={<InventoryDashboard />} />
    </Routes>
  </BrowserRouter>
  );
};


export default App;
