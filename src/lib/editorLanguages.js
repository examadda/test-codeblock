import { createLowlight } from "lowlight";

import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";

const lowlight = createLowlight();

lowlight.register("javascript", javascript);
lowlight.register("python", python);
lowlight.register("java", java);
lowlight.register("cpp", cpp);
lowlight.register("typescript", typescript);
lowlight.register("json", json);

export const supportedLanguages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "json",
];

export default lowlight;
