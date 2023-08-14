import { Box, Center, Flex, Image, Text, VStack } from "@chakra-ui/react";
import momo from "../assets/momo.png";
import Activation from "../components/Activation";
import AppButtons from "../components/AppButtons";

function ActivationPage({ uuid }) {
  return (
    <Center bg={"#fffadb"} width="100%" mt={8} mb={8}>
      <VStack>
        <VStack spacing={4}>
          <Box>
            <Image src={momo} boxSize={24} rounded={"md"} />
          </Box>
          <Text
            fontWeight={"600"}
            textAlign={"center"}
            fontFamily={"sans-serif"}
          >
            Input your details to link QR code with your MoMo wallet
          </Text>
          <Activation uuid={uuid} />
        </VStack>
        <Flex direction="column" align="center" justify="center" mt={6}>
          <Text mb={1} textAlign="center" fontWeight={"500"} maxW={{base:"100%", md:"50%"}}>
            If you're new to MoMo Wallet, you can get our app from the Google
            Play or Apple Store. Just click on the buttons below and sign up.
          </Text>
          <AppButtons />
        </Flex>
      </VStack>
    </Center>
  );
}

export default ActivationPage;
