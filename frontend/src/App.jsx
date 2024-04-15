import './App.css'
import Header from './components/Header';
import { Button } from "@chakra-ui/button";
import { Container } from "@chakra-ui/react";
import {Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
function App() {
  return (
    <Container maxW='620px'>
      <Header />
      <Routes>
        <Route path='/auth' element={<AuthPage />} />
      </Routes>
    </Container>
  );
}

export default App