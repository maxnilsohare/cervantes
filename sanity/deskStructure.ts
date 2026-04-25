import type { StructureResolver } from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem().title("Properties").schemaType("property").child(S.documentTypeList("property")),
      S.listItem().title("Locations").schemaType("location").child(S.documentTypeList("location")),
      S.listItem().title("Advisors").schemaType("advisor").child(S.documentTypeList("advisor")),
      S.listItem()
        .title("Site Settings")
        .schemaType("siteSettings")
        .child(S.documentTypeList("siteSettings")),
      S.listItem()
        .title("Testimonials")
        .schemaType("testimonial")
        .child(S.documentTypeList("testimonial")),
    ]);
