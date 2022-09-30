"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const TerraformApi_1 = require("./TerraformApi");
const REGISTRY_LINK = "https://registry.terraform.io/modules/";
var sourceRegex = /source\s*=\s*\"([a-zA-Z0-9\/\-_\.]+)\"/;
class TerraformHoverProvider {
    provideHover(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const range = document.getWordRangeAtPosition(position, sourceRegex);
            const word = document.getText(range);
            console.log("provideDefinition called");
            if (range) {
                console.log("Determined source from hovered text");
                let moduleSource = word.match(sourceRegex);
                console.log(moduleSource);
                // Get module name from word
                let tfApi = new TerraformApi_1.TerraformApi();
                let data = yield tfApi.makeModuleRequest(moduleSource[1]);
                let registryLink = tfApi.determineRegistryUrlFromSource(moduleSource[1]);
                let header = `## ${data.id}\n`;
                header += `Registry: [${registryLink.url}](${registryLink.url})\n`;
                console.log("Returning data for hover");
                console.log(data);
                return new vscode_1.Hover(new vscode_1.MarkdownString(header + data.root.readme.substring(data.root.readme.indexOf("\n") + 1)), range);
            }
            return null;
        });
    }
}
exports.TerraformHoverProvider = TerraformHoverProvider;
//# sourceMappingURL=TerraformHoverProvider.js.map