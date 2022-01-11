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

## Commands

- `fg` - run in the foreground
- `bg` - run in the background
- `stop` - stop the application
- `cli` - run a Javascript REPL environment
- `deploy` - deploy to a remote server
- `install` - install the application by setting up a systemd service
- `fg-remote` - deploy to a remote server and show the logs in the foreground

## Configuration options

### `develop`

Run in development mode (with hot reload & sending error details to the client).

Defaults to `false`.

### `admin_password`

The HTTP auth password which will be used to access admin tools such as `mongo-express`.

If not set, a random password will be generated per run.

### `host`

For deployment, this is the remote host to which the application will be deployed. If `host` is set but `domain` is not, `host` will also act as the `domain`.

### `domain`

If `domain` is set (or `host` is set), this value will be used to generate an SSL certificate via LetsEncrypt and make the application accessible over the internet.

### `command`

If no command is specified to the `run` script, this command will be run.

See the "Commands" section above.

### `mongo_express_enabled`

Enable the `mongo-express` database browser.

Defaults to `false`.
