// ios-swift-swiftui/class.swift.js

function template({ dictionary, options }) {
  return `\n//
// ${options.className}.swift
//\n\n// Do not edit directly – this file was auto-generated.\n
import SwiftUI

public struct ${options.className} {
${dictionary.allTokens.map(token => {
    // token.value is now: Color(red:…, green:…, blue:…, opacity:…)
    return `    public static let ${token.name} = ${token.value}`
  }).join("\n")}
}
`;
}

export default template;
