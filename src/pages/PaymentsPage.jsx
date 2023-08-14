import { Box, Center, Image, VStack, Text } from "@chakra-ui/react";
import PaymentOptions from "../components/PaymentOptions";
import momo from "../assets/momo.png";
import AppButtons from "../components/AppButtons";

function Payments({ uuid }) {
  return (
    <Center h="100vh" bg={"#fffadb"} width="100%">
      <VStack spacing={4}>
        <Box>
          <Image src={momo} boxSize={24} rounded={"md"} />
        </Box>
        <Text fontWeight={"600"} textAlign={"center"} fontFamily={"sans-serif"}>Use one of the methods below to complete payment to MoMo</Text>
        <PaymentOptions uuid={uuid}/>
      </VStack>
    </Center>
  );
}

export default Payments;
