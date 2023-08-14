import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { activateQRCode } from "../services/api-client";


const Activation = ({ uuid }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    accountNumber: "",
  });

  const navigate = useNavigate();


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    let validationErrors = {};
    if (!formData.firstName)
      validationErrors.firstName = "First name is required";
    if (!formData.lastName) validationErrors.lastName = "Last name is required";
    if (!formData.accountNumber) {
      validationErrors.accountNumber = "Account number is required";
    } else if (formData.accountNumber.length !== 10) {
      validationErrors.accountNumber =
        "Account number must be exactly 10 digits";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Continue to process the form, e.g., send to a server
      try {
        const data = await activateQRCode(
          uuid,
          formData.firstName,
          formData.lastName,
          formData.accountNumber
        );
        // Handle successful activation, e.g., show a success message or redirect the user
        // alert(data.message);
        // navigate("/verify-otp");
        navigate("/verify-otp", { state: { uuid: uuid } });
      } catch (error) {
        console.error("Error activating QR code:", error);
        alert(
          error.message ||
            "There was a problem activating the QR code. Please try again."
        );
      }
    }
  };

  return (
    <Box bg="#044c73" p={6} borderRadius="md" width="100%">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired isInvalid={!!errors.firstName}>
            <FormLabel color="#facb05">First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              borderColor="#facb05"
              color={"white"}
            />
            <FormErrorMessage>{errors.firstName}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.lastName}>
            <FormLabel color="#facb05">Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              borderColor="#facb05"
              color={"white"}
            />
            <FormErrorMessage>{errors.lastName}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.accountNumber}>
            <FormLabel color="#facb05">Account Number</FormLabel>
            <Input
              type="number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              borderColor="#facb05"
              color={"white"}
            />
            <FormErrorMessage>{errors.accountNumber}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            bg="#facb05"
            color="#044c73"
            _hover={{ bgColor: "#e5aa00" }}
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Activation;
