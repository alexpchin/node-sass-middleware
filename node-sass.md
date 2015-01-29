Node & Sass
===========

SASS is a powerful CSS preprocessor. It enhances CSS and ease your effort to write styslesheets by providing nested rules, variable and mixins. In order to use SASS as a middleware for Node.js Express application,

so how do we use this with Node. With our Rails apps, sprockets took care of the heavy lifting and looked after all of our preprocessors and compressors for us. How nice of it...

In Node, we need to build our own middleware in order to do this. The great news is that the working with SCSS and Node is really easy.

## Create app using express

1. `mkdir node-sass && node-sass` (Not a typo. With zsh you don't need `cd`)
2. `npm init` (Hit enter to accept the defaults and see the new [package.json](https://docs.npmjs.com/cli/init) file
3. `npm install express --save` (`--save` will mean it gets added to the project dependencies, this is similar to a gem but you can see it!)
4. `touch app.js` in twitter-stream directory
5. `subl .`

### Edit app.js

```
// Initialize the app
var express = require('express');
var app = express();
// Listen for incoming requests and serve them.
app.listen(process.env.PORT || 3000);
```

And create a route:

```
// Generate a simple home page.
app.get('/', function(req, res) {
  res.send("Hey there!");
});

```

Then run the app with node or nodemon:

```
nodemon app.js
```


## Templates

Express comes with a default templating engine called [jade](http://jade-lang.com). It's similar to [HAML](http://haml.info) so it should be familiar. There is another common templating engine called [EJS](http://www.embeddedjs.com/) (Embedded JavaScript) which is similar to ERB.

Instead of just sending some text when we hit our site let's have it serve an index page.

First thing to do is to install jade.

### Install Jade 
```
npm install jade --save
```
You can install from a project with:

```
npm uninstall jade --save
```

---

You might want to `cmd+shift+p` and Install the Jade Sublime Package at this point

---

Now let's tell our app we want to use jade and where we are going to put the templates. 

We also have to change what happens when a user GETs '/'. Let's get it to render our index template instead of sending 'Hello World'.

### Change app.js to render index

```
# app.js

// Initialize the app
var express = require('express');
var app     = express();
// Listen for incoming requests and serve them.
var port    = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port);
console.log('Server started on ' + port);
```

## Create some views

Create a jade index page:

```
mkdir views
touch views/index.jade
```

And add this code:

```    
html
  head
    title Node-Sass Tutorial!
  body
    h1 Node and Sass
    .container
      p This is a paragraph of text.
```       

## Install Node Sass

```
npm install node-sass-middleware --save
```

Remember the `--save` adds out dependencies to the package.json file.

We now need to require this at the top of our `app.js` file:

```
var express = require('express');
var app = express();
var sassMiddleware = require('node-sass-middleware');
```

Now we need to setup the directories which our sass would be found in and also the output directory that our css processed file will be placed.

```
// Setup SASS directories
var path = require('path');
app.use(sassMiddleware({
    src: __dirname + '/sass', 
    dest: __dirname + '/public/stylesheets', 
    debug: true, 
    outputStyle: 'compressed' 
  }),
  // The static middleware must come after the sass middleware
  express.static(path.join(__dirname, 'public'))
)
```

Then make those folders:

```
mkdir sass
mkdir public
mkdir public/stylesheets
```


## Include the stylesheet

You should be referencing the target `css` file, not its source, so you don't use `/stylesheets/style.css` but instead just `/style.css`

```
link(href="/style.css", rel="stylesheet")
```

## Now make a scss file

```
touch sass/style.scss
```

And add some SCSS:

```
body {
  background: red;
  h1 {
    color: green
  }
  p {
    color: white;
  }
}
```

## Let's take a look

And restart your server:

```
nodemon app.js
```

And navigate to `/`

BOOM.