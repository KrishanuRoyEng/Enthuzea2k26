export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  tier: string;
}

/**
 * Add sponsors here.
 * If this array is empty, the Sponsors section will completely hide itself.
 */
export const SPONSORS: Sponsor[] = [
  // Example Sponsor:
  // {
  //   id: "sponsor-1",
  //   name: "Example Corp",
  //   logoUrl: "https://your-vercel-blob-url.com/logo.png",
  //   websiteUrl: "https://example.com",
  //   tier: "Title Sponsor"
  // }
];
