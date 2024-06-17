import React, { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useQuery } from "@apollo/client";
import { GET_LIST } from "@/graphql/queries";
import { DELETE_LIST } from "@/graphql/mutations";
import { Task } from "./Task";
import { Button } from "./Button";
import { AddTask } from "./AddTask";

export const List = () => {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
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

  const handleChange = (e: any) => {
    setTitle(e.target.value);
  };

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error loading tasks, try refreshing the page</p>;

  return (
    <div className="w-full flex flex-wrap">
      {list.map((listItem: any, index) => (
        <div
          className="w-[412px] px-6 h-fit m-5 ml-0 rounded bg-stone-100 py-10 border space-y-6"
          key={listItem.id}
        >
          <div className="w-full border-b flex items-start justify-between">
            <div
              className="text-xl font-medium pb-2"
              onClick={() => setEditing(!editing)}
            >
              {editing ? (
                <input
                  value={title}
                  placeholder={listItem.title}
                  onChange={handleChange}
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
