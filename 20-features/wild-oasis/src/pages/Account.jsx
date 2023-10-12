import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading type="h1">Update your account</Heading>

      <Row>
        <Heading type="h3">Update user data</Heading>
        <p>Update user data form</p>
      </Row>

      <Row>
        <Heading type="h3">Update password</Heading>
        <p>Update user password form</p>
      </Row>
    </>
  );
}

export default Account;
