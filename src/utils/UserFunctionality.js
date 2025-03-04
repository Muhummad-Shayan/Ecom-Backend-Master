
import User from "../models/userSchema.js";


const updateUserById = async (id, data) => {
    try {
    const { name, email, address, contact } = data;

    const updatedUser = await User.findByIdAndUpdate(
        id,
        {
        $set: {
        ...(name && { name }),
        ...(email && { email }),
        ...(address && { address }),
        ...(contact && { contact }),
        },
        },
        { new: true }
    ).select("-password");

    if (!updatedUser) {
        return "User not found";
    }

    return updatedUser;

    } catch (error) {
        throw new Error(`Error in updating user ${error.message}`);
    }
};

const getUserProfileById = async (id)=>{
    try {
        const user = await User.findOne({_id:id}).select('-password')
        
            if (!user) {
                
                return "User Not Found";
                    
            }
        
        return user;

    } catch (error) {
        throw new Error(`Error in fetching user profile ${error.message}` );
        
    }
}


export {
    updateUserById,
    getUserProfileById
}
