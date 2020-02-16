import React from "react";
import "./App.css";
import Admin from "./components/Admin";
import styled from "styled-components";

const Container = styled.div`
  padding: 16px;
`;

function App() {
  return (
    <Container>
      <Admin />
    </Container>
  );
}

export default App;
