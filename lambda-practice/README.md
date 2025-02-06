**Dependencies**
1. node
2. aws cli

**Development Configuration**
1. install aws cli 
2. configure your aws cli with the aws configure command
`` aws configure ``
3. install serverless framework
``npm i -g serverless``
4. initialize Node js project
``npm init -y``
5. Install the necessary (Run time) dependencies:
    `` npm i mongodb dotenv ``
6. ``serverless, serverless-plugin-dotenv`` (to load environment variables), and ``nodemon``( for local development)

``npm i --save-dev serverless serverless-dotenv-plugin nodemon``

7. Create the lambda Handler ``index.js``
8. Set up the serverless framework
    8.1 Create serverless.yml for the deployment configuration. The Serverless Framework allows you to define resources (lambda, API Gateway etc.) in YAML file.
9. Deployment Setup
    `` serverless deploy ``
    this command: Packages your lambda function code. Creates an API Gateway endpoint( for HTTP Request).
    Deploy the lambda function and any other necessary aws resources.
10. **Set up CI/CD Pipeline**
    1. setup Github 
    2. Set up Github secrets : **Repo -> Settings -> Secrets**. Add following secrets.
        * ``AWS_ACCESS_KEY_ID``
        * ``AWS_SECRET_ACCESS_KEY``
        * ``MONGO_URI`` (MongoDB URI)
        * ``DB_NAME``
    3. Create GitHub Actions Workflow:
        create ``.github/workflows/deploy.yml`` file in repository to automate the deployment process.
    

