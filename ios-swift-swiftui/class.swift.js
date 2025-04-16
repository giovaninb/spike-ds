// ios-swift-swiftui/class.swift.js

function template({ dictionary, options }) {
    return `
    //
    // Do not edit directly – this file was generated automatically.
    //
    import SwiftUI
  
    public struct ${options.className} {
    ${dictionary.allTokens.map(token => {
      const value = token.value || (token.original && token.original["$value"]) || "undefined";
      return `    public static let ${token.name} = Color("${value}")`;
    }).join('\n')}
    }
    `;
  }
  
  export default template;
  