# Node.js & Express App

**Version 1.0.0**

A functional MVC web app.

## Get started with Node.js App locally

Ensure you have [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/download-center/community "MongoDB Download Center") installed, then:

``` bash
npm install --save express pug mongoose body-parser express-messages express-session connect-flash express-validator passport passport-local bcryptjs
node app.js
```

### Entry Point

`app.js` is our entry point, so we can start the server using `node app.js` or simply `node app`.

### Automatic server restart with nodemon

Use this to restart your server upon saving file changes.

Install [nodemon](https://www.npmjs.com/package/nodemon) globally:

``` bash
npm install -g nodemon
```

Start the server using:

``` bash
nodemon app.js
```

### Start a development proxy

Use this to restart your browser upon server restart. (This will create a proxy server on another port, usually 3001)

Install [browser-sync](https://www.browsersync.io/) globally:

``` bash
npm install -g browser-sync
```

Start Browsersync:

``` bash
browser-sync start --proxy 'localhost:3000' --files '**/*'
```

## Technologies

### Packages

#### All local and global packages

``` bash
npm install --save express
npm install --save pug
npm install --save mongoose
npm install --save body-parser
npm install bootstrap
npm install jquery
npm install --save express-messages express-session connect-flash express-validator
npm install --save passport passport-local bcryptjs
npm install pm2 -g
```

#### [Express.js](https://expressjs.com/en/guide/routing.html "Backend web framework for node")

Used for handling client requests and responses. (GET, POST, etc.)

``` bash
npm install --save express
```

#### [Pug](https://pugjs.org/api/getting-started.html "Templating engine") (formerly Jade)

Used as a templating engine alternative to HTML. It uses indentations instead of tags.

``` bash
npm install --save pug
```

#### [mongoose](https://mongoosejs.com/)

Used for connecting MongoDB to our server and providing structure to our data on an application level.

``` bash
npm install --save mongoose
```

#### [body-parser](https://github.com/expressjs/body-parser)

Used for accessing HTML input fields in js.

``` bash
npm install --save body-parser
```

`name='title'` in html corresponds to `req.body.title` in your js using bodyparser.

req = the incoming request from the client
body = body-parser
title = the specific element you want body-parser to identify

#### [Bootstrap](https://getbootstrap.com/)

Used to quickly style HTML pages with CSS-based design templates.

``` bash
npm install bootstrap
```

#### [jQuery](https://jquery.com/)

Used to simplify JavaScript operations.

``` bash
npm install jquery
```

#### Messaging Modules

Used to display messages on web pages.

``` bash
npm install --save express-messages express-session connect-flash express-validator
```

#### [Passport](http://www.passportjs.org/ "Passport.js")

Used for user registration.

``` bash
npm install --save passport passport-local bcryptjs
```

#### [PM2](https://github.com/Unitech/pm2 "pm2: Node.js Production Process Manager with a built-in Load Balancer")

Used to start server as a service and keep applications alive forever.

``` bash
npm install pm2 -g
```

Use `pm2 start app.js` to start the background service and `pm2 stop app.js` to stop the application.

### [libcap2-bin setcap](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=633075)

Used to set custom port.

### [ngrok](https://ngrok.com/ "Public URLs from Localhost")

Used to create public URLs from your localhost.

1. Create a [free account](https://dashboard.ngrok.com/signup?_anchor=None&_external=False&_method=None) to get your authentication token.
2. [Download](https://ngrok.com/download) ngrok and extract the exe and yml from zip file.
3. Open cmd and navigate to the folder containing your `ngrok.exe`.
4. Add your authtoken to `ngrok.yml` by running `ngrok authtoken <YOUR_AUTH_TOKEN>`. (You only need to do this once.)
5. Start a HTTP tunnel on port 3000 with `ngrok http 3000`.

(Note: ngrok tunnel will terminate upon cmd close.)

#### Set up ngrok tunnel as a background service

Click [here](https://nssm.cc/release/nssm-2.24.zip "nssm 2.24 (2014-08-31)") to download [nssm](https://nssm.cc/download) executable, place in parent `nssm` folder (from `win64` or `win32` folder), and install ngrok with `.\nssm.exe install ngrok`.

Enter the path to your ngrok executable (either `path\to\ngrok\config.yml` or `%USERPROFILE%\.ngrok2\ngrok.yml`) for nssm to add it as a service. (Follow instructions from the [usage](https://nssm.cc/usage) page.)

To remove a service, use `.\nssm remove ngrok`.

#### Set a custom port for ngrok to start an HTTP tunnel on

Set http request and port in the `ngrok.yml` file in `%USERPROFILE%\.ngrok2\ngrok.yml`.

``` yml
authtoken: <YOUR_AUTH_TOKEN>
tunnels:
    default:
        proto: http
        addr: 3000
```

Check status of ngrok at [localhost:4040/status](http://localhost:4040/status).

### MongoDB

Download and install [MongoDB](https://www.mongodb.com/download-center/community "MongoDB Download Center") from MSI file

#### Start MongoDB as a service.
1. Navigate to `..\mongoDB\bin` in cmd as administrator.
2. `mongod --directoryperdb --dbpath ..\mongoDB\data\db --logpath ..\mongoDB\log\mongo.log --logappend --install`
3. `net start MongoDB`

(Only do this if you don't want to manually start and stop MongoDB all the time.)

## Contributors

---

- Ethan Miller <ethan.romans5.8@gmail.com>

---

## License & copyright

© 2019 Ethan Miller