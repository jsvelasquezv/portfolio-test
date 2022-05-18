## Backend

The backend is built with serverless framework, MongoDB and Mongoose running on AWS lambda with NodeJS 14.x. Unit tests made with jest.

### Deployment

To deploy the project you will need the last version of serverless framework.
To set the env variables you need to create a `env.json` file at the `backend` folder, you can check an example in `env_example.json`. If you want to run the deployment with a specific aws profile, you can change it, otherwise please set it as `"profile": "default"`.
With this the project is ready to be deployed, just run the next command.

```bash
$ serverless deploy
```

After deploying, you should see output similar to:

```
endpoints:
  GET - https://6q42m4ggv5.execute-api.us-east-1.amazonaws.com/portfolio/{id}
  PATCH - https://6q42m4ggv5.execute-api.us-east-1.amazonaws.com/portfolio/{id}

functions:
  getPortfolio: portfolio-dev-getPortfolio
  updatePortfolio: portfolio-dev-updatePortfolio
```

## FrontEnd

The frontend is built with React, since is a really simple aplication it does't use any state management library.
To start the development server just run the next command, it will run in the port 3000.

```bash
$ npm start
```

To generate the production build run the next command

```bash
$ npm run build
```

### Deployment
