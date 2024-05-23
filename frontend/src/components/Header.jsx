import { useState, useEffect } from 'react';
import { Box, Link, HStack } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import FriendsList from './FriendsList';
import LogoutButton from './LogoutButton';
import { useRecoilValue } from 'recoil';
import userLoggedin from '../atoms/userLoggedin';

const Header = () => {
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false);
  const location = useLocation();
  const currentUser = useRecoilValue(userLoggedin);

  useEffect(() => {
    setIsFriendsListOpen(false); // Close friends list when page route changes
  }, [location]);

  const toggleFriendsList = () => {
    setIsFriendsListOpen(!isFriendsListOpen);
  };

  // Current Date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth is zero-indexed
  const currentDay = currentDate.getDate();
  const journalRoute = `${currentUser?.username}/${currentMonth}/${currentDay}`;

  return (
    <HStack spacing={4} justifyContent="center" p={5} >
      <Box
        bg="purple.200"
        _hover={{ bg: '#6f00ff' }}
        p={2}
        borderRadius="md"
        borderWidth="1px"
        borderColor="black"
        position="relative"
      >
        <Link  onClick={toggleFriendsList}>
          Friends
        </Link>
        {isFriendsListOpen && (
          <Box position="absolute" left="-500%" top="0" zIndex={10}>
            <FriendsList />
          </Box>
        )}

      </Box>

      <Link as={RouterLink} to="/"
      p={2} 
      bg="purple.200"
      borderRadius="md" 
      borderColor="black"
      borderWidth="1px" 
      _hover={{ bg: '#6f00ff' }}>
        Home
      </Link>

      <Link as={RouterLink} to={`/${currentUser?.username}`} 
      p={2} 
      bg="purple.200"
      borderColor="black"
      borderRadius="md" 
      borderWidth="1px" 
      _hover={{ bg: '#6f00ff' }}>
        My Profile
      </Link>

      <Link as={RouterLink} to={journalRoute}
      p={2} 
      bg="purple.200" 
      borderColor="black"
      borderRadius="md" 
      borderWidth="1px" 
      _hover={{ bg: '#6f00ff' }}>
        Journal
      </Link>

      <LogoutButton 
      p={2} 
      bg="purple.200" 
      borderColor="black"
      borderRadius="md" 
      borderWidth="1px" 
      _hover={{ bg: '#6f00ff' }} />

    </HStack>

  );
};

export default Header;
