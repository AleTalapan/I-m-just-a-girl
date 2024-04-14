import  { useState,useEffect } from 'react';
import { Box, Text, Button, HStack, Textarea, useToast } from "@chakra-ui/react";

const Journal = ({ currentUser, username, month, day}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 1360;
  const longText = "Text";

  const [privacy, setPrivacy] = useState("red");

  const [editableText, setEditableText] = useState("");

  const toast = useToast();

  const [journalEntry, setJournalEntry] = useState("");

//pt intrarea din jurnal din ziua respectiva
  useEffect(() => {
    const fetchJournalEntry = async () => {
      try {
        const response = await fetch(`api/journal/${username}/${month}/${day}`);
        const data = await response.json();
        setJournalEntry(data.entry);//ultimele date incarcate
        setEditableText(data.entry); //ce s-a editat
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch journal", error);
      }
    };
    fetchJournalEntry();//apelez functia ca altfel nu se apeleaza niciodata
  }, [username, month, day]);


  const handleSave = async () => {
    try {
      const response = await fetch(`api/journal/${username}/${month}/${day}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entry: editableText })
      });
      if (response.ok) {
        toast({
          title: "Saved",
          description: "Changes have been saved.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error("Failed to save changes:", error);
      toast({
        title: "Error",
        description: "Failed to save changes.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

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
        {currentUser && currentUser._id === user._id ? (
          <>
            <Textarea
              value={editableText}
              onChange={(e) => setEditableText(e.target.value)}
              placeholder="Text jurnal.."
              size="sm"
              height="80%"
            />
            <Button onClick={handleSave} mt="10px">Save</Button>
          </>
        ) : (
          <Text textAlign={"left"} marginTop={"50px"}>
            {getCurrentPageText()}
          </Text>
        )}

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
      
      {currentUser && currentUser._id === user._id && (
        <HStack spacing="10px" justifyContent="center" mt="20px">
          <Button 
              borderRadius="50px" 
              onClick={() => handlePrivacyChange("red")} 
              bg={privacy === "red" ? "red.500" : "red.200"} 
              border={privacy === "red" ? "2px solid black" : "none"}
              _hover={{ bg: "red.500" }}
          >
          </Button>
          <Button 
              borderRadius="50px" 
              onClick={() => handlePrivacyChange("green")} 
              bg={privacy === "green" ? "green.500" : "green.200"} 
              border={privacy === "green" ? "2px solid black" : "none"}
              _hover={{ bg: "green.500" }}
          >
          </Button>
          <Button 
              borderRadius="50px" 
              onClick={() => handlePrivacyChange("yellow")} 
              bg={privacy === "yellow" ? "yellow.500" : "yellow.200"} 
              border={privacy === "yellow" ? "2px solid black" : "none"}
              _hover={{ bg: "yellow.500" }}
          >
          </Button>
      </HStack>
      )}

    </Box>
  );
};

export default Journal;
