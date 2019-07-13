# Node.js & Express App

**Version 1.0.0**

A functional MVC web app.

## Demo

Check out a working demo of this web app on [this custom AWS link](http://bibleacademy-env.ftke2kg3mw.us-east-2.elasticbeanstalk.com/).

## Azure Board

To view a history of project tasks and upcoming features to be added, view the [Azure Board](https://dev.azure.com/ethanromans58/Bible%20Academy) for this project.

## Get started with Node.js App locally

Ensure you have [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/download-center/community "MongoDB Download Center") installed, then:

``` bash
npm install
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
npm restart
```

OR

``` bash
browser-sync start --proxy 'localhost:8081' --files '**/*'
```

To specify the port you would like to use and remove the notifications, use:

``` bash
browser-sync start --proxy localhost:8081 --port 8082 --files '**/*' --no-notify
```

## Technologies

### Packages

#### All local and global packages

``` bash
npm install --save express
npm install --save pug
npm install --save mongoose
npm install --save body-parser
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

#### Activate the Mongo Shell

``` bash
A:\xampp\mongoDB\bin && .\mongo
cls
```

| Command | Use |
|-|-|
| show dbs | Show MongoDB Databases |
| use bibleAcademy | Pick A Databases |
| show collections | Show all collections (or tables) within the selected database |
| db.createCollection('articles'); | Create a collection called "articles" |
| db.articles.insert({title:"Article One",author:"Ethan Miller",body:"This is article one."}); | Insert a document to a collection (add a row to a table) |
| db.articles.find(); | Show all documents in the 'articles' collection |
| db.articles.find().pretty(); | Show all documents in the 'articles' collection as a formatted JSON |

#### MongoDB Indexes

Don't forget to create an [index](https://mongoosejs.com/docs/guide.html#indexes) for your search bar in each collection model you want to search:

``` js
articleSchema.index({
  title: 'text',
  subtitle: 'text',
  abstract: 'text',
  author: 'text',
  scripture: 'text'
});
```

View indexes in the [Atlas Data Explorer](https://www.youtube.com/watch?v=gn5FUqjKltk) by navigating to "Collections" > "Indexes" in the ClusterS tab.

#### OR Connect to MongoDB Atlas

1. Visit the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) page and click "Start Free."
1. Add a cluster named "BibleAcademy"
1. Under "Security" choose "Database Access" to create your first database user. (Click "Add New User.)
1. In the "Network Access" tab, choose "Add an IP Address." Select "Allow Access from anywhere."

(You can also add the current address of your development machine and once you deploy you want to add your server IP address.)

5. In the "Clusters" tab, Choose "Connect" to to your cluster, and select "Connect Your Application" to get a connection string.
1. Copy the string to clipboard or view the Full Driver Example.

``` js
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://melchizedek:kingofsalem@bibleacademy-lbizz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
```

7. Create a [`keys.js`](https://github.com/ethanmiller1/Node.js-and-Express-App/tree/master/config/keys.js) file, a [`keys_prod.js`](https://github.com/ethanmiller1/Node.js-and-Express-App/tree/master/config/keys_prod.js) file, and a `keys_dev.js` file in the config folder.

The keys_dev.js file should contain the following code:

``` js
module.exports = {
  mongoURI: 'mongodb+srv://melchizedek:kingofsalem@bibleacademy-lbizz.mongodb.net/test?retryWrites=true&w=majority', // YOUR_OWN_MONGO_URI
  secretOrKey: 'SECRET' // YOUR_OWN_SECRET
};
```

8. Replace references to [`config/database`](https://github.com/ethanmiller1/Node.js-and-Express-App/blob/master/config/database.js) with [`config/keys.js`](https://github.com/ethanmiller1/Node.js-and-Express-App/tree/master/config/keys.js) in [`app.js`](https://github.com/ethanmiller1/Node.js-and-Express-App/blob/master/app.js).

(Note that config.database will be config.mongoURI.)

##### Deploy to AWS

1. From the [Console Home](https://us-east-2.console.aws.amazon.com/console/home?region=us-east-2) select "Build a web app.
1. Access AWS environment variables using [`process.env.ENV_VARIABLE`](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs.container.html). After deploying the app, navigate to Configuration > Software (Modify) > Environment properties. Copy the keys from [`keys_prod.js`](https://github.com/ethanmiller1/Node.js-and-Express-App/blob/master/config/keys_prod.js) and the values from `keys_dev.js`. Search for any other process.env variables in your project.

|Key|Value|
|-|-|
|MONGO_URI|mongodb+srv://melchizedek:kingofsalem@bibleacademy-lbizz.mongodb.net/test?retryWrites=true&w=majority|
|SECRET_OR_KEY|SECRET|
|NODE_ENV|production|
|PORT|3000|

Here is a quick [link](https://docs.aws.amazon.com/codedeploy/latest/userguide/tutorials-windows-update-and-redeploy-application.html) to Update and Redeploy if you require a minor change in your code.

3. Add event listeners for local development and server delpoyment.

``` js
// Set port.
let port = normalizePort(process.env.PORT || '8081');
app.set('port', port);

// Create http server.
let server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // Handle specific listen errors with friendly messages.
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

## Contributors

---

- Ethan Miller <ethan.romans5.8@gmail.com>

---

## License & copyright

© 2019 Ethan Miller