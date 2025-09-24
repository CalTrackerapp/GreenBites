import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import HomePage from "./features/ui/HomePage";
function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route index element={<HomePage />} />

        <Route path="sign-up" element={<h1>Sign-up</h1>} />
        <Route path="login" element={<h1>Login</h1>} />

        <Route path="dashboard" element={<h1>Dashboard</h1>}>
          <Route index element={<Navigate replace to="profile" />} />
          <Route path="profile" element={<h1>profile</h1>} />
          <Route path="add-meal" element={<h1>add meal</h1>} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      {/*    <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
