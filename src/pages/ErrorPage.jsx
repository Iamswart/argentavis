import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NotFound from "../components/404";
import Navbar from "../components/NavBar";
import BadRequest from "../components/Wrong";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <Navbar />
      <Box>
        <Heading>Ooops</Heading>
        {isRouteErrorResponse(error) ? <NotFound /> : <BadRequest />}
      </Box>
    </>
  );
};

export default ErrorPage;