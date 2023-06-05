import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String,
        required: true
    },

    Password: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: null
    }
})

export default model("users", UserSchema)