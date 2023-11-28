import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import usersRouter from './app/routes/userRoutes.js';
import authRouter from './app/routes/authRoutes.js';
import bloodPressureRouter from './app/routes/bloodPressureRoutes.js';
import checkRouter from './app/routes/checkListRoutes.js';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from "cors";
import { connectDB } from './config/database.js'; // Importa connectDB desde database.js


const app = express();
const port = process.env.PORT || 3002;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Configura el middleware de sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

connectDB(); // Conecta a la base de datos

dotenv.config();

//ruta para que muestre home page
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/home.html");
    res.sendFile(filePath);
});

//ruta para usuarios
app.use('/users', usersRouter);

//app.post("/createUser", (req, res) => {
    //const filePath = path.join(__dirname, "./public/home.html");
    //const filePath = path.join(__dirname, "./public/pages/register.html");
    //res.sendFile(req.body);
//});

//ruta para que muestre home registrer
app.get("/loginUser/getUserByUsername", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/login.html");
    res.send(req.body);
        
});

//ruta para inicio y cierre de sesión
app.use('/users', authRouter);

//enlace para frontend
app.post("/getUsers/loginUser", (req, res) => {
    const filePath = path.join(__dirname, "./public/pages/login.html");
    res.send(req.body);
});

//ruta para Blood Pressure
app.use('/bloodPressure', bloodPressureRouter);

//ruta para CheckList
app.use('/checklist', checkRouter);

//Manejo de errores
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    console.log(err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, () => {
    console.log(`La aplicación está funcionando en http://localhost:${port}`);
});
