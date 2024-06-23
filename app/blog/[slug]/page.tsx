import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData (slug: string) {
    const query = `
    *[_type == "blog" && slug.current == '${slug}']{
        "currentSlug": slug.current,
          title,
          content,
          titleImage,
      }[0]`;

      const data = await client.fetch(query);
      return data;
}

export default async function BlogArticle({params}: {params:{slug:string}}) {
    const data: fullBlog = await getData(params.slug);

    return (
        <div className="mt-8">
            <h1>
                <span className="block text-base text-center text-primary font-bold tracking-wide uppercase">*Blog Category*</span>
                <span className="block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</span>
            </h1>
            <div className="container mx-auto">
                <Image 
                src={urlFor(data.titleImage).url()}
                width={800}
                height={800}
                alt="Title Image"
                priority
                className="rounded-lg object-cover mt-8 border"
                />
            </div>
            <div className="mx-auto mt-16 prose max-w-prose-lg prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
                <PortableText value={data.content} />
            </div>
        </div>
    )
}