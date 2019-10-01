@ECHO OFF
:commit
set /p message="Commit Message: "
call git add .
call git commit -m "%message%"
call git pull origin master
call git push -u origin master
set /P c=Send another commit? (Y/n): 
if /I "%c%" EQU "Y" goto :commit
if /I "%c%" EQU "N" goto :next
:next