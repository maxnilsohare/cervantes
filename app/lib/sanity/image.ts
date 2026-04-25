import imageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "@/app/lib/sanity/client";

const builder = imageUrlBuilder({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
});

export function urlFor(source: unknown) {
  return builder.image(source as never);
}
