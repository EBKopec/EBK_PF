const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ContentSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    }, 
    info:{
        type: String,
        required: false,
    },
    description:{
        type: String,
        required: true,
    },
    description2:{
        type: String,
        required: false,
    },
    url:{
        type: String,
        required:true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

ContentSchema.plugin(mongoosePaginate);
mongoose.model('Content', ContentSchema);
