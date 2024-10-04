import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Auth = (props) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        py={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        minHeight="100vh">
        {props.children}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mt={2}>
          {"© "}
          {new Date().getFullYear()}
          {" EzySoft"}
        </Typography>
      </Box>
    </Container>
  );
};

export default Auth;
