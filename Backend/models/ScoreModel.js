const mongoose = require("mongoose")

const Schema = mongoose.Schema

const dataSchema = new Schema({
    college_id:{
        type:Number,
        required:true
    },
    college_name:{
        type:String,
        required:true
    },
    branch_id:{
        type:Number,
        required:true
    },
    branch_name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    seat_type:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    closing_rank:{
        type:Number,
        required:true
    },
    closing_percentile:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Data",dataSchema)