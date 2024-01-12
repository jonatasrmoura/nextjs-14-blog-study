import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  apiVersion: "2023-05-03",
  dataset: "production",
  projectId: "3x3p5srf",
  useCdn: false,
});

const builer = imageUrlBuilder(client);

export function urlFor(source: any): string {
  return builer.image(source).url();
}
