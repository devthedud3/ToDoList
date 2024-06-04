import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_LIST } from "@/graphql/queries";
import { CREATE_TASK, DELETE_LIST } from "@/graphql/mutations";
import { Task } from "./Task";
import { Button } from "./Button";
import { AddTask } from "./AddTask";

export const List = () => {
  const { data, error, loading } = useQuery(GET_LIST);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>Error loading tasks, try refreshing the page</p>;

  const { lists } = data;

  return (
    <div className="w-full flex flex-wrap">
      {lists.map((list: any, index: number) => (
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
            <Task key={task.description} {...task} />
          ))}
          <AddTask list_id={`${list.id}`} />
        </div>
      ))}
    </div>
  );
};
