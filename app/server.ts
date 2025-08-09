import app from './app'
let server;

const PORT = 5000;


const startServer = () => {
    server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
}

startServer();