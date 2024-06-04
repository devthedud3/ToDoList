import { GET_LIST } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
import React from "react";

type ButtonProps = {
  name: String;
  type: DocumentNode;
  variables?: any;
};
export const Button = ({ name, type, variables }: ButtonProps) => {
  const [resolve, { data, error, loading }] = useMutation(type);

  async function handleClick() {
    await resolve({
      variables: { input: variables },
      refetchQueries: [GET_LIST],
    });
  }

  if (error) return <p>{error.message}</p>;

  return (
    <button
      className={`transition w-fit text-xs border rounded-full p-2 cursor-pointer hover:bg-[--primary] hover:text-white`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};
