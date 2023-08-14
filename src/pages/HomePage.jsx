import Code1 from "../components/Code1";
import Code2 from "../components/Code2";
import QrGrid from "../components/QRgrid";
import QrCode from "../components/QrCode";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/NavBar";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import * as toImage from 'html-to-image';


const HomePage = () => {

  return (
    <>
      <Navbar/>
      <Box bg={"#fffadb"} width={"100%"} mt={24}>
        <QrGrid />
      </Box>
    </>
  );
};

export default HomePage;
