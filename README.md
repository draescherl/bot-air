# bot-air
A bot to help manage the AIR-EISTI discord server

## Features
This bot can do a few things :
<ol>
  <li>Create temporary voice channels</li>
  <li>React to key words in chat</li>
  <li>Manage roles (WIP)</li>
</ol>

## Installation
Step 1 : clone the git repository `git@github.com:draescherl/bot-air.git` <br>
Step 2 : move to the corresponding directory : `cd bot-air` <br>
Step 3 : install dependencies : `npm install` <br>
Step 4 : create a `creds.json` file and paste these contents : 
```json
{
  "token": ""
}
```
Step 5 : paste your discord bot token in the `creds.json` file

## Configuration
There are a few setting you can change in the `config.json` file :
<ul>
  <li>prefix : the prefix that will be added to any temporary voice channel</li>
  <li>trigger : the name of the channel that will act as the trigger for creating a temporary VC</li>
  <li>probability : percentage of chances for the bot to send a message in chat (0.1 = 10%), range : probability in [0;1]</li>
</ul>

## Execution
From the same directory as `index.js`, run `node .`

## Requirements
This bot was written with [Node.js](https://nodejs.org/) version 15.0.1 using [discord.js](https://discord.js.org/) version 12.5.1

## Author
Lucas DRAESCHER (draescherl@eisti.eu)