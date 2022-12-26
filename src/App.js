import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./mycomponets/pages/Home";
import About from "./mycomponets/pages/About";
import Contact from "./mycomponets/pages/Contact";
import Header from "./mycomponets/layout/Header";
import { Route, Routes } from "react-router-dom";
import NoteFound from "./mycomponets/pages/NoteFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Login from "./mycomponets/pages/Login";
import Footer from "./mycomponets/layout/Footer";
import RegistrationForm from "./mycomponets/pages/RegistrationForm";

function App() {  
  const localData = localStorage.getItem("token");
  const [logout, setlogout] = useState(localData);
  return (
    <>
      {!logout ? (
        <>
          <Routes>
            <Route path="/" element={<Login setlogout = {setlogout}/>} />
            <Route path="/Registration" element={<RegistrationForm />} />
          </Routes>
        </>
      ) : (
        <>
          {/* <funFunction.provider> */}
          <Header setlogout={setlogout}/>
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/about" exact element={<About />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="*" element={<NoteFound />} />
          </Routes>
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          {/* </funFunction.provider> */}
        </>
      )}
    </>
  );
}

export default App;
