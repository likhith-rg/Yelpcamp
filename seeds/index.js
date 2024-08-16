const mongoose = require('mongoose');
const axios = require('axios');
const cities= require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db=mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () =>{
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]



const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        
        const camp=new Campground({
            author: '66b2785cbdd1cf2f69749cc5',
            location:`${cities[random1000].city} , ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolore laboriosam praesentium molestias est eum consequuntur molestiae, repellendus possimus quas quasi facilis iste quo, dicta reiciendis labore provident consequatur fugit!',
            price,
            geometry: {
              type:"Point",
              coordinates:[
                 cities[random1000].longitude,
                 cities[random1000].latitude,
              ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmg8n19vl/image/upload/v1723290003/YelpCamp/z4magbzx8enjl05vvupl.jpg',
                    filename: 'YelpCamp/z4magbzx8enjl05vvupl'
                },
                {
                  url: 'https://res.cloudinary.com/dmg8n19vl/image/upload/v1723289999/YelpCamp/se698nilrzslm4djrnzp.jpg',
                  filename: 'YelpCamp/se698nilrzslm4djrnzp'
                },
                {
                  url: 'https://res.cloudinary.com/dmg8n19vl/image/upload/v1723290003/YelpCamp/cc6bxoekcq88uowf5cxv.jpg',
                  filename: 'YelpCamp/cc6bxoekcq88uowf5cxv'
                },
                {
                  url: 'https://res.cloudinary.com/dmg8n19vl/image/upload/v1723290007/YelpCamp/hd7jmj68xlijuepodcwu.jpg',
                  filename: 'YelpCamp/hd7jmj68xlijuepodcwu'
                }
              ]

        })      
        await camp.save();
    }

    

}


seedDB().then(() => {
    mongoose.connection.close()
})



