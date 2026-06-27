export const onRequestGet = async ({ env }: any) => {
  return Response.json({
    envKeys: Object.keys(env || {}),
    hasSiteContent: !!env?.SITE_CONTENT,
    siteContentType: typeof env?.SITE_CONTENT,
    hasGet: typeof env?.SITE_CONTENT?.get === "function",
    hasPut: typeof env?.SITE_CONTENT?.put === "function",
  });
};
