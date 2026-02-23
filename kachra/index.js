// this is the main entry point of the application.

// building http server

// const http = require('http');
// const fs = require("fs");
// const url = require('url');
const express = require("express");

// request handler function

const app = express();  

app.get('/', (req, res) => {
  return res.send(' hello from homepage');
});

app.get('/about', (req, res) => {
  return res.send('hello from about page ');
});


// function myhandler(req, res)  {

//   // server creation and log  creation and log handling
  
  
//     if(req.url === "/favicon.ico") return res.end();

//     const log = `${Date.now()}: ${req.method} ${req.url} New Request Received\n`
//     const myUrl = url.parse(req.url, true);  
//     // console.log(myUrl);
  
    
//     fs.appendFile("log.txt", log, (err, data) => {
//       switch(myUrl.pathname){
//         case "/":
//           if (req.method === "GET") res.end ("homepage");
//           break;
  
//         case "/about":
//           const username = myUrl.query.myname  
//           res.end(`heyy , $(username) this is about page`);
//           res.end("About page");
//           break;
  
//         case "/signup":
//           if (req.method === "get") res.end("this is signup form page");
//           else if (req.method === "post") {
//             // #Db logic to save the user info
//             res.end ("form submitted succesefully");
//           }
//           break;
  
//         default:
//           res.end("404 page not found");
//           break;
//       }
        
          
//       // res.end("hello babyy, this is server ");
//     });
//     // console.log(' new Request received');
//     // console.log(req.headers)
    
// };

// const myServer = http.createServer(app);

// myServer.listen(8001, () => {
//    console.log('server is listening on port 8001')
// })

app.listen(8001, () => { console.log('server is listening on port 8001') });