import './App.css'
import Header from './components/Header';
import { Container } from "@chakra-ui/react";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import {Navigate,Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import { useRecoilValue } from 'recoil';
import userLoggedin from './atoms/userLoggedin';
import Journal from './components/Journal';
import UpdateProfilePage from './pages/UpdateProfilePage';


function App() {
  const currentUser=useRecoilValue(userLoggedin);
  console.log(currentUser)
  const showHeader = currentUser && location.pathname !== '/update';
  
  return (
    <Container maxW='620px'>
    {showHeader && <Header />}
    <Routes>
    <Route path="/" element={currentUser ? <HomePage /> : <Navigate to="/auth" />}/>
    <Route path="/auth" element={!currentUser ? <AuthPage /> : <Navigate to="/" />}/>
    <Route path="/update" element={currentUser ? <UpdateProfilePage /> : <Navigate to="/" />}/>
    <Route path="/:username" element={<ProfilePage />} />
    <Route path="/:username/:month/:day" element={<Journal />} /> 
  

      </Routes>
    </Container>
  );
}

export default App