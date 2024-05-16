import { useState, useEffect } from 'react';
import { Box, Link, HStack } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import FriendsList from './FriendsList';
import LogoutButton from './LogoutButton';
import userLoggedin from '../atoms/userLoggedin';
import { useRecoilValue } from 'recoil';

const Header = () => {
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false);
  const location = useLocation();
  const currentUser = useRecoilValue(userLoggedin);



  useEffect(() => {
    setIsFriendsListOpen(false); // Închide lista de prieteni când ruta paginii se schimbă
  }, [location]);

  const toggleFriendsList = () => {
    setIsFriendsListOpen(!isFriendsListOpen);
  };

  return (
    <HStack justifyContent="space-between">
      <Box
        hover={{ backgroundColor: '#b26ed4', color: "white" }}
        border="1px"
        borderRadius="md" p={2} bg="purple.200"
        position="relative"
      >
        <Link className='friends' onClick={toggleFriendsList}>
          Friends
        </Link>
        {isFriendsListOpen && (
          <Box position="absolute" left="-500%" top="0">
            <FriendsList />
          </Box>
        )}
      </Box>
      <Box
        _hover={{ backgroundColor: '#b26ed4', color: "white" }}
        border="1px"
        borderRadius="md" p={2} bg="purple.200"
      >
        <Link as={RouterLink} to="/">
          Home
        </Link>
      </Box>
      <Box
        _hover={{ backgroundColor: '#b26ed4', color: "white" }}
        border="1px"
        borderRadius="md" p={2} bg="purple.200"
      >
        <Link as={RouterLink} to={`/${currentUser.username}`}>
          My Profile
        </Link>
      </Box>
      <Box
        _hover={{ backgroundColor: '#b26ed4', color: "white" }}
        border="1px"
        borderRadius="md" p={2} bg="purple.200"
      >
        <Link as={RouterLink} to="/journal">
          Journal
        </Link>
      </Box>
      <Box
        _hover={{ backgroundColor: '#b26ed4', color: "white" }}
        border="1px"
        borderRadius="md" p={2} bg="purple.200"
      >
        <LogoutButton/>
      </Box>
    </HStack>
  );
};

export default Header;
