import React from "react";
import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Slide}
    />
    </>
    
  ); 
}

export default App;
