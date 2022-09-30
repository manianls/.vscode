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
const fs = require("fs");
const _ = require("lodash");
const TerraformApi_1 = require("./TerraformApi");
const topLevelTypes = ["output", "provider", "resource", "variable", "data"];
var topLevelRegexes = topLevelTypes.map(o => {
    return {
        type: o,
        regex: new RegExp(o + ' "[A-Za-z0-9\-_]+" "[A-Za-z0-9\-_]*" \{')
    };
});
var topLevelModuleRegex = {
    type: "module",
    regex: new RegExp('module "[A-Za-z0-9\-_]+" \{'),
    regexCapture: new RegExp('module "([a-zA-Z0-9\-_]+)"')
};
var moduleInfoRegex = [
    {
        type: "source",
        regex: /\s*source\s*=\s*"([A-Za-z0-9\/\-_\.]+)"/
    },
    {
        type: "version",
        regex: /\s*version\s*=\s*"([A-Za-z0-9\/\-_.]+)"/
    },
];
class TerraformCompletionProvider {
    provideCompletionItems(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("provideCompletionItems called. Entry point!");
            this.document = document;
            this.position = position;
            this.token = token;
            // Check if we're on the top level
            let lineText = document.lineAt(position.line).text;
            let lineTillCurrentPosition = lineText.substr(0, position.character);
            // Are we trying to type a resource type?
            if (this.isTopLevelType(lineTillCurrentPosition)) {
                return this.getTopLevelType(lineTillCurrentPosition);
            }
            // Are we trying to get the module outputs?
            if (this.isTypingModule(lineTillCurrentPosition)) {
                console.log("isTypingModule == true");
                // These strings should always have 2 parts minimum, "module" & module name.
                // the 3rd part is the output and we should provide autocomplete where possible.
                var varString = this.getVariableString(lineTillCurrentPosition);
                console.log("varString:");
                console.log(varString);
                var parts = varString.split(".");
                console.log(parts);
                if (parts.length == 1) {
                    // We're trying to type the resource type
                    console.log("Parts length == 1, Typing a resource type.");
                    var resourceTypePrefix = parts[1];
                    // Get a list of all the resource types we've defined in this file
                    var definedResourceTypes = this.getDefinedResourceTypes(document);
                    var finalResourceTypes = _.filter(definedResourceTypes, o => (o.indexOf(resourceTypePrefix) == 0));
                    return _.map(finalResourceTypes, o => {
                        return new vscode_1.CompletionItem(o, vscode_1.CompletionItemKind.Field);
                    });
                }
                else if (parts.length == 2) {
                    // We're trying to type the resource name
                    console.log("Parts length == 2, Typing a resource name.");
                    var resourceType = parts[0];
                    // Get a list of all the names for this resource type
                    return this.getModulesInDocuments().then(foundItems => {
                        return _.map(foundItems, o => new vscode_1.CompletionItem(o, vscode_1.CompletionItemKind.Field));
                    });
                    // return _.map(names, o => new CompletionItem(o, CompletionItemKind.Field));
                }
                else if (parts.length == 3) {
                    // We're trying to type the exported field for the resource or module
                    console.log("Parts length == 3, Finding field export from resource.");
                    let resourceType = parts[0];
                    let resourceName = parts[1];
                    if (resourceType === "module") {
                        let moduleResults;
                        let tfFiles = this.getListOfTerraformFilesInDirectory(this.getActiveTextEditorDirectory());
                        for (let file of tfFiles) {
                            console.log(`Checking file ${file}`);
                            moduleResults = yield vscode_1.workspace.openTextDocument(file).then(doc => {
                                return this.getModuleSourceAndVersionFromName(doc, resourceName);
                            }, err => {
                                console.log(err);
                                console.log("Error when opening document!");
                                return {};
                            });
                            console.log(moduleResults);
                            if (moduleResults && moduleResults.source !== "") {
                                break;
                            }
                        }
                        return this.getOutputsForModule(moduleResults.source, moduleResults.version);
                    }
                    // var result = _.map(attrs, o => {
                    //     let c = new CompletionItem(`${o.name} (${resourceType})`, CompletionItemKind.Property);
                    //     c.detail = o.description;
                    //     c.insertText = o.name;
                    //     return c;
                    // });
                    // return result;
                }
                // Which part are we completing for?
                return [];
            }
            // Are we trying to type a parameter to a resource?
            let possibleResources = this.checkTopLevelResource(lineTillCurrentPosition);
            if (possibleResources.length > 0) {
                console.log("Getting hints for resource");
                return this.getHintsForStrings(possibleResources);
            }
            // Check if we're in a resource or module definition
            let source = [];
            let sourceFound = false;
            for (var i = position.line - 1; i >= 0; i--) {
                let line = document.lineAt(i).text;
                let parentType = this.getParentType(line);
                console.log(`parentType: ${parentType}`);
                if (parentType && parentType.type == "resource") {
                    // May have been replaced by Terraform Language server
                    console.log("We're in resource type!");
                    let resourceType = this.getResourceTypeFromLine(line);
                    return [];
                    //return this.getItemsForArgs(resources[resourceType].args, resourceType);           
                }
                else if (parentType && parentType.type == "module") {
                    console.log("We're in a module!");
                    // Are we entering a value for an input?
                    // If we are, mute autocomplete items for now
                    if (this.isTypingValueToInput(lineTillCurrentPosition)) {
                        console.log("In a module but we're typing a value. Bail for now");
                        return [];
                    }
                    let moduleData = this.getModuleSourceAndVersion();
                    if (moduleData.source) {
                        let items = [];
                        console.log("Getting items..");
                        return this.getItemsForModule(moduleData.source, moduleData.version);
                    }
                }
                else if (parentType && parentType.type != "resource") {
                    console.log("We're not in a resource type!");
                    // We don't want to accidentally include some other containers stuff
                    return [];
                }
            }
            return [];
        });
    }
    /**
     * Returns a list of modules that have been discovered in the current working
     * directory.
     * Current working directory in this context means the directory that the text
     * editor is active on.
     */
    getModulesInDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getModulesInDocuments:");
            var found = [];
            if (vscode_1.workspace.workspaceFolders == undefined) {
                return found;
            }
            console.log("Determining current directory..");
            let curDir = this.getActiveTextEditorDirectory();
            console.log(curDir);
            let tfFiles = this.getListOfTerraformFilesInDirectory(curDir);
            for (let file of tfFiles) {
                found.push(yield vscode_1.workspace.openTextDocument(file).then(doc => {
                    let foundModules = [];
                    for (var i = 0; i < doc.lineCount; i++) {
                        var line = doc.lineAt(i).text;
                        var result = line.match(topLevelModuleRegex.regexCapture);
                        if (result && result.length >= 1) {
                            foundModules.push(result[1]);
                        }
                    }
                    return _.uniq(foundModules);
                }, err => {
                    console.log(err);
                    console.log("Error when opening document!");
                    return [];
                }));
            }
            // If all went well, we'll get a nested array with module names. We need to flatten the array.
            let flattenArray = found.reduce((accumulator, value) => accumulator.concat(value), []);
            console.log(flattenArray);
            return _.uniq(flattenArray);
        });
    }
    /**
     * Returns a list of resource type strings in the current document
     */
    getDefinedResourceTypes(document) {
        console.log(`getDefinedResourceTypes:`);
        var r = /resource "([a-zA-Z0-9\-_]+)"/;
        var found = [];
        for (var i = 0; i < document.lineCount; i++) {
            var line = document.lineAt(i).text;
            var result = line.match(r);
            if (result && result.length > 1) {
                found.push(result[1]);
            }
        }
        return _.uniq(found);
    }
    isTopLevelType(line) {
        console.log(`isTopLevelType: ${line}`);
        for (var i = 0; i < topLevelTypes.length; i++) {
            var resourceType = topLevelTypes[i];
            if (resourceType.indexOf(line) == 0) {
                return true;
            }
        }
        return false;
    }
    getTopLevelType(line) {
        console.log(`getTopLevelType: ${line}`);
        for (var i = 0; i < topLevelTypes.length; i++) {
            var resourceType = topLevelTypes[i];
            if (resourceType.indexOf(line) == 0) {
                return [new vscode_1.CompletionItem(resourceType, vscode_1.CompletionItemKind.Enum)];
            }
        }
        return [];
    }
    isTypingModule(line) {
        console.log(`isTypingModule: ${line}`);
        let tf11Regex = /\$\{[0-9a-zA-Z_\.\-]*$/;
        let tf12Regex = /=\s*([0-9a-zA-Z_\.\-])/;
        let varRegex = /module\./;
        return varRegex.test(line);
    }
    getVariableString(line) {
        console.log(`getVariableString: ${line}`);
        let tf11Regex = /\$\{([0-9a-zA-Z_\.\-]*)$/;
        let tf12Regex = /([0-9a-zA-Z_\.\-]*)$/;
        let result = line.match(tf12Regex);
        console.log(result);
        if (result.length > 1) {
            return result[1];
        }
        return "";
    }
    checkTopLevelResource(lineTillCurrentPosition) {
        console.log(`checkTopLevelResource: ${lineTillCurrentPosition}`);
        console.log("Found nothing");
        return [];
    }
    getHintsForStrings(strings) {
        console.log(`getHintsForStrings: ${strings}`);
        return _.map(strings, s => {
            return new vscode_1.CompletionItem(s, vscode_1.CompletionItemKind.Enum);
        });
    }
    /**
     * Only checks if the line we're on has a = or : in it and we're typing to the right of it.
     * In the future, we'll want to make a better check that we're in a map, list,
     * or any other condition that we would want to prevent autocompleting module inputs.
     */
    isTypingValueToInput(line) {
        console.log(`isTypingValueToInput: ${line}`);
        if (line) {
            console.log("got line");
            let result = line.match(/.+(=|:)\s+/);
            console.log(result);
            if (result && result.length > 1) {
                console.log("got some result");
                return true;
            }
        }
        return false;
    }
    /**
     * Finds the module source and version working backwards from the current
     * cursor position. Returns immediately after either finding both the source and version
     * or the module definition
     */
    getModuleSourceAndVersion(position = this.position, document = this.document) {
        // Checking module source
        let moduleData = {
            source: "",
            version: ""
        };
        for (var i = position.line - 1; i >= 0; i--) {
            let line = document.lineAt(i).text;
            // If we reach the line defining the module
            if (topLevelModuleRegex.regex.test(line)) {
                console.log("Reached very top of module. Bailing!");
                break;
            }
            for (let obj of moduleInfoRegex) {
                if (obj.regex.test(line)) {
                    console.log("Successfully found type: ");
                    console.log(obj.type);
                    moduleData[obj.type] = obj.regex.exec(line)[1];
                }
            }
            // Don't parse any further when we have our source and version
            if (moduleData["source"] !== "" && moduleData["version"] !== "") {
                console.log("Got our source and version! Bailing!");
                console.log(moduleData);
                break;
            }
        }
        console.log(moduleData);
        return moduleData;
    }
    /**
     * Finds the module source and version working forward when we find the line with the
     * provided moduleName. Ends when we reach a newline with only '}'.
     */
    getModuleSourceAndVersionFromName(document, moduleName) {
        console.log(`getModuleSourceAndVersionFromName:`);
        let r = RegExp("^module \"" + moduleName + "\"");
        let moduleFound = false;
        let moduleData = {
            source: "",
            version: ""
        };
        console.log(`Scanning document for module ${moduleName}..`);
        for (let i = 0; i < document.lineCount; i++) {
            var line = document.lineAt(i).text;
            var result = line.match(r);
            if (result) {
                console.log("Found module by name!");
                moduleFound = true;
                continue;
            }
            if (moduleFound) {
                for (let obj of moduleInfoRegex) {
                    if (obj.regex.test(line)) {
                        let res = obj.regex.exec(line)[1];
                        console.log(`Successfully found type: ${obj.type} = ${res}`);
                        moduleData[obj.type] = res;
                    }
                }
            }
            // Don't parse any further when we have our source and version
            if (moduleData["source"] !== "" && moduleData["version"] !== "") {
                console.log("Got our source and version!");
                console.log(moduleData);
                break;
            }
        }
        return moduleData;
    }
    getParentType(line) {
        console.log(`getParentType: ${line}`);
        //console.log(topLevelRegexes)
        for (var i = 0; i < topLevelRegexes.length; i++) {
            let tl = topLevelRegexes[i];
            if (tl.regex.test(line)) {
                console.log("Successfully found type: ");
                console.log(tl);
                return tl;
            }
        }
        // Checking for modules
        if (topLevelModuleRegex.regex.test(line)) {
            console.log("Successfully found type: ");
            console.log(topLevelModuleRegex.type);
            return topLevelModuleRegex;
        }
        return false;
    }
    getResourceTypeFromLine(line) {
        console.log(`gotResourceTypeFromLine: ${line}`);
        var lineParts = line.split(" ");
        var type = lineParts[1];
        return type.replace(/"/g, '');
    }
    getItemsForArgs(args, type) {
        console.log(`getItemsForArgs:`);
        console.log(args);
        console.log(type);
        return _.map(args, o => {
            let c = new vscode_1.CompletionItem(`${o.name} (${type})`, vscode_1.CompletionItemKind.Property);
            c.detail = o.description;
            c.insertText = o.name;
            return c;
        });
    }
    getItemsForModule(module, version = "", includeRequiredSnippet = true) {
        console.log("getItemsForModule called");
        let tfApi = new TerraformApi_1.TerraformApi();
        return tfApi.makeModuleRequest(module, version).then(resp => {
            if (resp) {
                var args = resp["root"]["inputs"];
            }
            else {
                return false;
            }
            let items = args.map(o => {
                let c = new vscode_1.CompletionItem(o.name, vscode_1.CompletionItemKind.Variable);
                if (o.required) {
                    c.detail = "Required\n" + o.description;
                }
                else {
                    c.detail = `Optional (Default: ${o.default})\n` + o.description;
                }
                c.insertText = o.name;
                return c;
            });
            if (includeRequiredSnippet) {
                console.log("Including required input snippet");
                let requiredInputString = "";
                var tabstop = 1;
                for (let input of args) {
                    if (input.required) {
                        console.log("Found required input: " + input.name);
                        console.log(input);
                        requiredInputString += input.name + ' = "${' + tabstop.toString() + '}"\n';
                        tabstop += 1;
                    }
                }
                const snippetCompletion = new vscode_1.CompletionItem('Autofill required inputs');
                snippetCompletion.insertText = new vscode_1.SnippetString(requiredInputString);
                snippetCompletion.documentation = new vscode_1.MarkdownString("Automatically fills in required inputs for the module.");
                items.push(snippetCompletion);
            }
            return items;
        });
    }
    getOutputsForModule(module, version = "") {
        console.log("getOutputsForModule called");
        let tfApi = new TerraformApi_1.TerraformApi();
        return tfApi.makeModuleRequest(module, version).then(resp => {
            if (resp) {
                var args = resp["root"]["outputs"];
            }
            else {
                return false;
            }
            return _.map(args, o => {
                let c = new vscode_1.CompletionItem(`${o.name} (${module})`, vscode_1.CompletionItemKind.Interface);
                c.detail = o.description;
                c.insertText = o.name;
                return c;
            });
        });
    }
    /**
     * Returns the path to the current working directory with the active text editor.
     */
    getActiveTextEditorDirectory() {
        let currentFile = vscode_1.window.activeTextEditor.document.uri.fsPath;
        let dir = currentFile.substring(0, currentFile.lastIndexOf("/"));
        return dir + "/";
    }
    /**
     * Provided a directory, returns a list of files with absolute paths that end in .tf.
     */
    getListOfTerraformFilesInDirectory(dir) {
        let files = [];
        for (let file of fs.readdirSync(dir)) {
            let res = file.match(/^.+\.tf$/);
            if (res && res.length >= 1) {
                files.push(dir + file);
            }
        }
        return files;
    }
}
exports.TerraformCompletionProvider = TerraformCompletionProvider;
//# sourceMappingURL=TerraformCompletionProvider.js.map