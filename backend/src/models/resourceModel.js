const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema(
 {
// 1.user id 
 createdBy: {
 type: mongoose.Schema.Types.ObjectId,
 required: true,
ref: 'User', 
},
 //2.resource filed
 title: {
type: String,
 required: [true, 'Grocery Shopping'],
 },
 description: {
 type: String,
 required: [true, 'Weekly grocery run at the supermarket'],
 },
 category: {
 type: String,
 required: [true, 'Expense'],
 },
 status: {
 type: String,
 required: [true, 'pending'],
},
 amount: {
 type: Number,
 required: [true, '3500'],
     },
       },
    { 
        timestamps: true, 
 }
);

//export to user = Resource
module.exports = mongoose.model('Resource', resourceSchema);