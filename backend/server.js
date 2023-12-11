import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from './config/db.js';
import {notFound,errorHandler} from './middleware/errorMiddleware.js';



import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';


connectDB();//Connect to MongoDB
const port=process.env.PORT || 8000;

const app = express();
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Cookie parse middleware
app.use(cookieParser());



app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/uploads',uploadRoutes);

const __dirname=path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

if (process.env.NODE_ENV === 'production') {
    // const __dirname = path.resolve();
    // app.use('/uploads', express.static('/var/data/uploads'));

    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
    res.send('API is running....');
    });
}
app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>console.log(`Server running on port ${port}`))