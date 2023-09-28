import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { Input } from "./ui/Input";
import Button from "./ui/Button";
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 900;
  background-color: yellow;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <span>Hello World</span>
        <H1>Styled Components</H1>
        <Button>Check In</Button>
        <Button>Check Out</Button>
        <Input type="text" placeholder="Enter your name" />
        <Input type="text" placeholder="Enter your email" />
      </StyledApp>
    </>
  );
}

export default App;
