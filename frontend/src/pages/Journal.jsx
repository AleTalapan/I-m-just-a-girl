import React, { useState } from 'react';
import { Box, Text, Button, HStack, Flex } from "@chakra-ui/react";



const Journal = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 1360;
const longText="Text"
const [privacy, setPrivacy] = useState("red");
  // Funcție pentru a obține textul pentru pagina curentă
  const getCurrentPageText = () => {
    const startIndex = currentPage * pageSize;
    return longText.substring(startIndex, startIndex + pageSize);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString();
  };

  const handlePrivacyChange = (privacyLevel) => {
    setPrivacy(privacyLevel);
  };

  return (
    <Box>
      <Box
        width='510px'
        backgroundColor='#bf8358'
        p='20px'
        mb="20px"
        height='590px'
        position='relative'
        borderRadius={"10px"}
        fontFamily='cursive'
      >
        <Text  textAlign={"left"} marginTop={"50px"}>
            {getCurrentPageText()}
        </Text>

        <Text position='absolute' top='10px' right='20px' color='black'>
          {getCurrentDate()}
        </Text>

        <Text position='absolute' top='30px' left='20px' color='black'>
          Dear diary..
        </Text>
      </Box>

      <HStack spacing="10px" justifyContent="center">
        {Array.from({ length: Math.ceil(longText.length / pageSize) }, (_, i) => (
          <Button
            key={i}
            onClick={() => setCurrentPage(i)}
            colorScheme={currentPage === i ? "purple" : "gray"}
          >
            {i + 1}
          </Button>
        ))}
      </HStack>
      
      <HStack mt="20px" justifyContent="center">
        {currentPage > 0 && (
          <Button onClick={handlePrevPage}>Previous Page</Button>
        )}
        {longText.length > (currentPage + 1) * pageSize && (
          <Button onClick={handleNextPage}>Next Page</Button>
        )}
      </HStack>
     
      <HStack spacing="10px" justifyContent="center">
        <Button borderRadius="50px" onClick={() => handlePrivacyChange("red")} colorScheme={privacy === "red" ? "red" : "gray"}></Button>
        <Button borderRadius="50px" onClick={() => handlePrivacyChange("green")} colorScheme={privacy === "green" ? "green" : "gray"}></Button>
        <Button borderRadius="50px" onClick={() => handlePrivacyChange("yellow")} colorScheme={privacy === "yellow" ? "yellow" : "gray"}></Button>
      </HStack>

    </Box>
  );
};

export default Journal;
