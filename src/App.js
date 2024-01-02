import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  BeforeLogin,
  Details,
  Dashboard,
  AdminPage,
  LoginAdmin,
  AddAccount,
  EditAccount,
} from "./pages";
import ProtectedUser from "./protectedUser/protectedUser";
import ProtectedAdmin from "./protectedUser/protectedAdmin";
import Penilaian from "./pages/Penilaian";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BeforeLogin />} />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedUser />}>
          <Route path="/details" element={<Details />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/penilaian" element={<Penilaian />} />
        </Route>
        <Route element={<ProtectedAdmin />}>
          <Route path="/addacc" element={<AddAccount />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/editPusk" element={<EditAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
