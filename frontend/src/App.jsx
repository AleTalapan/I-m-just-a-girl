import './App.css'
import Header from './components/Header';
import ProfilePage from "./pages/ProfilePage";
import {Route,Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import {Box} from "@chakra-ui/layout";

function App() {
  return (
    <>
    <Box mb={50}><Header/></Box>
 

    <Routes>
    <Route path="/:username" element={<ProfilePage />} />
    <Route path="/" element={< HomePage/>} />

    </Routes>
    </>
  );
}

export default App