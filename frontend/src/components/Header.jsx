import { useState, useEffect } from 'react';
import { Box, Link, HStack, VStack } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import FriendsList from './FriendsList';

const Header = () => {
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false);
  const location = useLocation();

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
        <Link as={RouterLink} to="/profile">
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
        <Link as={RouterLink} to="/logout" className='log-out'>
          Log Out
        </Link>
      </Box>
    </HStack>
  );
};

export default Header;
