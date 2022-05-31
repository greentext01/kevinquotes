import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AddAdmin = () => {
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
      <h1 className="text-center text-4xl font-bold mb-4">Add admin</h1>
      <form action="/api/admin/add" method="POST">
        <div className="mb-4">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 rounded-md bg-neutral-900 focus:ring-0 border-0"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white
              shadow-md rounded-md mx-auto mb-8 w-28 hover:cursor-pointer text-center"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {},
  };
};
