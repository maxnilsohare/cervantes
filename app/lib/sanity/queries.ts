export const SANITY_PROPERTY_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  status,
  reference,
  price,
  location,
  propertyType,
  address,
  latitude,
  longitude,
  "heroImageUrl": heroImage.asset->url,
  "heroImageAlt": coalesce(heroImage.alt, title),
  "galleryImageUrls": galleryImages[].asset->url,
  "galleryImageAlts": galleryImages[].alt,
  "floorPlanImageUrl": floorPlanImage.asset->url,
  "floorPlanImageAlt": coalesce(floorPlanImage.alt, "Floor plan"),
  videoUrl,
  bedrooms,
  bathrooms,
  builtSize,
  terraceSize,
  plotSize,
  orientation,
  pool,
  parking,
  shortDescription,
  description,
  keyFeatures,
  lifestyleHighlights,
  nearbyEssentials,
  estimatedIBI,
  communityFees,
  buyingCostNotes,
  seoTitle,
  seoDescription,
  "ogImageUrl": ogImage.asset->url,
  "advisorName": coalesce(advisor->name, advisorDetails.name),
  "advisorPhone": coalesce(advisor->phone, advisorDetails.phone),
  "advisorEmail": coalesce(advisor->email, advisorDetails.email),
  "advisorImageUrl": coalesce(advisor->photo.asset->url, advisorDetails.photo.asset->url),
  "advisorWhatsappNumber": advisor->whatsappNumber,
  "advisorLanguages": advisor->languages,
  "advisorShortBio": advisor->shortBio,
  "similarPropertySlugs": similarProperties[]->slug.current,
  featured,
  orderRank
`;

export const SANITY_PROPERTIES_QUERY = `*[_type == "property"] | order(coalesce(orderRank, 9999) asc, _createdAt desc) {
  ${SANITY_PROPERTY_FIELDS}
}`;

export const SANITY_PROPERTY_BY_SLUG_QUERY = `*[_type == "property" && slug.current == $slug][0] {
  ${SANITY_PROPERTY_FIELDS}
}`;
