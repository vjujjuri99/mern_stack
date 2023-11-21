import { UserOTPModel } from "../../db/schema.js";
import twilio from 'twilio';
import dotenv																																from "dotenv";
dotenv.config(); // for reading from .env file
  
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILION_NUMBER;

const client = twilio(accountSid, authToken);
  // Function to generate OTP, save it to the user in the database, and send it to the user's email
// Function to generate OTP, save it to the user in the database, and send it via SMS
const generateAndSendOTP = async ({ phone_number }) => {
    try {
      // Generate OTP
      const otp = Math.floor(1000 + Math.random() * 9000);
  
      // Save the OTP to the user in the database
      const user = new UserOTPModel({
        phone_number,
        otp,
        otpExpiration: new Date(new Date().getTime() + 5 * 60 * 1000), // OTP expires in 5 minutes
      });
  
      await user.save();
  
      // Send OTP via SMS
      await client.messages.create({
        body: `Your verification code is: ${otp}`,
        from: twilioPhoneNumber,
        to: phone_number,
      });
  
      return { success: true, message: 'OTP generated and sent successfully.' };
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Internal server error.' };
    }
  };
  
  // Example usage within the same file
  const handleGenerateOTPEndpoint = async (req, res) => {
    try {
      const { phone_number } = req.body;
  
      const result = await generateAndSendOTP({ phone_number });
  
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
