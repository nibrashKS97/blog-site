import Image from "next/image";
import {client, urlFor} from "./lib/sanity";
import { simpleBlogCard } from "@/app/lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
      briefDescription,
      "currentSlug": slug.current,
      titleImage
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((post, idx) =>(
          <Card key={idx}>
            <Image 
            src={urlFor(post.titleImage).url()}
            alt="image"
            width={700}
            height={700}
            className="rounded-t-lg h-[200px] object-cover"
            />

            <CardContent className="mt-5">
              <h3 className="text-xl line-clamp-2 font-bold">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-400">{post.briefDescription}</p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.currentSlug}`} className={buttonVariants({ variant: "outline" })}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>  
  );
}
