# FEND Capstone Travel APP

Node.js, Express.js, Sass, various webpack loaders and plugins.

Instructions:

1. Clone the repository

2. Run npm install in the project directory

   - Note - you may have to seperately install webpack CLI as well.

3. For development, run 'npm run nodemon' and, in another terminal window 'npm run build-dev'.
   This will start a development environment with hot reloading, etc.

4. For prod, run 'npm run build-prod', then 'npm start'
   This will build a production version of the app and serve it via Node. The Node server listens on port 3030.

5. The app will be served at http://localhost:3030/

6. You can now enter a city (I recommend starting with a capital city as lesser known cities are not yet fully supported), date of departure, and date of return

7. Hit the Go! button, and the app will fetch from various APIs and display weather information for your chosen destination, an image of your chosen destination and the duration of your trip. At this point, reload the app by refreshing the page.

- Note - I have set up some rudimentary input validation for the destination and date of departure - if I build out this app with additional features, I will add more robust input validation.
