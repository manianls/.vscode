"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const TerraformCompletionProvider_1 = require("./TerraformCompletionProvider");
const TF_MODE = { language: 'terraform', scheme: 'file' };
function activate(context) {
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(TF_MODE, new TerraformCompletionProvider_1.TerraformCompletionProvider(), '.'));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map