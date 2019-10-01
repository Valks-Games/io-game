title Install Dependencies
mode con: cols=100 lines=30
@ECHO OFF
echo Installing express..
call npm i express
echo Installing socket.io..
call npm i socket.io
echo Installing nodemon..
call npm i nodemon -g
echo Installing electron..
call npm i electron -g
echo Sucessfully installed 4 packages!
PAUSE