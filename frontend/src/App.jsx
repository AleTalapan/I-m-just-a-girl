import './App.css'
import Header from './components/Header';
import { Container } from "@chakra-ui/react";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import {Navigate,Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import {Box} from "@chakra-ui/layout";
import { useRecoilValue } from 'recoil';
import userLoggedin from './atoms/userLoggedin';


function App() {
  const user=useRecoilValue(userLoggedin);
  console.log(user)
  
  return (
    <Container maxW='620px'>
    <Box mb={50}><Header/></Box>
    <Routes>
    <Route path="/:username" element={<ProfilePage />} />
    <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to="/" />} />
	  <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
  

      </Routes>
    </Container>
  );
}

export default App