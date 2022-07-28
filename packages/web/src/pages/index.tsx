import { Button, Container, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => (
  <div>
    <Container
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top="50%"
      left="50%"
      bg="blue.500"
    >
      <Heading>Hello World</Heading>
    </Container>
  </div>
);

export default Home;
