import {
  useLoginMutation,
  useSignupMutation,
  type NewUserInput,
} from "@/generated/graphql-types";
import { useUserStore } from "@/lib/userManager";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const Login = () => {
  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();
  const router = useRouter();
  const recordUser = useUserStore((state) => state.login);

  const hSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const input = {
      mail: values.mail,
      password: values.password,
    } as NewUserInput;

    switch (values["action"]) {
      case "login":
        await login({
          variables: {
            data: input,
          },
          onCompleted: (data) => {
            recordUser(JSON.parse(data.login));
            router.push("/");
          },
        });
        break;
      case "signup":
        await signup({
          variables: {
            data: input,
          },
          onCompleted: (data) => {
            recordUser(JSON.parse(data.signup));
            router.push("/");
          },
        });
        break;
      default:
        return;
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
