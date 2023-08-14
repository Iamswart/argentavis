import {
  Box,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  useClipboard,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { MdDialerSip, MdApps } from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import AppButtons from "../components/AppButtons"

const PaymentOptions = ({ uuid }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isCopied, setIsCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { onCopy } = useClipboard(userDetails?.accountNumber || "", {
    onCopy: () => {
      setIsCopied(true);
      setShowTooltip(true);
      // Reset after a few seconds
      setTimeout(() => {
        setIsCopied(false);
        setShowTooltip(false);
      }, 4000);
    },
  });

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetch("https://qr-pay.onrender.com/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: uuid }),
        });

        const data = await response.json();
        setUserDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    }

    if (uuid) {
      fetchUserDetails();
    }
  }, [uuid]);

  return (
    <Box>
      <VStack spacing={4}>
        <Accordion allowToggle>
          <AccordionItem mb={4}>
            <AccordionButton
              as="a"
              display="flex"
              justifyContent="center"
              alignItems="center"
              w="full"
              bgColor={"#044c73"}
              cursor={"pointer"}
              color={"white"}
              rounded={"lg"}
              _hover={{
                bgColor: "#044c73",
              }}
            >
              <Box flex="1" textAlign="left">
                Pay with USSD
              </Box>
              <MdDialerSip color="#facb05" />
            </AccordionButton>
            <AccordionPanel>
              {/* Content for USSD Payment Option */}
              USSD Payment Details Here
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem mb={4}>
            <AccordionButton
              as="a"
              display="flex"
              justifyContent="center"
              alignItems="center"
              w="full"
              bgColor={"#044c73"}
              cursor={"pointer"}
              color={"white"}
              rounded={"lg"}
              _hover={{
                bgColor: "#044c73",
              }}
            >
              <Box flex="1" textAlign="left">
                Pay with Bank Transfer
              </Box>
              <BsBank color="#facb05" />
            </AccordionButton>
            <AccordionPanel>
              {loading ? (
                <Text color="gray.500" fontSize="lg">
                  Loading...
                </Text>
              ) : userDetails ? (
                <>
                  <Text fontWeight="bold" fontSize="md" color="gray.700" mb={2}>
                    Account Name: {userDetails.firstName} {userDetails.lastName}
                  </Text>
                  <Box display="flex" alignItems="center">
                    <Text
                      fontWeight="semibold"
                      fontSize="lg"
                      color="blue.600"
                      border="1px"
                      borderColor="blue.500"
                      p={2}
                      rounded="md"
                      flex="1"
                    >
                      Account Number: {userDetails.accountNumber}
                    </Text>
                    <Tooltip
                      label={isCopied ? "Copied!" : "Copy Account Number"}
                      isOpen={showTooltip}
                      placement="top"
                    >
                      <IconButton
                        aria-label="Copy Account Number"
                        icon={<FaCopy />}
                        onClick={onCopy}
                        ml={2}
                        bgColor={"#044c73"}
                        color={"#facb05"}
                        _hover={{
                          bgColor: "#044c73",
                          transform: "translateY(-5px)",
                        }}
                      />
                    </Tooltip>
                  </Box>
                </>
              ) : (
                <Text color="red.500" fontSize="lg">
                  Failed to fetch user details
                </Text>
              )}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton
              as="a"
              display="flex"
              justifyContent="center"
              alignItems="center"
              w="full"
              bgColor={"#044c73"}
              cursor={"pointer"}
              color={"white"}
              rounded={"lg"}
              _hover={{
                bgColor: "#044c73",
              }}
            >
              <Box flex="1" textAlign="left">
                Pay with Momo App
              </Box>
              <MdApps color="#facb05" />
            </AccordionButton>
            <AccordionPanel>
              <AppButtons />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </Box>
  );
};

export default PaymentOptions;
