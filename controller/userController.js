import User from "../models/userSchema.js";
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    const { name, role, email, password } = req.body;


    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const user = new User({ name, role, email, password: encryptedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const loginUser = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.role !== role){
            return res.status(403).json({ message: 'Role does not match' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' , userId : user._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}