// build.js
import StyleDictionary from "style-dictionary";
import { transforms } from "style-dictionary/enums";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import swiftuiFormatter from "./ios-swift-swiftui/class.swift.js";

const config = JSON.parse(
  readFileSync(new URL("./config.json", import.meta.url), "utf8")
);
const { attributeCti, nameCamel } = transforms;
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log("Build started…\n==============================================");

// 1) Create the hex→RGBA transform for SwiftUI
StyleDictionary.registerTransform({
  name: "color/swiftui-initializer",
  type: "value",
  matcher: token => token.type === "color",
  transform: token => {
    // now your raw hex is in token.value
    const raw = token.value;
    if (typeof raw !== "string") return token.value;

    // strip leading #
    let hex = raw.replace(/^#/, "");

    let a = 1;
    if (hex.length === 8) {
      a = parseInt(hex.slice(6, 8), 16) / 255;
      hex = hex.slice(0, 6);
    }

    const intVal = parseInt(hex, 16);
    const r = ((intVal >> 16) & 0xff) / 255;
    const g = ((intVal >>  8) & 0xff) / 255;
    const b =  (intVal        & 0xff) / 255;
    const f = n => n.toFixed(3);

    return `Color(red: ${f(r)}, green: ${f(g)}, blue: ${f(b)}, opacity: ${f(a)})`;
  }
});

// 2) Define a dedicated SwiftUI transformGroup
StyleDictionary.registerTransformGroup({
  name: "swiftui",
  transforms: [
    attributeCti,    // "attribute/cti"
    nameCamel,       // "name/cti/camel"
    "color/swiftui-initializer"
  ]
});

// 3) Register your SwiftUI template
StyleDictionary.registerFormat({
  name: "ios-swift-swiftui/class.swift",
  format: swiftuiFormatter
});

// 4) Load config.json as an object and build all
const sd = new StyleDictionary(config);
await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();

console.log("\n==============================================");
console.log("Build completed!");
