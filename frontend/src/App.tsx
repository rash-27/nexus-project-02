import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Notfound from "./pages/Notfound"
import Profile from "./pages/Profile"
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup  />} />
      <Route path="/profile" element={<Profile  />} />
      <Route path="/*" element={<Notfound />} />
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
