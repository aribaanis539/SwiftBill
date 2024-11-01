const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://technosoftphoenix:riB4ifJFqugmu1gU@invoice.bfvrt.mongodb.net/invoice_generator"
        );
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
};

module.exports = connection;

