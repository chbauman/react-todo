# Builds the React app and copies the files to be served by Django
npm run build
rm -rf ../todo-backend-django/build
mv -f build ../todo-backend-django