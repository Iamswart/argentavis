import { Box, Button, FormControl, FormLabel, Input, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpForm = ({ uuid }) => {
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate(); 
  const toast = useToast();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmitOtp = (e) => {
    e.preventDefault();
    
    // Validate OTP
    if (otp === "123456" && uuid) {
      toast({
        title: "User activated successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate(`/?uuid=${uuid}`);
    } else {
      setErrorMsg("Wrong OTP. Please try again.");
      toast({
        title: "Wrong OTP. Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmitOtp}>
        <FormControl isRequired>
          <FormLabel color="#044c73">Enter OTP</FormLabel>
          <Input
            type="text"
            name="otp"
            value={otp}
            onChange={handleOtpChange}
            borderColor="#facb05"
          />
          {errorMsg && <Text color="red.500" mt={2}>{errorMsg}</Text>}
        </FormControl>
        <Flex justifyContent="center" mt={4}>
          <Button
            type="submit"
            bg="#044c73"
            color="#facb05"
            _hover={{
              bgColor: "#facb05",
              color: "#044c73",
              transform: "translateY(-5px)",
            }}
          >
            Submit OTP
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default OtpForm;
