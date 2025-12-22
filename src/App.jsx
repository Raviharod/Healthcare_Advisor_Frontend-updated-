import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="w-full h-auto bg-[#e9f1ff]">
        <Header />
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
