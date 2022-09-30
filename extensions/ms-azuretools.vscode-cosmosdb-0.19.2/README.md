
# Azure Databases for VS Code (Preview)



Browse and query your Azure databases both locally and in the cloud using [_scrapbooks_](#mongo-scrapbooks) with rich Intellisense then connect to Azure to manage your PostgreSQL and Cosmos DB databases with support for MongoDB, Graph (Gremlin), and SQL (previously known as DocumentDB).

![Azure Databases Extension](https://github.com/microsoft/vscode-cosmosdb/raw/main/resources/readme/overview.png)

> Sign up today for your free Azure account and receive 12 months of free popular services, $200 free credit and 25+ always free services 👉 [Start Free](https://azure.microsoft.com/free/open-source).

# Prerequisites

- Some less-common commands in the Mongo [scrapbook](#mongo-scrapbooks) and use of the Mongo shell require installing [Mongo DB and Mongo shell](https://docs.mongodb.com/manual/installation/).

# Features

## Azure Databases Explorer

- Create a database server by clicking the `+` button in the title
- View database servers and open directly in the portal
- View/Create/Delete databases, collections, graphs, stored procedures, documents, and queries
- Click on a document, stored procedure, or query to open in the editor
- Click on a graph to visualize data
- Query graph using [Gremlin](https://docs.microsoft.com/azure/cosmos-db/gremlin-support)
- Edit a document and persist changes to the cloud
- Attach a Mongo server by clicking the plug icon in the title

![Browse PostgreSQL, CosmosDB, and MongoDB databases](https://github.com/microsoft/vscode-cosmosdb/raw/main/resources/readme/explorer.png)

## Mongo Scrapbooks
### Run Mongo Commands with Rich Intellisense

- View your MongoDB database account by by clicking "Sign in to Azure..." in the Azure Resources explorer or using "Attach Database Account" to connect via a connection string
- Optionally configure the settings `mongo.shell.path` and `mongo.shell.args` if your mongo executable is not already on your system's PATH (many of the common commands have built-in support and do not require the Mongo shell to be installed - see [Prerequisites](#prerequisites))
- Click on "New Mongo Scrapbook" in the tree title bar
- Click on "Connect to a database" to indicate which database to run the commands against
- Enter your commands and/or comments, eg: `db.<collectionName>.find()`
- IntelliSense (auto-completions) will be provided
- Click on "Execute" above a command to execute it, or press `CMD+"` (Mac) or `CTRL+"` (Windows and Linux) to execute the line with the cursor
- To run all commands, click on "Execute All", or press `CMD+:` or `Ctrl+:`
- Save and re-use later
![Mongo Scrapbook](https://github.com/microsoft/vscode-cosmosdb/raw/main/resources/readme/Scrapbook.gif)

## Import into Cosmos DB

- You can now import documents from your workspace into CosmosDB. Use the context menu of a collection or a document file (json) to get started!
![Import documents](https://github.com/microsoft/vscode-cosmosdb/raw/main/resources/readme/import_documents.gif)

## Use [Gremlin](https://docs.microsoft.com/azure/cosmos-db/gremlin-support) to query graphs

![Query Graphs](https://github.com/microsoft/vscode-cosmosdb/raw/main/resources/readme/Graph.gif)

- <a name="graphSettings"></a>Configure the user setting `cosmosDB.graph.viewSettings` to customize which properties to display and which colors to use based on vertex label.
```javascript
    "cosmosDB.graph.viewSettings": [
        {
            "vertexSettings": [
                {
                    // Default settings for all vertices
                    "displayProperty": [
                        // Display name property if exists, otherwise firstName if it exists, otherwise ID
                        "name",
                        "firstName"
                    ],
                    // Auto-choose color by label
                    "color": "auto",
                    // Show label after display property
                    "showLabel": true
                },
                {
                    // These setting apply to vertices with the label 'person'
                    "appliesToLabel": "person",
                    "color": "blue"
                }
            ]
        }
    ]
```

## Create an Azure Databases Server

1. Sign in to your Azure Account by clicking "Sign in to Azure..." in the Azure Resources explorer
    >  If you don't already have an Azure Account, click "Create a Free Azure Account"
1. Select the 'plus' button to open the "Create Resource" menu

    ![Create resource](https://github.com/microsoft/vscode-cosmosdb/raw/main/resources/readme/createResource.png)

1. Choose "Create Database Server..."

    ![Create Database Server](https://github.com/microsoft/vscode-cosmosdb/raw/main/resources/readme/createDatabaseServer.png)

## Attach to the Cosmos DB Emulator

* Install and run the [Cosmos DB Emulator](https://docs.microsoft.com/azure/cosmos-db/local-emulator) on your local machine
* Right click 'Attached Database Accounts' and select 'Attach Emulator'

![Attach Emulator](https://github.com/microsoft/vscode-cosmosdb/raw/main/resources/readme/attachEmulator.png)

## Known Issues

- Azure no longer supports gremlin queries on pre-GA graph accounts. If you see the error "Could not find a valid gremlin endpoint for *graph*", then choose "Open Portal" on the graph node and check the "Gremlin Endpoint" in the Overview tab. If it does not take the form of '...[graph-name].***gremlin***.cosmosdb.azure.com...', then you will need to create a new graph account using the Azure portal or the current version of the extension.
- Graphs are not currently supported with the emulator
- Viewing/editing tables is not currently supported
- Support for escapes in the scrapbooks is preliminary. We currently do not support escaped characters as is inside a string - the characters need to be double escaped. For example, newlines in the string should be  '\\\\n' instead of '\\n' to be recognized correctly. If you find any issues with how the scrapbook handles escapes, please add to issue [#937](https://github.com/Microsoft/vscode-cosmosdb/issues/937).



# Telemetry
VS Code collects usage data and sends it to Microsoft to help improve our products and services. Read our [privacy statement](https://go.microsoft.com/fwlink/?LinkID=528096&clcid=0x409) to learn more. If you don’t wish to send usage data to Microsoft, you can set the `telemetry.enableTelemetry` setting to `false`. Learn more in our [FAQ](https://code.visualstudio.com/docs/supporting/faq#_how-to-disable-telemetry-reporting).

# License
[MIT](https://github.com/microsoft/vscode-cosmosdb/blob/main/LICENSE.md)
