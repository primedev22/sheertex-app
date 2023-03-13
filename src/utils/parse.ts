export const getLastPageFromLinkHeader = (
  linkHeader: string | null
): number | undefined => {
  if (!linkHeader) return;

  const lastUrl = linkHeader?.match(/(?<=<)([\S]*)(?=>; rel="last")/i)?.[0];

  if (!lastUrl) return;

  const page = lastUrl?.match(/(?<=page=)(\d*)/i)?.[0];
  return page ? Number(page) : undefined;
};
