import styled from "styled-components";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 900;
  background-color: yellow;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.8rem 1.2rem;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <StyledApp>
      <span>Hello World</span>
      <H1>Styled Components</H1>
      <Button>Check In</Button>
      <Button>Check Out</Button>
      <Input type="text" placeholder="Enter your name" />
    </StyledApp>
  );
}

export default App;
