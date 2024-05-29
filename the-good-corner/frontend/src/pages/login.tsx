import {
  useLoginMutation,
  useSignupMutation,
  type NewUserInput,
} from "@/generated/graphql-types";
import { FormEvent } from "react";

const Login = () => {
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();

  const hSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const input = {
      mail: values.mail,
      password: values.password,
    } as NewUserInput;

    if (values["action"] === "login") {
      await login({
        variables: {
          data: input,
        },
        onCompleted: (data) => {
          localStorage.setItem("profile", data.login);
        },
      });
    } else {
      await signup({
        variables: {
          data: input,
        },
        onCompleted: (data) => {
          localStorage.setItem("profile", data.signup);
        },
      });
    }
  };

  return (
    <>
      <form onSubmit={hSubmit}>
        <input type="text" name="mail" placeholder="mail" />
        <input type="password" name="password" placeholder="password" />
        <label>
          Login
          <input type="radio" name="action" value="login" />
        </label>
        <label>
          Signup
          <input type="radio" name="action" value="signup" />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
};

export default Login;
