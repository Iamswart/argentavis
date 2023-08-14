import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  useToast
} from "@chakra-ui/react";
import { saveAs } from "file-saver";
import * as toImage from "html-to-image";
import JSZip from "jszip";
import React, { useEffect, useRef, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { fetchQRCodes } from "../services/api-client";

const QrGrid = () => {
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const getQRCodes = async () => {
      try {
        const codes = await fetchQRCodes();
        setQrCodes(codes.slice(0, 30)); 
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    };

    getQRCodes();
  }, [toast]);

  const cardRefs = useRef([]);
  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const handleDownloadAll = async () => {
    setLoading(true);
    toast({
      title: "Downloading...",
      status: "info",
      duration: 9000,
      isClosable: true,
      position: "top",
    });

    const zip = new JSZip();
    const promises = [];

    cardRefs.current.forEach((cardRef, index) => {
      const promise = toImage
        .toBlob(cardRef)
        .then((blob) => {
          zip.file(`QRCode-${index + 1}.png`, blob);
        })
        .catch((error) => {
          console.error(
            `Failed to convert cardRef at index ${index} to blob.`,
            error
          );
        });

      promises.push(promise);
    });

    await Promise.all(promises);
    zip
      .generateAsync({ type: "blob" })
      .then((content) => {
        saveAs(content, "QR_Codes.zip");
        setLoading(false);

        toast({
          title: "Download Complete!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: "Error",
          description: "Something went wrong while downloading.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <Box>
      <Flex justifyContent="flex-end" mb={4} mr={12}>
        <Button
          onClick={handleDownloadAll}
          bg={"#000"}
          color={"#facb05"}
          rightIcon={<BiDownload />}
          _hover={{
            bgColor: "#000",
            transform: "translateY(-5px)",
          }}
        >
          Download All
        </Button>
      </Flex>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        padding="10px"
      >
        {qrCodes.map((qr) => (
          <Box key={qr._id} mb={4} position={"relative"}>
            
              <Image src={qr.s3URL} ref={addToRefs} />
              {qr.isActivated && (
                <Flex justify="center" mt={1}>
                <Button
                  size="sm"
                  disabled={true}
                  bg="red.500"
                  _hover={{bgColor: "red.500"}}
                >
                  Activated
                </Button>
              </Flex>
              )}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default QrGrid;


