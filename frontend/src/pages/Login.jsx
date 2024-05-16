'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import useShowToast from '../hooks/useShowToast'
import userLoggedin from '../atoms/userLoggedin'

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false)
  const setAuthScreen=useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userLoggedin);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const showToast = useShowToast();
  const handleLogin = async () => {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.setItem("journal", JSON.stringify(data));
      setUser(data);


      console.log("Login successful", data)
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('purple.200', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          w={{
            base: "full",
            sm:"400px",
          }}
          >
          <Stack spacing={4}>
              
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" 
                   value={inputs.username}
                   onChange={(e) =>
                     setInputs((inputs) => ({...inputs,username: e.target.value,}))}
                  />
                </FormControl>
              </Box>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} 
                   value={inputs.password}
                   onChange={(e) =>
                     setInputs((inputs) => ({...inputs,password: e.target.value,}))}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'purple.500'}
                color={'white'}
                _hover={{
                  bg: 'purple.600',
                }}
                onClick={handleLogin}
                >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don&apos;t have an account? <Link color={'#6f00ff'}
                  onClick={() => setAuthScreen("signup")}
                >Sign up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}