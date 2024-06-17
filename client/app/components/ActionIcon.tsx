import { GET_LIST } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
import React from "react";
import { IconType } from "react-icons/lib";

type ActionProps = {
  icon: any;
  type: DocumentNode;
  variables?: any;
  onClick?: () => void;
};
export const Action = ({ icon, type, variables, onClick }: ActionProps) => {
  const [resolve, { data, error, loading }] = useMutation(type);

  async function handleClick() {
    //@ts-ignore
    onClick();
    await resolve({
      variables: { input: variables },
      refetchQueries: [GET_LIST],
    });
  }

  if (error) return <p>{error.message}</p>;

  return (
    <div
      className={`transition w-fit text-xs border rounded-full p-2 cursor-pointer hover:bg-[--primary] hover:text-white`}
      onClick={handleClick}
      children={icon}
    />
  );
};
