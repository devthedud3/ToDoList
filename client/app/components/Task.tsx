import { useState } from "react";
import { useMutation } from "@apollo/client";
import { HiPencil, HiOutlineTrash, HiCheck } from "react-icons/hi2";
import UPDATE_TASK from "@/graphql/mutations/UPDATE_TASK";
import DELETE_TASK from "@/graphql/mutations/DELETE_TASK";

import { Button } from "./Button";

type TaskProps = {
  id: string;
  description: string;
  completed: boolean;
  dueDate: string;
};

export const Task = ({ id, description, completed, dueDate }: TaskProps) => {
  const [editing, setEditing] = useState(false);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [update, { error }] = useMutation(UPDATE_TASK);

  const toggleCompleted = () => {
    update({ variables: { input: { id, completed: !completed } } });
  };

  const completedStyle = "transition-text line-through text-zinc-400";

  if (error) return <p>There's an issue updating this task...</p>;

  return (
    <div className="flex items-center justify-between space-x-2">
      <div
        className="border-2 p-[1px] rounded-full flex items-center border-[--primary] cursor-pointer"
        onClick={toggleCompleted}
      >
        <div
          className={`transition rounded-full h-2 w-2 ${
            completed && "bg-[--primary]"
          }`}
        />
      </div>

      {editing ? (
        <input
          className="text-sm p-2 w-full"
          type="text"
          value={updatedDescription}
          placeholder={description}
          onChange={(e) => setUpdatedDescription(e.currentTarget.value)}
        />
      ) : (
        <div className="block w-full cursor-pointer" onClick={toggleCompleted}>
          <p className={`${completed && completedStyle} text-sm`}>
            {description}
          </p>
          <p className={`${completed && completedStyle} text-xs`}></p>
        </div>
      )}

      {!editing ? (
        <div
          className="transition w-fit text-xs border rounded-full p-2 cursor-pointer hover:bg-[--primary] hover:text-white"
          onClick={() => setEditing(true)}
        >
          <HiPencil />
        </div>
      ) : (
        <Button
          onClick={() => setEditing(false)}
          icon={<HiCheck />}
          type={UPDATE_TASK}
          variables={{ id, description: updatedDescription }}
        />
      )}

      <Button icon={<HiOutlineTrash />} type={DELETE_TASK} variables={{ id }} />
    </div>
  );
};
