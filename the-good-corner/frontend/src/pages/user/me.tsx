import { type NewUserInput } from "@/generated/graphql-types";
import { useUserStore } from "@/lib/userManager";
import { useRouter } from "next/router";
import { FormEvent } from "react";

const Login = () => {
  const router = useRouter();
  const profile = useUserStore((state) => state.profile);
  const logout = useUserStore((state) => state.logout);
  if (!profile) router.push("/");

  const hLogout = () => {
    logout();
  };

  return (
    <>
      <pre>{JSON.stringify(profile)}</pre>
      <button onClick={hLogout}>Log out ?</button>
    </>
  );
};

export default Login;
