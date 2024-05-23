import  { useState,useEffect } from 'react';
import { Box, Text, Button, HStack, Textarea, useToast } from "@chakra-ui/react";
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import userLoggedin from '../atoms/userLoggedin';
import useShowToast from "../hooks/useShowToast";


const Journal = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 1360;
  const longText = "Text";

  const {username,month,day}=useParams();
  const [buttonText, setButtonText] = useState("Save");

  const currentUser = useRecoilValue(userLoggedin); 

  const [privacy, setPrivacy] = useState("red");
  const [editableText, setEditableText] = useState("");
  const toast = useToast();
  const showToast = useShowToast();

  const [journalEntry, setJournalEntry] = useState("");

//   console.log(currentUser);
//   console.log(username);
//pt intrarea din jurnal din ziua respectiva - merge 
useEffect(() => {
    const fetchJournalEntry = async () => {
      try {
        const res = await fetch(`/api/journal/${username}/${month}/${day}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", `Journal entry for ${month} / ${day} doesn't exist`, "error");
          return;
        }
        setJournalEntry(data.entry);
        setEditableText(data.entry);  
      } catch (error) {
        showToast("Error", "Failed to fetch journal", "error");
      }
    };
    fetchJournalEntry();
  }, [ username,month, day]);

  console.log(editableText);

  const handleSaveEntry = async () => {
    try {
        setButtonText("Saving...");
        const res = await fetch(`/api/journal/create/${month}/${day}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          createdBy: username,
          entry: editableText,
        }),
      });
  console.log(editableText);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json(); 
      setJournalEntry(data.entry);
      setEditableText(editableText);
      showToast("Success", "Journal entry saved successfully:", "success");
      //console.log("Journal entry saved successfully:", data);
      setButtonText("Saved");
      setTimeout(() => setButtonText("Save"), 2000); 
    } catch (error) {
      showToast("Error", "Failed to save changes", "error");
      setButtonText("Save");
    }
  };

  const handleDeleteEntry = async (e) => {
    try {
      
      if (!window.confirm("Are you sure you want to delete this entry?")) return;

      const res = await fetch(`/api/journal/${username}/${month}/${day}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Entry deleted", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
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
        height='600px'
        position='relative'
        borderRadius={"10px"}
        fontFamily='cursive'
      >


    {currentUser && currentUser.username === username ? (
    <>
      <Textarea 
        value={editableText}
        onChange={(e) => setEditableText(e.target.value)}
        placeholder="Text jurnal.."
        marginTop={"35px"}
        height="90%"
      />
      <Button onClick={handleSaveEntry} mt="2px">{buttonText}</Button>

      <Button onClick={handleDeleteEntry} mt="2px">Delete</Button>
     
    </>
        ) : (
    <Text textAlign={"left"} marginTop={"50px"}>
       {journalEntry || "No journal entry available"}
    </Text>
    )
    }

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
      
      {currentUser && currentUser._username === username && (
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