#!/usr/bin/env bash

GREEN='\033[0;32m'
RED='\e[31m'
NC='\033[0m'

printf "\n"

set -e

if [[ $npm_config_user_agent != npm* ]]; then
  echo "You ran this script differently than with 'npm run release'"
  exit 1
fi

printf "\n${GREEN}You are about the start a release process${NC}\n"

printf "\n${RED}[ACTION]${NC} Changes on changelog are not part of this release process.\n"
read -p "is the changelog modified and commited separately? If yes, are you sure? (y/n): "
if [[ ! $REPLY =~ ^[Yy]$ ]]; then exit 1; fi

releaseBranch='master'
currentBranch=`git rev-parse --abbrev-ref HEAD` 

if [ "$currentBranch" != "$releaseBranch" ]; then
  printf "\n${RED}[ERROR]${NC} You must be on master.\n"
  exit 1
fi

changes=`echo $(git add . && git diff --cached --numstat | wc -l) | sed 's/ *$//g'`

if [[ "$changes" != "0" ]]; then
  printf "\n${RED}[ERROR]${NC} Working tree is not clean.\n"
  exit 1
fi

printf "${GREEN}[INFO]${NC} Update working tree.\n"
git pull origin $releaseBranch
git fetch origin --tags

currentVersion=`cat package.json | jq -r '.version'`

printf "\n${RED}[ACTION]${NC} Checking CI status is an manual step! Check here: CI PATH\n"
read -p "Is the latest commit a success? If yes, are you sure? (y/n): "
if [[ ! $REPLY =~ ^[Yy]$ ]]; then exit 1; fi

printf "\n${GREEN}[INFO]${NC} current version is ${GREEN}$currentVersion${NC}. Please type the new chosen version > " 
read -e newVersion

printf "\n"

if [[ "$newVersion" == "" ]]; then
  printf "\n${GREEN}[INFO]${NC} The version must be provided.\n"
  exit 1
fi

read -p "Releasing $newVersion - are you sure? (y/n): "
if [[ ! $REPLY =~ ^[Yy]$ ]]; then exit 1; fi

printf "\n"

yarn version --new-version $newVersion --no-git-tag-version --no-push --exact

git add package.json 

if [[ -n $(git diff --exit-code) ]]; then
  printf "\n${RED}[ERROR]${NC} there is unstaged files.\n"
  exit 1
fi

# build the dist
yarn install --pure-lockfile

if [[ -n $(git diff --exit-code) ]]; then
  printf "\n${RED}[ERROR]${NC} there is unstaged files.\n"
  exit 1
fi

yarn build

if [[ -n $(git diff --exit-code) ]]; then
  printf "\n${RED}[ERROR]${NC} there is unstaged files.\n"
  exit 1
fi

printf "\n\n${GREEN}[INFO]${NC} almost done, check everything in another terminal tab if you want.\n"
printf "\n\nAfter this, we are going to push changes, tag them, and publish the package to npm.\n"
read -p "=> when ready, press [Y/y] to push to github and publish the package. (y/n): "
if [[ ! $REPLY =~ ^[Yy]$ ]]; then exit 1; fi

printf "\n${GREEN}[INFO]${NC} Committing changes" 
git commit -m "release: $newVersion"

printf "\n${GREEN}[INFO]${NC} Creating tag and pushing it" 
git tag "v$newVersion"
git push origin $releaseBranch
git push origin --tags

printf "\n${GREEN}[INFO]${NC} pushing package to NPM\n"
npm run release:publish

printf "\n${GREEN}[INFO]${NC} All done!\n\n"
