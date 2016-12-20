# quorum

Add a connection to firebase on your front end

Click the Generate New Private Key button at the bottom of the Firebase Admin SDK section of the Service Accounts tab. Rename the new JSON file to firebase-service-account.json and save it in the server folder of your application. Return to Firebase console. Configure Google as an authentication provider for your Firebase project.

In the Firebase console for your project (you may already be there from the previous step), click "Authentication" in left panel Click "Set Up Sign-In Method" button Select "Google" Click the "edit" icon Toggle Google to on Connect the application to your database

Create a new postico database or select one you already use. In server/modules/database-config.js, change the connection string, currently var connectionString = 'postgres://localhost:5432/sigma';, to match the location of your database. Copy the queries from the database.sql file and run them in postico to create the necessary tables for this project. On the insert query, be sure to add your own name and give yourself a clearance_level from 1 to 5\. This will determine what data you can see:

INSERT INTO users (email, clearance_level) VALUES ('lukeschlangen@gmail.com', 5), ('youremail@gmail.com', 4), --Your Google Email added here ('yourotheremail@gmail.com', 2), --Your Other Google Email added here ('luke@primeacademy.io', 3); Because you have set up google OAuth, you will need to log in with a google account (an email with @gmail.com will work great). If you have a second google account, that will make it easy to see the differences for people with differing clearance levels.

Run npm start to run your application on localhost:5000
