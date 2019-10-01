@ECHO OFF
call git add .
call git commit -m "Update"
call git pull origin master
call git push -u origin master
PAUSE