import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useJobsStore } from "./store/useUsersStore";
import generateJob from "./store/generateJob";
import { PrimeTable } from "./component/primeTable/PrimeTable";
import Home from "./component/home/Home";

function App() {

  return (
    <div>
      <Home />
    </div>
  );
};


export default App;
