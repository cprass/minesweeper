import { Options } from "$fresh/plugins/twind.ts";
import presetTailwind from "@twind/preset-tailwind";
import * as colors from "twind/colors";

export default {
  selfURL: import.meta.url,
  presets: [presetTailwind()],
  theme: {
    colors,
  },
} as Options;
