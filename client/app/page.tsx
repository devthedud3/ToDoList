"use client";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo";
import { List } from "./components/List";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <main className="flex min-h-screen flex-col p-16">
        <h3 className="text-3xl font-black">A Simple To-do List</h3>
        <List />
      </main>
    </ApolloProvider>
  );
}
