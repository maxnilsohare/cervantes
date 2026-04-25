import { ImageWithFallback } from "@/app/components/ImageWithFallback";

type PropertyGalleryProps = {
  title: string;
  images: string[];
};

export function PropertyGallery({ title, images }: PropertyGalleryProps) {
  const [mainImage, ...rest] = images;
  const sideImages = rest.slice(0, 4);

  return (
    <section id="gallery" className="mt-10 lg:mt-12">
      <div className="grid gap-4 lg:hidden">
        <div className="relative h-[340px] overflow-hidden border border-[var(--color-gold)]/25 sm:h-[420px]">
          <ImageWithFallback
            src={mainImage}
            alt={`${title} main view`}
            className="object-cover"
            sizes="100vw"
            preload
          />
        </div>
      </div>

      <div className="hidden gap-4 lg:grid lg:grid-cols-12">
        <div className="relative col-span-8 h-[620px] overflow-hidden border border-[var(--color-gold)]/25 xl:h-[660px]">
          <ImageWithFallback
            src={mainImage}
            alt={`${title} hero view`}
            className="object-cover transition duration-700 hover:scale-[1.02]"
            sizes="(max-width: 1280px) 66vw, 900px"
            preload
          />
        </div>

        <div className="col-span-4 grid grid-cols-2 gap-4">
          {sideImages.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative h-[302px] overflow-hidden border border-[var(--color-gold)]/20 xl:h-[322px]"
            >
              <ImageWithFallback
                src={image}
                alt={`${title} gallery image ${index + 2}`}
                className="object-cover transition duration-700 hover:scale-[1.03]"
                sizes="(max-width: 1280px) 33vw, 300px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
