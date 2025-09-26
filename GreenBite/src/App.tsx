import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import "./App.css";
import "./index.css";
import HomePage from "./features/ui/HomePage";
import Header from "./features/ui/Header";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />

        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />

        <Route 
          path="dashboard" 
          element={
            <>
              <SignedIn>
                <h1>Dashboard</h1>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        >
          <Route index element={<Navigate replace to="profile" />} />
          <Route 
            path="profile" 
            element={
              <>
                <SignedIn>
                  <h1>Profile</h1>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } 
          />
          <Route 
            path="add-meal" 
            element={
              <>
                <SignedIn>
                  <h1>Add Meal</h1>
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            } 
          />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      {/*    <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
