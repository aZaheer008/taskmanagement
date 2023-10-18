import express, { Express } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
const bodyParser = require('body-parser');

import userRoutes from './routes/userRoutes'; // Import user routes
import taskRoutes from './routes/taskRoutes'; // Import task routes

import InMemoryDataStorage from './database';

class Server {
  public server: Express;

  constructor() {
    this.server = express();
    this.config();
    this.initializeRoutes();
  }

  private config(): void {
    // Middleware and configuration setup can go here
    this.server.use(express.json()); // Parse JSON request bodies
    this.server.use(bodyParser.urlencoded({ extended: false }));
    this.server.use(bodyParser.json());
    // Use express-session for session management
    passport.use(
        new LocalStrategy((email, password, done) => {
          // Replace the logic below with your data retrieval mechanism
          const user = InMemoryDataStorage.getUserByEmail(email);
      
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
      
          // Use bcrypt to compare the hashed password with the provided password
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return done(err);
            }
            if (!result) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
        })
      );

    passport.serializeUser((user:any, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id:any, done) => {
        const user = InMemoryDataStorage.getUserById(id);
        done(null, user);
    });
    this.server.use(
        session({
        secret: 'your-secret-key', // Change this to a long, random string
        resave: false,
        saveUninitialized: false,
        })
    );

    this.server.use(passport.initialize());
    this.server.use(passport.session());
  }

  private initializeRoutes(): void {
    // Initialize routes for each module
    this.server.use('/api/users', userRoutes);
    this.server.use('/api/task', taskRoutes);

    // Add more module routes here as needed
  }
}

export default new Server().server;
