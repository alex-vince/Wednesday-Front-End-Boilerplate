#Project Name ReadMe

This is the default Wednesday Agency Front-End Boilerplate

##Git Flow
Repos will **always** have these branches.  

###master

This is what is in production. Before a site goes live for the first time this will be the most up to date staging release.

###develop

Receives all features during an active development phase of a project. This should be as stable as possible so that the team have an up to date and reliable base to work from. All tests and QA should pass on this branch so continuous integration is possible.

###Single Commit Features

If there are features or a minor update that can be made in a single commit then it is acceptable to commit directly to develop but problems can arise if the feature takes longer than a day to complete. It is important your work is pushed to origin regularly to protect against loss, so as soon as it is suspected that a feature is going to take longer than expected, or is going to be a series of commits, then a branch should be created so the commits can be pushed to origin without risking pushing partial features to develop.

###Feature Branches

New features should branch from develop, from a release branch or possibly even a hotfix if something is missed. It is important that you only merge branches that you want to incorporate into your feature so you do not introduce other unrelated features when your feature is merged in. It is normally safe to regularly merge up from the branch you originally branched from. Feature branches can generally be derived from tasks within the project backlog although on occasion there may be more than one backlog task within a feature.

Naming Convention: feature/{feature-name}

**Examples**

```
git checkout -b feature/product-detail-page
git checkout -b feature/lookbook-landing-page
```

Unlike gitflow we recommend that developers push their feature branches to origin at least daily even when features are not complete.

```
git push origin feature/profile-page
```

git is distributed by design but at Wednesday we nearly always have a central origin, usually github. Pushing your work daily to origin prevents code loss when a developer goes AWOL, is out of reach or looses their laptop.

###Bug Branches

Often a task is solely to fix a bug. These could be created as feature branches, but it feels wrong saying 'feature/badly-aligned-button' so we have adopted the 'bug/' prefix for such cases. 'bug/{assembla-ticket-number}-bug-description'

```
git branch bug/215-badly-aligned-button
```

###Release Branches

In most cases release branches are branched from develop once an agreed amount of completeness is reached. Generally develop is not again merged into the release branch, but small changes may be merged from other feature branches if something is missed or a long time elapses between creation and deployment. Once deployed and all checks pass, the release should be merged back onto develop and master. As described in gitflow releases are versioned with major and minor at time of creation.

Naming Convention: release/{version}

```
git checkout -b release/1.2
```

###Versioning
Before any deployment the release should be tagged with a version number. Wednesday follow the [Semantic Versioning](http://semver.org/) for all software versioning.

Deployment to testing for a stakeholder to check should be either an alpha or beta version with the tag: 1.48.0-alpha1, 1.48.0-beta1, 1.48.0-beta2. Alpha can be any partial feature that you want to simply show some progress of. Beta releases should pass some basic quality assurance and have the potential to become a release candidate.

…… Tagging


##Project Dependencies  

This project implements tools and frameworks from the following technology stack in part or in whole:

- [npm](https://npmjs.org/)
- [Grunt](http://gruntjs.com/)
- [Bower](http://bower.io/)
- [Assemble](http://assemble.io/)
- [Java](http://www.java.com/)

The only prerequisites are npm (to bootstrap the project) and XCode for its Command Line Tools (Mac OS-X only) or Java (Windows only); the other tools and frameworks are either installed via npm or are directly included within this project.  npm can be installed using one of the following methods:

- Via Wednesday's [boxen](https://github.com/karl-wednesday/boxen/) (recommended)
- Using [Homebrew](http://brew.sh/)
- Using the relevant Node.js source code or a pre-built installer for your platform from [the official npm download page](http://nodejs.org/download/)


###Installing Java (Windows only)
Install Java using the relevant pre-built installer for your platform from [the official Java download page](http://www.java.com/en/download)


###Installing npm

**Mac OS-X: Using Wednesday's Boxen to install npm**

Wednesday's Boxen installs most of the packages and applications that you will require for your daily development duties.

Install Boxen and configure your environment:

```
sudo mkdir -p /opt/boxen
sudo chown ${USER}:staff /opt/boxen
git clone --recursive https://github.com/karl-wednesday/boxen.git /opt/boxen/repo
cd /opt/boxen/repo
script/boxen
```

**Mac OS-X: Using Homebrew to install npm**

Install Homebrew on your system

```
ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
```

install npm using Homebrew

```
brew install node
```


**All Platforms: Install npm from source code or an installer**

Download the relevant Node.js source code or a pre-built installer for your platform from the official download page at [npm](http://nodejs.org/download/)

###Pre-Installation

You may need to set NPM's registry to the correct value:

```
npm config set registry http://registry.npmjs.org/
```

Install the Grunt package from NPM onto your system globally

```
npm install -g grunt-cli
```

Install the Bower package from NPM onto your system globally

```
npm install -g bower
```

###Installation

<!--*Important:* Be sure to review the [Known Issues](#known-issues) section of this document before attempting to build the site for the first time.-->

Once you have installed npm, Grunt and Bower globally, you can run the following to bootstrap and run the site:

Clone the project from the Git repository

```
git clone --recursive giturl
```

Change current working directory to the project

```
cd /your/chosen/path
```

Install NPM package dependencies

```
npm install -d
```

Install Bower package dependencies

```
bower install
```	

**Bower Packages**

- Normalize.less
- jQuery
- Modernizr
- Detectizr


##Usage

Launch the project

```
grunt
```


Open project in your default browser

```
open http://localhost:3000
```


##Requirements

The functional specification document for the project dictates that the build must adhere to the following conditions:

- Templates must be supplied as individual HTML files with a corresponding individual stylesheet for each template.

- Additional individual stylesheets must be supplied for site-wide styles; one stylesheet file for the Gentics pages and one stylesheet for the e-commerce platform pages.

- CSS preprocessors such as LESS, SASS or Stylus may not be implemented in terms of any browser-based implementation, however the use of a preprocessor should facilitate the organisation, sharing and migration of styling rules between the CSS stylesheets that will be generated prior to delivery.

##Structure

All editable code and assets should be contained within the /src directory.  The various Grunt tasks use these source files to generate the finalised files via a combination, minification, preprocessing and copying, depending on the file type.  These generated files are placed within the /distribution directory.

**DO NOT EDIT ANY FILES IN THE /distribution DIRECTORY!**  Any changes that you make to files within that directory **WILL** be lost when the project is rebuilt.