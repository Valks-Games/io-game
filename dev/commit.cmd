::Automating commits.
@ECHO OFF
cd ..
:commit

::Message of commit we are sending.
set /p message="Commit Message: "
call git add .
call git commit -m "%message%"

::Pull?
set /P c=Pull from origin master? (Y/n): 
if /I "%c%" EQU "Y" goto :pull
if /I "%c%" EQU "N" goto :nopull
:pull
call git pull origin master
:nopull

::Push?
set /P c=Push to origin master? (Y/n): 
if /I "%c%" EQU "Y" goto :push
if /I "%c%" EQU "N" goto :nopush
:push
call git push -u origin master --follow-tags
:nopush

::Send another commit?
set /P c=Send another commit? (Y/n): 
if /I "%c%" EQU "Y" goto :commit
if /I "%c%" EQU "N" goto :next
:next