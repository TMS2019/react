import { BrowserRouter, Route, Routes } from "react-router-dom";
import MiniDrawer from "../components/SideBar";
import Login from "../pages/Account/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/booking/*" element={<><MiniDrawer/></>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
