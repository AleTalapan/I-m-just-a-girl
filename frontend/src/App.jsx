import './App.css'
import Header from './components/Header';
import { Button } from "@chakra-ui/button";
import { Container } from "@chakra-ui/react";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import {Box} from "@chakra-ui/layout";
import Journal from './pages/Journal';


function App() {
  return (
    <Container maxW='620px'>
      <Box mb={50}><Header/></Box>
      <Routes>
      	<Route path="/:username" element={<ProfilePage />} />
        <Route path='/auth' element={<AuthPage />} />
	<Route path="/" element={< HomePage/>} />
    <Route path="/:userId/journal/:month/:day" element={<Journal/>} />

      </Routes>
    </Container>
  );
}

export default App