# Builds the React app and copies the files to be served by Django
npm run build
Remove-Item ../todo-backend-django/build -Recurse -Force
Copy-Item ./build ../todo-backend-django/build -Recurse