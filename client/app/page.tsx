"use client";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo";
import { List } from "./components/List";

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <main className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-3xl mb-10">A Savvy Labs Task Manager</h1>
        <List />
      </main>
    </ApolloProvider>
  );
}
