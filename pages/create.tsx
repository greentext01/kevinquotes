import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Create = () => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(data?.user);

    if (status !== "loading" && !data?.user.admin) {
      router.push("/");
    }
  }, [data, status, router]);

  return (
    <div className="max-w-xl mx-auto mt-12">
      <h1 className="text-center text-4xl font-bold mb-4">Create quote</h1>
      <form action="/api/quote/create" method="POST">
        <div className="mb-4">
          <label htmlFor="content" className="font-medium">
            Content
          </label>
          <input
            type="text"
            name="content"
            id="content"
            className="w-full p-2 rounded-md bg-neutral-900 focus:ring-0 border-0"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white
              shadow-md rounded-md mx-auto mb-8 w-28 hover:cursor-pointer text-center"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Create;
