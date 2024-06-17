import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_LIST } from "@/graphql/queries";
import { DELETE_LIST } from "@/graphql/mutations";
import { Task } from "./Task";
import { Button } from "./Button";
import { AddTask } from "./AddTask";

export const List = () => {
  const [list, setList] = useState([]);
  const { data, error, loading } = useQuery(GET_LIST);

  useEffect(() => {
    const cached = localStorage.getItem("lists");
    if (cached) {
      setList(JSON.parse(cached));
    }
  }, []);

  useEffect(() => {
    if (data && list.length !== 0) {
      console.log("here");
      const { lists } = data;
      localStorage.setItem("lists", JSON.stringify(lists));
      setList(lists);
    }
  }, [data, error, loading]);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error loading tasks, try refreshing the page</p>;

  return (
    <div className="w-full flex flex-wrap justify-center">
      {list.map((list: any, index: number) => (
        <div
          className="w-[512px] px-6 h-fit m-5 rounded bg-stone-100 py-10 border space-y-6"
          key={`${list}-${index}`}
        >
          <div className="w-full border-b flex items-start justify-between">
            <h1 className="text-xl font-medium pb-2">{list.title}</h1>
            <Button
              name="x"
              type={DELETE_LIST}
              variables={{ id: `${list.id}` }}
            />
          </div>
          {list.tasks?.map((task: any) => (
            <Task key={`${task.id}${task.description}`} {...task} />
          ))}
          <AddTask list_id={`${list.id}`} />
        </div>
      ))}
    </div>
  );
};
