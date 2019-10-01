@ECHO OFF
set /p message="Commit Message: "
call git add .
call git commit -m "%message%"
call git pull origin master
call git push -u origin master
PAUSE