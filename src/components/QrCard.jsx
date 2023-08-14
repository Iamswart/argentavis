import {
  Box,
  Flex,
  Stack,
  Image,
} from "@chakra-ui/react";
import React from "react";
import Code2 from "./Code2";

const Card = ({ s3URL }) => {
  return (
    <Box
      w={"full"}
      overflow="hidden"
      bgColor={"transparent"}
      position={"relative"}
      pb={4}
    >
      <Stack spacing={2}>
        <Flex w={"full"} justifyContent="center" alignItems="stretch">
          <Box w="100%">
            <Image src="s3URL" alt="QR Code"/>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
};

const QrCard = () => {
  return <Card />;
};

export default QrCard;
