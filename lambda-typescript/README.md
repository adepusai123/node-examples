**CRUD Operation using Lambda With TypeScript**

**Step1: Setup TypeScript in the Project**
1. Install TypeScript and Type Dependencies:
   ``npm i --save-dev typescript @types/node``

2. Create ``tsconfig.json`` file for TypeScript configuration:
    Run the following command to initialize the ``tsconfig.json`` file:
    `` npx tsc --init ``
    this command will create the ``tsconfig.json`` file.
3. Install MongoDB and dotenv Type Definitions (Ensure Compatibilty)
    ``npm i --save @types/mongodb @types/dotenv``

4. Serverless configuration
    create serverless.yml with required configuration
    ``serverless plugin install -n serverless-dotenv-plugin``
    
5. Build and Deploy project
    `` npx tsc ``

    `` serverless deploy ``

