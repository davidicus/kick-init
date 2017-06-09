
<div align="center">

![chuck](https://s3-us-west-2.amazonaws.com/s.cdpn.io/65463/chuck.png)   ![chuck](https://s3-us-west-2.amazonaws.com/s.cdpn.io/65463/chuck.png)


</div>

# kick-init  [![Build Status](https://travis-ci.org/davidicus/awesome-project.svg?branch=master)](https://travis-ci.org/davidicus/awesome-project)
> Give your new project a kick!


##Usage
Drastically reduce the time it take to spin up a new project. Even with a starter boilerplate the time you spend setting it up for a new project can add up. With kick-init a single command will have your starter project up and running in a matter of minutes.   


## Install

```
$ npm i -g kick-init
```


## CLI

```

$ kick --help

  Usage:
  $ kick [repo][flag]   generate the [repo] starter in the current directory


  Options:
  -c, --clone           specify a repo URL to clone
  -h, --help            print help menu
  -l, --list            list starter repo options
  -r, --remote          create a remote repo for this project

  [repo]                specify the repo to clone [a-e], defaults to "a"


  Examples
    $ kick -r
    project a with remote repo
    $ kick b
    project b with no remote repo
    $ kick -c https://github.com/davidicus/myboilerplate.git
    will run kick-init with the myboilerplate repo

```

##Config



```

//.kickconfig.json

{
  "repos": {
    "a": "https://github.com/davidicus/react-app-starter.git",
    "b": "https://github.com/davidicus/build-ignore-test.git",
    "z": "https://github.com/davidicus/build-ignore-test.git"
  },
  "github": {
    "token": "your-token",
    "username": "yourUserName"
  }
}

```

In order to get the full benefits of kick-init add a .kickconfig.json file to your root directory. There are two sections of the config. The **repos** property will list out all repos available to clone. The second property is **github**. Here you will list your username and personal access token. Check out how to get a personal access token [here](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

## License

MIT © [David Conner](http://david-conner.com)
