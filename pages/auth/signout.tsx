import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";

const SignOut = () => {
  signOut()

  return (
    <div>
      Signing out...
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session)
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };

  return {
    props: {},
  };
};

export default SignOut;
