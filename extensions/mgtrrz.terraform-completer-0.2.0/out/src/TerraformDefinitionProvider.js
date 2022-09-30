"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TerraformDefinitionProvider {
    provideDefinition(document, position, token) {
        console.log("provideDefinition called");
        var word = document.getWordRangeAtPosition(position);
        var words = document.getText(word);
        return null;
    }
}
exports.TerraformDefinitionProvider = TerraformDefinitionProvider;
//# sourceMappingURL=TerraformDefinitionProvider.js.map