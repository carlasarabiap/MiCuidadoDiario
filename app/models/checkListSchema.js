import mongoose from 'mongoose';

// Definición del esquema de la colección
const checklistSchema = new mongoose.Schema({
    question1: {
        type: Boolean,
        required: true,
    },
    question2: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: String,
        required: true
    }
});


const Check = mongoose.model('Checklist', checklistSchema);


export default Check;

