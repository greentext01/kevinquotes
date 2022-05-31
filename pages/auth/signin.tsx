import { GetServerSideProps, NextApiRequest } from "next";
import { Provider } from "next-auth/providers";
import { getProviders, getSession, signIn } from "next-auth/react";

type Props = {
  providers: { [key: string]: Provider };
};

const SignIn = ({ providers }: Props) => {
  return (
    <div className="flex justify-center mt-12">
      {Object.values(providers).map((provider) => (
        <button
          key={provider.id}
          onClick={() => signIn(provider.id)}
          className="py-3 px-6 bg-blue-500 text-white shadow-md rounded-md"
        >
          Sign in with {provider.name}
        </button>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const providers = await getProviders();
  const session = await getSession(ctx);

  console.log()

  if (session)
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };

  return {
    props: {
      providers,
    },
  };
};

export default SignIn;
