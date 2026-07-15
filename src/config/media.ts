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
  MODAL_VIDEO_URL: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/trailer.mp4",

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
  PRELOADER_SHATTER_SFX_URL: "https://3hay9hfruoplmksz.public.blob.vercel-storage.com/shatter.mp3"
};
