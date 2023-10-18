import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import InMemoryDataStorage from '../database';

function isValidEmail(email:any) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

class UserController {
  // Signup function
  public async signup(req: Request, res: Response) {
    // Implement user registration logic here
    // Example: Create a new user in the database

    if (!isValidEmail(req.body.email)) {
      res.status(400).json({ message: 'Email is inValid' });
      return;
    }

    const existingUser = InMemoryDataStorage.getUserByEmail(req.body.email);
    if (existingUser) {
      res.status(400).json({ message: 'Email already in use' });
      return;
    }

    //Encrypt user password
     const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const userId = uuidv4();

         // Create token
    const token = jwt.sign(
        { user_id: userId, email :req.body.email },
          'process.env.TOKEN_KEY',
        { expiresIn: "2h",}
      );

   // Create a new user
   const newUser = InMemoryDataStorage.createUser({
    username : req.body.username,
    email : req.body.email,
    password :encryptedPassword,
    id : userId, // In a real application, you should hash the password,
    token:token
  });

    // Return a success message or the newly created user
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  }

  // Login function
  public async login(req: Request, res: Response) {

    const { email, password } = req.body;

     // Retrieve the user based on the provided email
     const user = InMemoryDataStorage.getUserByEmail(email);

     if (!user) {
       res.status(401).json({ message: 'Authentication failed' });
       return;
     }

     console.log("password-----",password);
     console.log(" user.password-----", user.password);

     const result= await bcrypt.compare(password, user.password);
     console.log("----result------",result);
     if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user.id, email },
        'process.env.TOKEN_KEY',
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      const updatedUser = InMemoryDataStorage.updateUserById(user.id,user);
      console.log("----------updatedUser-------",updatedUser);
      // user
      res.status(200).json({
        message: 'Authentication successful',
        token: token,
        user: { id: updatedUser.id, email: updatedUser.email },
      });
    } else {
      res.status(401).json({ message: 'Authentication failed' });
    }
  }
}

export default new UserController();
