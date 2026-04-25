import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Client location",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured testimonial",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "clientName",
      subtitle: "location",
      quote: "quote",
    },
    prepare(selection) {
      const { title, subtitle, quote } = selection;
      return {
        title,
        subtitle: subtitle || quote,
      };
    },
  },
});
