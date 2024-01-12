import { IFullBlog } from "@/lib/interfaces";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

interface IBlogArticle {
  params: {
    slug: string;
  };
}

async function getData(slug: string): Promise<IFullBlog> {
  const query = `
  *[_type == "blog" && slug.current == '${slug}'] {
    "currentSlug": slug.current,
    title,
    content,
    smallDescription,
    titleImage
  }[0]`;

  const result = await client.fetch<IFullBlog>(query);
  return {
    ...result,
    titleImage: urlFor(result.titleImage)
  };
}

export default async function BlogArticle({ params: { slug } }: IBlogArticle) {
  const data = await getData(slug);

  return (
    <section className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Jan Marshal - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={data.titleImage}
        alt={data.title}
        width={800}
        height={800}
        priority
        className="rounded-lg mt-8 border shadow-black/50 shadow-lg"
      />

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText
          value={data.content}
        />
      </div>
    </section>
  );
}
