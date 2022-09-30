"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const resourceRe = /^(?<match>(?<prefix>\s*(?<dataOrResource>resource|data)\s+")(?<resourceType>[^"]+))"/;
const resourceLineMatcher = (line) => {
    const matchResult = resourceRe.exec(line.text);
    if (!matchResult) {
        return;
    }
    ;
    const { prefix, dataOrResource, resourceType, match } = matchResult.groups || {};
    const prefixLength = prefix.length;
    const matchLength = match.length;
    return {
        range: new vscode.Range(new vscode.Position(line.lineNumber, prefixLength), new vscode.Position(line.lineNumber, matchLength)),
        dataOrResource: dataOrResource,
        resourceType
    };
};
const resourceTypeToProviderAndName = (resourceType) => {
    const re = /^(?<provider>[^_]+)_(?<name>.*)$/;
    const m = re.exec(resourceType);
    if (!m) {
        return;
    }
    const { provider = "", name = "" } = m.groups || {};
    return { provider, name };
};
const getLineMatchResultUri = ({ dataOrResource, resourceType }) => {
    const { provider, name } = resourceTypeToProviderAndName(resourceType) || {};
    if (!provider || !name) {
        return;
    }
    return vscode.Uri.parse(`https://www.terraform.io/docs/providers/${provider}/${dataOrResource.charAt(0)}/${name}.html`);
};
function isNotUndefined(v) {
    return v !== undefined;
}
const linkProvider = {
    provideDocumentLinks(document) {
        const res = [];
        for (let ln = 0; ln < document.lineCount; ln++) {
            const lineMatchResult = resourceLineMatcher(document.lineAt(ln));
            console.log("LINE", document.lineAt(ln));
            if (lineMatchResult) {
                console.log("LMR", lineMatchResult);
                res.push(lineMatchResult);
            }
        }
        return res.map(lmr => {
            const uri = getLineMatchResultUri(lmr);
            if (!uri) {
                return;
            }
            const ln = new vscode.DocumentLink(lmr.range, uri);
            ln.tooltip = uri.toString();
            return ln;
        }).filter(isNotUndefined);
    }
};
function activate(context) {
    const disposeLinkProvider = vscode.languages.registerDocumentLinkProvider('terraform', linkProvider);
    context.subscriptions.push(disposeLinkProvider);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map