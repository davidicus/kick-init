
<div align="center">

![chuck](https://s3-us-west-2.amazonaws.com/s.cdpn.io/65463/chuck.png)   ![chuck](https://s3-us-west-2.amazonaws.com/s.cdpn.io/65463/chuck.png)


</div>

# kick-init

> Give your new project a kick!


Drastically reduce the time it take to spin up a new project. Even with a starter boilerplate the time you spend setting it up for a new project can add up. With kick-init a single command will have your starter project up and running in a matter of minutes.

*When used to full potential kick-init will:*
- clone starter repo into current directory
- delete old .git history
- initialize new git repository
- run `npm install`
- add all files to staging
- create your first commit
- create your remote repo (with `-r` flag)
- add remote repo to local project (with `-r` flag)
- push up all files to new remote repo (with `-r` flag)
- make you a better person (Beta)


## Install

```
$ npm i -g kick-init
```


## CLI

`kick` is the only necessary command to get started. All arguments and flags are optional. The repo defaults to the first one listed in the config file or the default if no config is present. kick-init defaults to not creating a remote repo but can be added with the `-r`flag.

```

$ kick --help

  Usage:
  $ kick [repo][flag]   generate the [repo] starter in the current directory


  Options:
  -c, --clone           specify a random repo to clone
  -h, --help            print help menu
  -l, --list            print starter repo options
  -r, --remote          create a remote repo for this project
  -v, --version         print current version of kick-init package
  -V, --verbose         print out each command being executed

  [repo]                specify the repo to clone, defaults to first in list


  Examples
    $ kick
    will run kick-init with first repo listed in config and no remote repo
    $ kick -r
    will run kick-init with first repo listed in config with remote repo
    $ kick b
    will run kick-init with b and no remote
    $ kick -c https://github.com/davidicus/myboilerplate.git
    will run kick-init with the myboilerplate repo and no remote

```

##Config

In order to get the full benefits of kick-init add a .kickconfig.json file to your root directory. Without the config file you will not be able to create a remote repo but can still start a local project.

There are two sections of the config, **repos** and **github**. The **repos** property will list out all repos available to clone. You can list as many as you want and name them whatever you like. The second property, **github**, will list your username and personal access token. If you have an enterprise github instance you can add those credentials to be able to push to enterprise instead of public.

Check out how to get a personal access token [here](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).   Now, get ta kickin!

```

//.kickconfig.json

//a, build, z below can be named anything you want to identify the repo

  {
    "repos": {
      "a": "https://github.com/davidicus/react-app-starter.git",
      "build": "https://github.com/davidicus/build-ignore.git",
      "z": "https://github.com/davidicus/build-ignore-test.git"
    },
    "github": {
      "token": "yourPersonalAccessToken",
      "username": "yourUserName",
      "ent_token": "yourEnterprisePersonalAccessToken",
      "ent_username": "yourEnterpriseUserName",
      "ent_hostname": "yourEnterpriseHostName"
    }
  }

```



## License

MIT © [David Conner](http://david-conner.com)
