import { UserOTPModel } from "../../db/schema.js";

// Function to validate OTP and delete the entry if successful
const validateOTPAndDeleteEntry = async ({ phone_number, otp }) => {
    try {
      const user = await UserOTPModel.findOne({ phone_number, otp, otpExpiration: { $gt: new Date() } });
  
      if (user) {
        // OTP is valid, delete the entry
        await UserOTPModel.deleteOne({ _id: user._id });
  
        return { success: true, message: 'OTP validated successfully.' };
      } else {
        return { success: false, error: 'Invalid or expired OTP.' };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Internal server error.' };
    }
  };

// Function to handle OTP validation and entry deletion
const handleValidateOTPAndDelete = async (req, res) => {
    try {
      const { phone_number, otp } = req.body;
  
      const result = await validateOTPAndDeleteEntry({ phone_number, otp });
  
      if (result.success) {
        res.status(200).json({ message: result.message, status : result.success });
      } else {
        res.status(400).json({ error: result.error, status : result.success });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

export { handleValidateOTPAndDelete }