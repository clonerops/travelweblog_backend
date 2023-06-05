import { Schema, model } from "mongoose"

const ArticleSchema = new Schema({

    title: {
        type: String,
    },
    
    description: {
        type: String,
    },
    
    image: {
        type: String,
        default: 'no-image.png'
    },

    isPublished: {
        type: Boolean,
        default: true
    },

    isDeleted: {
        type: Boolean,
        default: false
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

export default model('article', ArticleSchema)