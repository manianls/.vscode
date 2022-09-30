# Azure ML Websocket Server

Azure ML Extension has built an experience to connect to a remote compute instance and one of the elements to enable remote communication is the Azure ML Websocket Server.

Azure ML Websocket Server is installed on the Compute Instance VM once the user starts the remote experience.

The builds of Websocket Server are stored [here](https://github.com/microsoft/vscode-tools-for-ai/tree/master/azureml_remote_websocket_server).

In order to make changes to the Websocket Server logic and make them available follow these instructions:

1. On a Linux machine clone OpenMindVSCodeRemote repository
2. Make the appropiate changes to the code
3. From azureml_websocket_server folder in the repo run "npm run buildLib"
4. Previous command will generate a tgz (i.e. azureml_websocket_server-1.0.0.tgz)
5. Make a PR against [repo](https://github.com/microsoft/vscode-tools-for-ai) which contains the tgz generated under a new version folder (i.e. if latest version was 0.2 increase to 0.3)
6. Once previous PR is merged, you need to create a PR on OpenMindVSCodeRemote to change the websocketServerInstaller.ts file to use the new version
