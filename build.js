// build.js
import StyleDictionary from "style-dictionary";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { transforms, transformTypes } from "style-dictionary/enums";
import { getTransforms, register } from "@tokens-studio/sd-transforms";
import swiftuiFormatter from "./ios-swift-swiftui/class.swift.js";

// Register the custom transforms from Tokens Studio (if needed)
register(StyleDictionary);

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log("Build started...");
console.log("\n==============================================");

// Register the custom format for SwiftUI using the "format" property
StyleDictionary.registerFormat({
  name: "ios-swift-swiftui/class.swift",
  format: swiftuiFormatter,
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms/format must be done _before_ applying the configuration
const configPath = __dirname + "/config.json";
const sd = new StyleDictionary(configPath);

// FINALLY, BUILD ALL THE PLATFORMS
await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();

console.log("\n==============================================");
console.log("Build completed!");