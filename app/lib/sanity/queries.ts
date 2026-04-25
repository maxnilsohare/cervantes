export const SANITY_PROPERTY_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  status,
  reference,
  price,
  location,
  area,
  propertyType,
  bedrooms,
  bathrooms,
  builtSize,
  terraceSize,
  plotSize,
  "heroImageUrl": heroImage.asset->url,
  "galleryImageUrls": galleryImages[].asset->url,
  shortDescription,
  fullDescription,
  cervantesView,
  whatsSpecial,
  features,
  lifestyleHighlights,
  latitude,
  longitude,
  nearbyLifestyle,
  communityFees,
  ibiEstimate,
  garbageTax,
  purchaseCostsPct,
  enableMap,
  defaultDestination,
  advisorName,
  advisorPhone,
  advisorEmail,
  "advisorImageUrl": advisorImage.asset->url,
  metaTitle,
  metaDescription,
  featured,
  showOnHomepage,
  orderRank
`;

export const SANITY_PROPERTIES_QUERY = `*[_type == "property"] | order(coalesce(orderRank, 9999) asc, _createdAt desc) {
  ${SANITY_PROPERTY_FIELDS}
}`;

export const SANITY_PROPERTY_BY_SLUG_QUERY = `*[_type == "property" && slug.current == $slug][0] {
  ${SANITY_PROPERTY_FIELDS}
}`;
