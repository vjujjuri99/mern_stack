import { UserModel } from "../../db/schema.js";
import nodemailer from 'nodemailer';

/// Nodemailer configuration (replace with your SMTP server details)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vjujjuri99@gmail.com',
      pass: 'Vinay@911146',
    },
  });
  
  // Function to generate OTP, save it to the user in the database, and send it to the user's email
  const generateAndSendOTP = async ({ email, username, phone_number, firstname, lastname, password }) => {
    try {
      // Generate OTP
      const otp = Math.floor(1000 + Math.random() * 9000);
  
      // Save the OTP to the user in the database
      const user = new UserModel({
        email,
        username,
        phone_number,
        firstname,
        lastname,
        password,
        otp,
        otpExpiration: new Date(new Date().getTime() + 5 * 60 * 1000), // OTP expires in 5 minutes
      });
  
      await user.save();
  
      // Send OTP to user's email
      const mailOptions = {
        from: 'vinay.juj99@gmail.com',
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is: ${otp}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      return { success: true, message: 'OTP generated and sent successfully.' };
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Internal server error.' };
    }
  };
  
  // Example usage within the same file
  const handleGenerateOTPEndpoint = async (req, res) => {
    try {
      const { email, username, phone_number, firstname, lastname, password } = req.body;
  
      const result = await generateAndSendOTP({ email, username, phone_number, firstname, lastname,password });
  
      if (result.success) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(500).json({ error: result.error });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };
  
  export { generateAndSendOTP, handleGenerateOTPEndpoint };
