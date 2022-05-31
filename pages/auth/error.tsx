import { useRouter } from "next/router";

const Error = () => {
  const { query } = useRouter();

  const messages = {
    Configuration: "There was a problem with the server configuration.",
    AccessDenied:
      "Your access was denied. Maybe I removed your sign in access.",
    Verification: "The token has expired or has already been used.",
    Default: "",
  };

  if (typeof query.error !== "string")
    return <div>Error: An unknown error has occured.</div>;

  return (
    <div>
      Error:{" "}
      {messages[query.error as keyof typeof messages] ??
        "An unknown error has occured."}
    </div>
  );
};

export default Error;
