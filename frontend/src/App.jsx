import './App.css'
import Header from './components/Header';
import ProfilePage from "./pages/ProfilePage";
import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import {Box} from "@chakra-ui/layout";
import Journal from './pages/Journal';

function App() {
  return (
    <>
    <Box mb={50}><Header/></Box>
 
    
    <Routes>
    <Route path="/:username" element={<ProfilePage />} />
    <Route path="/" element={< HomePage/>} />
    <Route path="/:username/journal/:month/:day" element={<Journal/>} />


    </Routes>
    </>
  );
}

export default App