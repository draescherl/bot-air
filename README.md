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
This branch is for hosting the bot on [Heroku](https://heroku.com). <br>
All you need is an environment variable called `BOT_TOKEN` in which you store your secret token.

## Configuration
There are a few setting you can change in the `config.json` file :
<ul>
  <li>prefix : the prefix that will be added to any temporary voice channel</li>
  <li>trigger : the name of the channel that will act as the trigger for creating a temporary VC</li>
  <li>probability : percentage of chances for the bot to send a message in chat (0.1 = 10%), range : probability in [0;1]</li>
</ul>

## Requirements
This bot was written with [Node.js](https://nodejs.org/) version 15.0.1 using [discord.js](https://discord.js.org/) version 12.5.1

## Author
Lucas DRAESCHER (draescherl@eisti.eu)