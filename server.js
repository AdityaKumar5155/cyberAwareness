var http=require('http');
var app=require('./app');

// function onRequest(request, response)
// {
//     response.writeHead(200,{'Content-Type': text/html});
// fs.readFile('./index.html', null, function (error, data)){
//     if (error)
//     {
//         response.writehead(404);
//         response.write('File not found');}
//         else
//         {
//             response.write(data);
//         }
//         response.end();
//     }
// };

        http.createServer(app.handleRequest()).listen(8000); 