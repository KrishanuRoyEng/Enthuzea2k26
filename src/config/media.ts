/**
 * Centralized Media Configuration
 * 
 * Replace these URLs with your Vercel Blob URLs (or any HTTP URL).
 * Example: "https://<your-id>.public.blob.vercel-storage.com/video.mp4"
 */

export const MEDIA_CONFIG = {
  // Global background audio played on the site
  BACKGROUND_AUDIO_URL: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/intro.mp3",

  // The video that plays when you click "Explore Enthuzea"
  // ⚠️ Re-encoded to 30fps for mobile compatibility — upload trailer_30fps.mp4 to Blob and update this URL
  MODAL_VIDEO_URL: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/trailer6.mp4",

  // The showcase video that plays automatically on the home page stage
  SHOWCASE_VIDEO_URL: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/main.mp4",

  /**
   * ─── Preloader Sound Effects (Optional) ─────────────────────────────────
   *
   * Both slots are independent. Leave either as null to use the built-in
   * Web Audio synthesis for that phase instead. You can mix and match:
   *   e.g. real file for impact + synthesis for shatter, or vice-versa.
   *
   * Supported formats: .mp3, .ogg, .wav  (keep files < 200 KB each)
   * Free sources: https://pixabay.com/sound-effects/  |  https://freesound.org
   */

  /**
   * IMPACT SFX — fires at t=0 (the moment you click "Unleash The Energy").
   * Plays together with the expanding shockwave rings.
   * Synthesis fallback: deep sub-bass boom (80→25 Hz pitch-dive).
   * Recommended search: "bass impact hit" / "taiko hit" / "cinematic boom"
   */
  PRELOADER_IMPACT_SFX_URL: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/impact.mp3",

  /**
   * SHATTER SFX — fires at t=1150 ms when the screen shards fly apart.
   * Synthesis fallback: dense high-freq noise + staggered debris micro-bursts.
   * Recommended search: "glass shatter" / "window break" / "glass smash"
   * Note: the crack-formation sound at t=700 ms is always synthesised
   * (it's a subtle resonant ting — no file slot needed for that phase).
   */
  PRELOADER_SHATTER_SFX_URL: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/shatter.mp3",

  /**
   * ─── Gallery Images ───────────────────────────────────────────────────────
   *
   * Add your Vercel Blob image URLs here. These will be used in the Gallery page.
   * Recommended formats: .jpg, .webp (optimized for web, ideally under 1MB each).
   */
  GALLERY_IMAGES: [
    // Add URLs here, for example:
    // "https://<your-id>.public.blob.vercel-storage.com/gallery1.jpg",
    // "https://<your-id>.public.blob.vercel-storage.com/gallery2.jpg",
    "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Gallery/486209084_18347548717151567_3424051105179257200_n.jpg",
    "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Gallery/486718450_18347548729151567_8051190521898562648_n.jpg",
    "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Gallery/486761423_18347548747151567_6715262780689099294_n.jpg",
    "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Gallery/487948122_18062845505289716_6582364510248164048_n.webp",
    "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Gallery/488539991_18062845583289716_7472573918042312963_n.webp",
    "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Gallery/488682996_18062845538289716_4342708287959605926_n.webp",
    "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Gallery/489008276_18062845526289716_5421714685021858327_n.webp",
    "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Gallery/495793630_735025695517020_2573972600013434429_n.jpg",
    "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Gallery/496802007_735026128850310_7699650195732393117_n.jpg",
    "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Gallery/AQPkCckD8aWdRpptxvn4PRReeuG7aMUb-gk9GlFFFzF8fwP4emQ92cVAg3pK-46NMEHoKOBvq8ZSz5YI6YUQtks.mp4",
    "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Gallery/WhatsApp%20Video%202026-07-16%20at%201.34.51%20PM.mp4",
    "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/Cultural/Gallery/VID-20260716-WA0015.mp4"
  ] as string[],
};
