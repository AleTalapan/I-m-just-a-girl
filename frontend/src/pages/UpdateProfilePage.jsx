'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import userLoggedin from '../atoms/userLoggedin';
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast';
import { useNavigate } from 'react-router-dom';


export default function UpdateProfilePage() {
    const [user, setUser] = useRecoilState(userLoggedin)
    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        password: ''
    });
    const fileRef = useRef(null);
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(`/${user.username}`);
    };
    const showToast = useShowToast();
    const {handleImageChange, imgUrl} = usePreviewImg();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log(inputs);
            const res = await fetch(`/api/users/update/${user._id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
            });
            const data = await res.json(); // updated user object
            console.log(data);
        
            if (data.error) {
              showToast("Error", error.message, "error");
              return;
            }
            showToast("Success", "Profile updated successfully", "success");
            setUser(data);
            localStorage.setItem("user-threads", JSON.stringify(data));
        
        } catch(error){
            showToast('Error', error, 'error');
        }
    };
  return (
    <form onSubmit={handleSubmit}>
    <Flex
      align={'center'}
      justify={'center'}
      >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.dark')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={imgUrl || user.profilePic}/>
            </Center>
            <Center w="full">
              <Button w="full" bg="purple.200" _hover={{ bg: '#6f00ff' }} onClick={() => fileRef.current.click()}>
                Change Avatar</Button>
              <Input type='file' hidden ref={fileRef} onChange={handleImageChange}/>
            </Center>
          </Stack>
        </FormControl>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Your name"
            value={inputs.username}
            onChange={(e) => setInputs({...inputs, username: e.target.value})}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            value={inputs.email}
            onChange={(e) => setInputs({...inputs, email: e.target.value})}
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="Your bio"
            value={inputs.bio}
            onChange={(e) => setInputs({...inputs, bio: e.target.value})}
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            value={inputs.password}
            onChange={(e) => setInputs({...inputs, password: e.target.value})}
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
            onClick={handleCancel}
            >
            Cancel
          </Button>
          <Button
            bg={'purple.500'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'purple.600',
            }}
            type='submit'
            
            >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
    </form>
  )
}