#!/usr/bin/env bash

#repo to clone
repo="$1";
#destination folder to clone repo into
dest="$2";
#check if remote repo is required
remote="$3";
#check for verbose flag
verbose="$4";
#github personal access token for api
token="$5";
#github username
username="$6";
#orange color for printf
orange="\033[1;33m";
cyan="\033[1;31m";
reset="\033[0m";


if find "$dest" -mindepth 1 -print -quit | grep -q .; then
    printf "${cyan}THE TARGET DIRECTORY:${orange} $dest ${cyan}MUST BE EMPTY.${reset}\n";
else
  #Check if remote repo is required
  if [ "$remote" = true ] ; then

    #prompt user for project name and save to variable
    printf "${orange}What is your new repo name?${reset}\n";
    read project_name;
  fi

  # strip underscores
  project_name=${project_name//_/};
  # replace spaces with hyphen
  project_name=${project_name// /-};
  # clean out anything that's not alphanumeric or a hyphen
  project_name=${project_name//[^a-zA-Z0-9-]/};


  # clone repo to destination folder
  if [ "$verbose" = true ] ; then
    printf "${cyan}Cloning $repo into $dest ${reset}\n";
  fi
  git clone "$repo" "$dest";

  #remove git history from starter repo
  if [ "$verbose" = true ] ; then
    printf "${cyan}Remove old git folder and initializing new${reset}\n";
  fi
  rm  -r -f ".git";


  #initialize new git project
  git init;

  #install dependencies
  if [ "$verbose" = true ] ; then
    printf "${cyan}Install dependencies${reset}\n";
  fi
  npm install;

  #add files to git
  if [ "$verbose" = true ] ; then
    printf "${cyan}Add all and commit${reset}\n";
  fi
  git add .;

  #add first commit
  git commit -m ":tada: first commit by kick-init";



  # Check if remote repo is required
  if [ "$remote" = true ] ; then

    #create remote repo
    if [ "$verbose" = true ] ; then
      printf "${cyan}Creating remote repo${reset}\n";
    fi
    curl -u "$token:x-oauth-basic" https://api.github.com/user/repos -d "{\"name\":\"$project_name\",\"description\": \"Awesome project repo\"}";

    wait

    #add remote repo
    if [ "$verbose" = true ] ; then
      printf "${cyan}Add remote origin${reset}\n";
    fi
    git remote add origin "http://github.com/$username/$project_name.git";

    wait

    #push first commit
    if [ "$verbose" = true ] ; then
      printf "${cyan}Push to remote${reset}\n";
    fi
    git push origin master;
  fi
fi
