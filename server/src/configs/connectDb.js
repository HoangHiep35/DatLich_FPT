const { mongoose } = require('mongoose');

require('dotenv').config();

const dbUrl = `mongodb+srv://hoangvanhiepdhcn:QytFKvgTBAEI2VKB@cluster0.aiwf9kk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(dbUrl);

        console.log(`Connect to mogo db sussesfully!!!`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
