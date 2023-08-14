import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Navbar from "../components/NavBar";
import NotFound from "../components/404";
import BadRequest from "../components/Wrong";
import {Box, Heading} from "@chakra-ui/react"

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