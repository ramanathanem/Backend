const express = require ('express')
const router = express.Router();
const User = require('../Model/User')
const dotenv = require('dotenv');
dotenv.config();


router.post('/create', async (req, res) => {
    const user =  req.body;
  
    try {
       const newUser = await new User({
        name:user.name,
        email:user.email,
        mobileno:user.mobileno,
        role:user.role,
        gender:user.gender,
        course:user.course
       })
        await newUser.save();
        console.log("submited",newUser);
        res.status(201).json(newUser); // Sending the saved user object as response
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Sending error response
    }   
});

router.get('/users', async (req, res) => {
    
    try {
        const users = await User.find(); 
       // Fetching all users from the database
        res.status(200).json(users); // Sending the users array as response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Sending error response
    }
});

router.get('/create/:id',async(req,res)=>{
    try {
        const updatedata=await User.findById(req.params.id);
        res.status(201).send(updatedata)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.put('/create/:id', async (req, res) => {
    const itemId = req.params.id; // Extracting item ID from request params
    const updatedData = req.body; // Getting updated data from request body
console.log(itemId)
    try {
        // Finding the item by ID and updating it with the new data
        const updatedItem = await User.findByIdAndUpdate(itemId, updatedData, { new: true });

        // Checking if the item was found and updated
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        // Sending the updated item in the response
        return res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
    } catch (error) {
        // Handling errors
        console.error('Error updating item:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


   
router.delete('/create/:id', async (req, res) => {
    const itemId = req.params.id; // Extracting item ID from request params
  
    try {
      // Assuming you have a model called User
      const deletedItem = await User.findOneAndDelete(itemId);
  
      // Checking if the item was found and deleted
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      // Sending a success response
      return res.status(200).json({ message: 'Item deleted successfully', item: deletedItem });
    } catch (error) {
      // Handling errors
      console.error('Error deleting item:', error);
      return res.status(500).json({ error: error.message }); // Sending the error message as response
    }
  });
  

   
module.exports = router;


