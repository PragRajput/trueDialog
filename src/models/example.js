const mongoose = require("mongoose")

const mcqSchema = new mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    answer: {
        type: String,
        default: null
    },
    status:{
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now 
    }
}) 

const Answer = mongoose.model("answer", mcqSchema);
module.exports = Answer