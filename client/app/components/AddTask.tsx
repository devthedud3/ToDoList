import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import CREATE_TASK from "@/graphql/mutations/CREATE_TASK";

import GET_LIST from "@/graphql/queries/GET_LIST";

type AddTask = {
  list_id: String;
};

export const AddTask = ({ list_id }: AddTask) => {
  const [value, setValue] = useState<string>("");
  const [resolve, { data, error, loading }] = useMutation(CREATE_TASK);

  async function handleSubmit() {
    if (value === "") return;
    await resolve({
      variables: {
        input: {
          listId: `${list_id}`,
          description: value,
          dueDate: "2024-06-13",
        },
      },
      refetchQueries: [GET_LIST],
    });
    setValue("");
  }
  return (
    <div className="w-full space-y-2">
      <input
        className="w-full outline-none border p-3 text-xs mt-4"
        placeholder="Add new task"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />

      <button
        className="transition w-full text-xs border bg-[--primary] p-2 cursor-pointer text-white"
        onClick={handleSubmit}
      >
        {" "}
        Add Task
      </button>
    </div>
  );
};
