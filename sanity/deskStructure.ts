import type { StructureResolver } from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Cervantes Studio")
    .items([
      S.listItem()
        .title("Properties")
        .schemaType("property")
        .child(
          S.list()
            .title("Properties")
            .items([
              S.listItem()
                .title("All properties")
                .schemaType("property")
                .child(
                  S.documentTypeList("property")
                    .title("All properties")
                    .defaultOrdering([
                      { field: "featured", direction: "desc" },
                      { field: "orderRank", direction: "asc" },
                      { field: "_updatedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("Featured properties")
                .schemaType("property")
                .child(
                  S.documentList()
                    .title("Featured properties")
                    .schemaType("property")
                    .filter('_type == "property" && featured == true')
                    .defaultOrdering([{ field: "orderRank", direction: "asc" }])
                ),
            ])
        ),
      S.listItem()
        .title("Testimonials")
        .schemaType("testimonial")
        .child(S.documentTypeList("testimonial").title("Testimonials")),
      S.listItem()
        .title("Site Settings")
        .schemaType("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Reference data")
        .child(
          S.list()
            .title("Reference data")
            .items([
              S.listItem().title("Locations").schemaType("location").child(S.documentTypeList("location")),
              S.listItem().title("Advisors").schemaType("advisor").child(S.documentTypeList("advisor")),
            ])
        ),
    ]);
