import Image from "next/image";
import {client} from "./lib/sanity";

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data = await getData();
  console.log (data);
  return (
    <div>
      <h1>Welcome to my website!</h1>
    </div>
  );
}
