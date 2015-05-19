# express-project

Basic [Node.js](http://nodejs.org/) project layout with [Express.js](http://expressjs.com/) & [Bootstrap.js](http://getbootstrap.com/).

## Usage

```bash
$ git clone https://github.com/DevelopmentIL/express-project.git project-name
$ cd ./project-name
$ npm install
$ npm start
```

Go to [http://localhost/](http://localhost/) to see your project!


## Project layout

```bash
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   └── css
│       └── style.css
│   ├── images
│   ├── js
│   └── libs
│       └── bootstrap-3.3
│           └── ...
├── routes
│   ├── index.js
└── views
    ├── error.jade
    └── html.jade
    ├── index.jade
    └── layout.jade
```


## Configuration

All the configuration files is under `./config`.
Each environment has different configuration file.


## License

**express-project** is freely distributable under the terms of the [MIT license](LICENSE).

Copyright (c) 2015 Moshe Simantov