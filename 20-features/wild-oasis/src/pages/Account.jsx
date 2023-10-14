import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading type="h1">Update your account</Heading>

      <Row>
        <Heading type="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading type="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
