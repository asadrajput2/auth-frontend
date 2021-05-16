This is a simple frontend built to demonstrate the use of token-based authentication. It is built using React and NextJS.
The app is deployed at [dalcyn.com](https://dalcyn.com). The corresponding backend can be found in this repo: [auth-backend](https://github.com/asadrajput2/auth-backend)

It has the following auth features:

1. log in
2. signup
3. signup/login with GitHub
4. change password
5. log out
6. view posts
7. add posts

The user can now log in from multiple devices and log out from one device only without affecting other devices. When password is changed, user gets logged out from all the devices.

To demonstrate the auth system I have created a post viewing and publishing system. All posts can be viewed publically but to add a post the user needs to be authenticated (either with email signup/login or with GitHub).

# If you want to run this repo on your system

1. Clone the repo
   - `git clone <the repo url in the address bar>`
2. Install all the dependencies
   - `npm i`
3. Set up the environment variables needed
   - can be found in `next.config.js` file
4. Run this command:
   - `npm run dev`
   - The app will be accessible at `http://localhost:3000`
