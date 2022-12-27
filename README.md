
## server:
npm init -y
npm install dotenv
npm install body-parser
npm install express cors mysql2 multer

I have put validate user input to the back end, if user text invalid email and phone it would  res.status(400).json({ success: false, result: "not valid phone" }), so the frontend in the console.log checking response.data it would shows result= not valid phone or not valid email and sucess =false


## front
npm install react-router-dom
npm install axios

## share
npm install react-share
## Error
options.allowedHosts[0] should be a non-empty string.
node_modules\react-scripts\config\webpackDevServer.config.js.
