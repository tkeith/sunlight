# Full-stack Javascript app template

`fsjs` contains the essentials for a full-stack Javascript app:

- Next.js for pages
- Express.js for the API
- MongoDB for data storage
- `mongo-express` to view the database as an administrator
- Nginx to serve everything over SSL using a LetsEncrypt certificate

## Local development

Create a `local.json` file containing:

```
{
  "develop": true,
  "mongo_express_enabled": true,
  "admin_password": "test123",
  "command": "fg"
}
```

Ensure that recent versions of `docker` and `docker-compose` are installed.

Run the app: `./run local.json`

## Deploy to a server

The server should be running Linux. `docker` and `docker-compose` will be automatically installed if not already present. You should have SSH access to the server.

Create a `production.json` file containing:

```
{
  "host": "some-host.com",
  "admin_password": "test123",
  "command": "deploy"
}
```
  
Deploy: `./run production.json`
