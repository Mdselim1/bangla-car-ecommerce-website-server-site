const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
require('dotenv').config();

require('dotenv').config();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hf2pl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async () => {
    
    try {

        await client.connect();
        
        const database = client.db('BanglaCar');

        const carCollection = database.collection('cars');

        app.get('/cars', async (req, res) => {
            
            const carsCollect = carCollection.find({});
            const result = await carsCollect.toArray();
            res.json(result);

        });

        
    }
    finally {
        // await client.close();
    }
    
}

run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('This is Cars Website')
    console.log('server run finish');
});

app.listen(port, () => {
    console.log(`This server is running http://localhost:${port}`);
});