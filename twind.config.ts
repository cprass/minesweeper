import { Options } from "$fresh/plugins/twind.ts";
import presetTailwind from "@twind/preset-tailwind";

export default {
  selfURL: import.meta.url,
  presets: [presetTailwind()],
} as Options;
