'use strict';
// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

var fs = require("fs"),
    path = require("path"),
    root = vscode.workspace.rootPath,
    https = require('https'),
    dir = root + "\\igniteui";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // This lines of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "IgniteUIIntelliSense" is now active!');
    checkDirectory(dir, function(){
        fs.appendFile(dir+"\\igniteui.d.ts", "");
        fs.appendFile(dir+"\\jquery.d.ts", "");
        var fileIgniteUITypings = fs.createWriteStream(dir+"\\igniteui.d.ts"),
             fileJQueryTypings = fs.createWriteStream(dir+"\\jquery.d.ts");
            
        var request = https.get("https://raw.githubusercontent.com/IgniteUI/igniteui-angular2/master/src/igniteui.d.ts", function(response) {
            response.pipe(fileIgniteUITypings);
        });
        var request2 = https.get("https://raw.githubusercontent.com/IgniteUI/igniteui-angular2/master/src/jquery.d.ts", function(response) {
            response.pipe(fileJQueryTypings);
        });
    });
    // The command has been defined in the package.json file
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // Display a message box to the user
        vscode.window.showInformationMessage('IgniteUI IntelliSense');
    });

    context.subscriptions.push(disposable);
}
function checkDirectory(directory, callback) {  
  fs.stat(directory, function(err, stats) {
    //Check if error defined and the error code is "not exists"
    if (err && err.errno === -4058) {
      //Create the directory, call the callback.
      fs.mkdir(directory, callback);
    } else {
      //just in case there was a different error:
      callback(err)
    }
  })
}