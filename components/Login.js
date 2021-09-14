import Image from "next/image";
import { signIn } from "next-auth/client";
function Login() {
  return (
    <div className="grid place-items-center">
      <Image src="/logo.png" height={200} width={200} objectFit="contain" />

      <h1
        onClick={signIn}
        className="mt-12 text-xl p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer"
      >
        Login with Facebook
      </h1>
    </div>
  );
}

export default Login;
