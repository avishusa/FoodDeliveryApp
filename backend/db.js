const mongoose = require('mongoose');
require("dotenv").config();


const mongoURI = process.env.mongo_url;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected");
        const db = mongoose.connection.db;
        const fetched_data = db.collection('food_items');
        const foodCategory=db.collection('food_categories');

        if (!fetched_data) {
            console.log("No data found in 'food_items' collection or collection does not exist.");
            return;
        }
        if (!foodCategory) {
            console.log("No data found in 'food_categories' collection or collection does not exist.");
            return;
        }

        const data = await fetched_data.find({}).toArray();
        const catData = await foodCategory.find({}).toArray();

           
                global.food_items=data;
                global.foodCategory=catData;


            
        
    } catch (err) {
        console.log("Something went wrong:", err);
    }
};


module.exports = mongoDB;
