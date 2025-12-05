const asyncHandler = require('express-async-handler');
const Resource = require('../models/resourceModel');
const User = require('../models/userModel');

//user define steps...

const getResources = asyncHandler(async (req, res) => {
   //steps....
 const resources = await Resource.find({ createdBy: req.user.id });

 res.status(200).json(resources);
});

//new user resource....

const createResource = asyncHandler(async (req, res) => {
 //check for all detlis 

 const { title, description, category, status, amount } = req.body;

 if (!title || !description || !category || !status || !amount) {
 res.status(400);
 throw new Error('Please fill in all required fields (title, description, category, status, amount).');
 }

 const resource = await Resource.create({
        title,
      description,
       category,
        status,
        amount,
      createdBy: req.user.id, 
  });

   res.status(201).json(resource);
});

//user define by id 

const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

   if (!resource) {
      res.status(404);
      throw new Error('Resource not found.');
    }

   //update the same id = user 
    if (resource.createdBy.toString() !== req.user.id) {
        res.status(401);
      throw new Error('User not authorized to update this resource.');
    }

      const updatedResource = await Resource.findByIdAndUpdate(
        req.params.id,
        req.body,
    { new: true } 
   );

   res.status(200).json(updatedResource);
});

//resources stpe to guide.....

const deleteResource = asyncHandler(async (req, res) => {
     const resource = await Resource.findById(req.params.id);

   if (!resource) {
     res.status(404);
     throw new Error('Resource not found.');
 }

     //
   if (resource.createdBy.toString() !== req.user.id) {
       res.status(401);
     throw new Error('User not authorized to delete this resource.');
    }

   await Resource.deleteOne({ _id: req.params.id });

    res.status(200).json({ id: req.params.id, message: 'Resource successfully deleted.' });
});

//check the same path to show in post man to do ....
//steps...

const getResource = asyncHandler(async (req, res) => {
       const resource = await Resource.findById(req.params.id);

    if (!resource) {
       res.status(404);
     throw new Error('Resource not found.');
   }

    //
    if (resource.createdBy.toString() !== req.user.id) {
      res.status(401);
       throw new Error('User not authorized to view this resource.');
   }

   res.status(200).json(resource);
});

module.exports = {
    getResources,
    createResource,
    updateResource,
    deleteResource,
    getResource,
};