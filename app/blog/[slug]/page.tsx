import { client, urlFor } from "@/app/lib/sanity";
import { fullBlog } from "@/lib/interface";
import Image from "next/image";

async function getData (slug: string) {
    const query = `
    *[_type == "blog" && slug.current == 'positive-work-culture']{
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

    console.log (data);

    return (
        <div className="mt-8">
            <h1>
                <span className="block text-base text-center text-primary font-bold tracking-wide uppercase">*Blog Category*</span>
                <span className="block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</span>
            </h1>
            <Image 
            src={urlFor(data.titleImage).url()}
            width={800}
            height={800}
            alt="Title Image"
            priority
            className="rounded-lg mt-8 border"
            />
        </div>
    )
}