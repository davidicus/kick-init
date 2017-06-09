#!/usr/bin/env bash

#repo to clone
repo="$1";
#destination folder to clone repo into
dest="$2";
#check if remote repo is required
remote="$3";
#github personal access token for api
token="$4";
#github username
username="$5";
#orange color for printf
orange="\033[1;33m";
reset="\033[0m";



#clone repo to destination folder
git clone "$repo" "$dest";

#remove git history from starter repo
rm  -r -f ".git";

#initialize new git project
git init;

#install dependencies
npm install;

#add files to git
git add .;

#add first commit
git commit -m ":beers: first commit <3 Davidicus";



#Check if remote repo is required
if [ "$remote" = true ] ; then

  #prompt user for project name and save to variable
  printf "${orange}What is your project's name${reset}\n";
  read project_name;

  #create remote repo
  curl -u "$token:x-oauth-basic" https://api.github.com/user/repos -d "{\"name\":\"$project_name\"}";

  #add remote repo
  git remote add origin "http://github.com/$username/$project_name.git";

  #push first commit
  git push origin master;
fi
