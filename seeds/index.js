const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("DATABASE CONNECTED!!!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const city = cities[random1000];
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${city.city}, ${city.state}`,
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
