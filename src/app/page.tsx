import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ISimpleBlogCard } from "@/lib/interfaces";
import { client, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

async function getData(): Promise<ISimpleBlogCard[]> {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }`;

  const data = await client.fetch<ISimpleBlogCard[]>(query);
  return data.map((post) => {
    return {
      ...post,
      titleImage: urlFor(post.titleImage),
    };
  });
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {data.map((post) => (
          <Card key={post.currentSlug}>
            <Image
              src={post.titleImage}
              alt={post.title}
              width={500}
              height={500}
              className="rounded-t-lg h-[200px]	object-cover"
            />

            <CardContent className="mt-5">
              <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
              <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                {post.smallDescription}
              </p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
