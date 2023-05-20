const url=require('url');
let fs=require('fs');
function renderHTML(path, response){
    fs.readFile(path, null, function (error, data)){
        if (error)
        {
            response.writehead(404);
            response.write('File not found');}
            else
            {
                response.write(data);
            }
            response.end();
        } 
}
module.exports={
    handleRequest: function(request, response)
    {
response.writehead(200, {'Content-Type': 'text/html'});
var path=url.parse(request.url).pathname;

switch(path)
{
    case '/':
    renderHTML('./index.html', response);
    break;
    case '/login':
        renderHTML('./login.html', request);
        break;
        default:
            response.writeHead(404);   
         response.write('Route not found'); 
         response.end();  
}
    }
}; 