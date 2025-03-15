import fastify from "fastify";

const app = fastify();

app.get('/', () => {
    return "Hello World";
})

app.listen({
    port: 33333
}).then(() => {
    console.log("Server is running on port 33333");
})