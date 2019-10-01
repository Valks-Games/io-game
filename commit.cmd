::Automating commits.
@ECHO OFF
:commit
::Message of commit we are sending.
set /p message="Commit Message: "
call git add .
call git commit -m "%message%"
::Should we pull the origin master?
set /P c=Pull origin master? (Y/n): 
if /I "%c%" EQU "Y" goto :pull
if /I "%c%" EQU "N" goto :nopull
:pull
call git pull origin master
:nopull
call git push -u origin master
set /P c=Send another commit? (Y/n): 
if /I "%c%" EQU "Y" goto :commit
if /I "%c%" EQU "N" goto :next
:next