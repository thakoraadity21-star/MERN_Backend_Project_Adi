import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
    },
    {
        timestamps: true,
    }
);

// Mongoose Pre-Save Hook (Optional, but good practice)
// पासवर्ड को सेव करने से पहले हैश करने के लिए
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model('User', UserSchema);

// ES Module एक्सपोर्ट
export default User;