import { useMutation } from "@apollo/client";
import { UPDATE_TASK, DELETE_TASK } from "@/graphql/mutations";
import { Button } from "./Button";

type TaskProps = {
  id: String;
  description: String;
  completed: Boolean;
  dueDate: String;
};

export const Task = ({ id, description, completed, dueDate }: TaskProps) => {
  const [update, { data, error, loading }] = useMutation(UPDATE_TASK);

  function toggleCompleted() {
    update({ variables: { input: { id: id, completed: !completed } } });
  }

  const completedStyle = "transition-text line-through text-zinc-400";

  if (error) return <p>There's an issue updating this task...</p>;

  return (
    <div className="flex items-center justify-between space-x-2">
      <div
        className={`border-4 p-1 rounded-full flex items-center border-indigo-500 cursor-pointer`}
        onClick={toggleCompleted}
      >
        <div
          className={`transition rounded-full h-2 w-2 ${
            completed && "bg-indigo-500"
          }`}
        />
      </div>
      <div className="block w-full cursor-pointer" onClick={toggleCompleted}>
        <p className={`${completed && completedStyle} text-sm`}>
          {description}
        </p>
        <p className={`${completed && completedStyle} text-xs`}>{dueDate}</p>
      </div>
      <Button name="delete" type={DELETE_TASK} variables={{ id: id }} />
    </div>
  );
};
