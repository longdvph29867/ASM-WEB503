import express from 'express'
import { engine } from 'express-handlebars';
import path from 'express'
import { fileURLToPath } from 'url';
import {join, dirname } from 'path';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 8000;

app.use(express.static(join(__dirname, "public")))
app.use(express.json());
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'views');

connectDB();

routes(app);


app.listen(port, () => {
  console.log('Server is running on port ', port);
})
