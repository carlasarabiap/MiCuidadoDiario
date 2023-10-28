import { createServer } from "http";

const server = createServer((req,res) => {
    //res.writeHead(200, {"Content-Type": "text/plain"});
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    //res.end("¡Arrancó el Servidor 🎉🎉🎉!");
    res.end("<h1>¡Arrancó el Servidor 🎉🎉🎉!</h1>");
});

server.listen(3000, "127.0.0.1", ()=>{
    console.log("Servidor web en ejecución en http://127.0.0.1:3000");
})