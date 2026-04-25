import { defineField, defineType } from "sanity";

export const advisorType = defineType({
  name: "advisor",
  title: "Advisor",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "title", title: "Role/Title", type: "string" }),
  ],
});
