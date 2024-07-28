// API Documentation:-
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from 'swagger-jsdoc';

// Packages Imports:-
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
// Security Imports:-
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

// Files Imports:-
import connectDB from './config/db.js';

// Routes Imports:-
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middleWares/errorMiddleware.js';
import jobsRoutes from './routes/jobsRoutes.js'
import userRoutes from './routes/userRoutes.js'

// Dot ENV Config:-
dotenv.config()

// MongoDB connection:-
connectDB();


// Swagger API Config:-
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Job Portal Application',
            description: 'Node Expressjs Job Potal Application'
        },
        servers: [
            {
                url: "https://mern-job-portal-bsfz.onrender.com"
            }
        ]
    },
    apis:['./routes/*.js']
}
const spec = swaggerDoc(options)

// Rest objects:-
const app = express()

// Middlewares:-
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

// Routes:-
app.use("/api/v1/test", testRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/jobs", jobsRoutes)

// Home Route Root:-
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec))

// Validation Middleware:-
app.use(errorMiddleware)

// Port:-
const PORT = process.env.PORT || 8080

// Listen:-
app.listen(PORT, () => {
    console.log(`Node Server Running In ${process.env.DEV_MODE} Mode on Port no ${PORT}`.bgGreen.white);
})
