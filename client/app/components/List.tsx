import React, { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useQuery } from "@apollo/client";
import GET_LIST from "@/graphql/queries/GET_LIST";
import DELETE_LIST from "@/graphql/mutations/DELETE_LIST";

import { Task } from "./Task";
import { Button } from "./Button";
import { AddTask } from "./AddTask";

interface TaskType {
  id: string;
  title: string;
  completed: boolean;
}

interface ListType {
  id: string;
  title: string;
  tasks: TaskType[];
}

export const List = () => {
  const [list, setList] = useState<ListType[]>([]);
  const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
  const [title, setTitle] = useState<{ [key: string]: string }>({});

  const { data, error, loading } = useQuery(GET_LIST);

  useEffect(() => {
    const cached = localStorage.getItem("lists");
    if (cached) {
      setList(JSON.parse(cached));
    }
  }, []);

  useEffect(() => {
    if (data) {
      const { lists } = data;
      localStorage.setItem("lists", JSON.stringify(lists));
      setList(lists);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setTitle((prev) => ({ ...prev, [id]: e.target.value }));
  };

  const handleEdit = (id: string) => {
    setEditing((prev) => ({ ...prev, [id]: !prev[id] }));
    if (title[id] !== undefined) {
      setTitle((prev) => ({ ...prev, [id]: "" }));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading tasks, try refreshing the page</p>;

  return (
    <div className="w-full flex flex-wrap">
      {list.map((listItem) => (
        <div
          className="w-[412px] px-6 h-fit m-5 ml-0 rounded bg-stone-100 py-10 border space-y-6"
          key={listItem.id}
        >
          <div className="w-full border-b flex items-start justify-between">
            <div
              className="text-xl font-medium pb-2"
              onClick={() => handleEdit(listItem.id)}
            >
              {editing[listItem.id] ? (
                <input
                  value={title[listItem.id] ?? listItem.title}
                  placeholder={listItem.title}
                  onChange={(e) => handleChange(e, listItem.id)}
                />
              ) : (
                <h1>{listItem.title}</h1>
              )}
            </div>

            <Button
              icon={<CiCircleRemove />}
              type={DELETE_LIST}
              variables={{ id: listItem.id }}
            />
          </div>
          {listItem.tasks?.map((task: any) => (
            <Task key={task.id} {...task} />
          ))}
          <AddTask list_id={listItem.id} />
        </div>
      ))}
    </div>
  );
};
