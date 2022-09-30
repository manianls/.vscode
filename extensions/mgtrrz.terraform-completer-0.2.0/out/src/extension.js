"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const TerraformCompletionProvider_1 = require("./TerraformCompletionProvider");
const TerraformDefinitionProvider_1 = require("./TerraformDefinitionProvider");
const TerraformHoverProvider_1 = require("./TerraformHoverProvider");
const TF_MODE = { language: 'terraform', scheme: 'file' };
function activate(context) {
    console.log(context.globalStoragePath);
    console.log(vscode.extensions.getExtension('mgtrrz.terraform-completer').packageJSON.version);
    exports.tfAutoCompleterContext = context;
    if (!fs.existsSync(context.globalStoragePath)) {
        console.log("Creating extension directory");
        fs.mkdirSync(context.globalStoragePath);
    }
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(TF_MODE, new TerraformCompletionProvider_1.TerraformCompletionProvider(), '.'));
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(TF_MODE, new TerraformDefinitionProvider_1.TerraformDefinitionProvider()));
    context.subscriptions.push(vscode.languages.registerHoverProvider(TF_MODE, new TerraformHoverProvider_1.TerraformHoverProvider()));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map