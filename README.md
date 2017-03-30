# Melting Pot

Dependencies:

1. NodeJS (version 6 and above would be good)
2. Yarn (optional, you can just use NPM) A [see here](https://yarnpkg.com/lang/en/docs/install/)
3. Grunt - install with `npm install -g grunt-cli` or `yarn global add grunt-cli`

To setup:

1. Duplicate `env.json.sample` and name it `env.json`
2. In your new `env.json` add the github client id and client secret
3. Run `yarn install` or `npm install` to install all libraries
4. Run `grunt` on one terminal (this is responsible to compile coffeescript and scss files into the respective js and css files)
5. Open another terminal and run `node app.js` to start the web server
6. Open browser to `http://localhost:3005`
7. On first time load, it should prompt you to sign in to your github account and give access for this oAuth app
8. After giving access, it should redirect you back to `http://localhost:3005` and shows all your available repo

Project Overview:

1. The AngularJS project is contained within the `coffee` directory. Angular version used 1.5.8 (or above). The grunt runner will compile these coffeescript files and output .js files in `public/js` folder
2. For page stylings, it will be in the `scss` folder. The grunt runner will compile .scss files in this folder and output to `public/css` folder
3. The template is in the `views` directory. This .pug file will be rendered by the node server
4. For development purpose, we manually add files to load into `views/index.pug`
5. Upon changes to the files in `scss` and `coffee` folder, grunt will automatically recompile and produce its js and css files

Goal:

Style the current list of repositories into the following design:
![Melting Pot Repo Design](http://d2xr67b5foriew.cloudfront.net/assets/images/melting_pot_repo_design.png)

All of the necessary information should be contained in the repo list response from the server

Bonus:

1. Add Repo Notification
  * Add a button (or something) to each repo list item,
  * when clicked it will load the notifications for the particular repo.
  * and render and style these notifications information as you see fit.
  * the server already expose this API endpoint at the following url: `http://localhost:3005/github/notifications?repo=#{repo.full_name}`

2. Surprise Me
