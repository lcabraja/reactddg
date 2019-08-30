const mongoose = require("mongoose");
var Schema = new mongoose.Schema({
    query: {type:String, required:true},
    title: {type:String, required:false},
    results: {type:Number, required:false}
}, { timestamps: true});

Schema.statics.addQuery = async function(query){
    var Query = new this(query);
    var result =  await Query.save(query);
    return result;
}

Schema.statics.listQueries = async function(){
    return await this.find();
}

module.exports = mongoose.model('query', Schema);


