@ECHO OFF
title Install Dependencies
mode con: cols=120 lines=30
cls
::Express
set /P c=Express is required for running the server. [1mInstall express?[0m (Y/n): 
if /I "%c%" EQU "Y" goto :install
if /I "%c%" EQU "N" goto :next
:install
echo Installing express..
call npm i express
:next

::Socket.io
set /P c=Socket.io is required to connect to the server. [1mInstall socket.io?[0m (Y/n): 
if /I "%c%" EQU "Y" goto :install
if /I "%c%" EQU "N" goto :next
:install
echo Installing socket.io..
call npm i socket.io
:next

::Nodemon
set /P c=Nodemon will automatically restart the server whenever file changes are detected. [1mInstall nodemon?[0m (Y/n): 
if /I "%c%" EQU "Y" goto :install
if /I "%c%" EQU "N" goto :next
:install
echo Installing nodemon..
call npm i nodemon -g
:next

::Electron
set /P c=Electron is required for using and building electron based applications. [1mInstall electron?[0m (Y/n): 
if /I "%c%" EQU "Y" goto :install
if /I "%c%" EQU "N" goto :next
:install
echo Installing electron..
call npm i electron -g
:next

::Done!
PAUSE