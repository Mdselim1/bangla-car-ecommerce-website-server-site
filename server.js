const express = require('express');
const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId;

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

        const orderCollection = database.collection('order');

        // Find All Cars Data Method 
        app.get('/cars', async (req, res) => {
            const carsCollect = carCollection.find({});
            const result = await carsCollect.toArray();
            res.json(result);
        });

        // Find Single Car Data Method 
        app.get('/cars/:id', async (req, res) => {   
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await carCollection.findOne(query);
            res.json(result);
        });

        // Find Single Car Data Method 
        app.delete('/cars/:id', async (req, res) => {   
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await carCollection.deleteOne(query);
            res.json(result);
        });

        //Add Car Data 

        app.post('/cars', async (req, res) => {
            const cardata = req.body;
            const result = await carCollection.insertOne(cardata);
            res.json(result);
        });

        // Add Order product on database 
        app.post('/order', async (req, res) => {
            const orderdata = req.body;
            const result = await orderCollection.insertOne(orderdata);
            res.json(result);      
        });

        //Find single User Car Data
        // app.get('/order', async (req, res) => {
        //     const orders = orderCollection.find({});
        //     const result = await orders.toArray();
        //     res.json(result);
        // });

        //Find single User Car Data
        app.get('/order', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const orders = orderCollection.find(query);
            const result = await orders.toArray();
            res.json(result);
        });


        // Delete Public Order Data 
        app.delete('/order/:id', async (req, res) => {
            const id = req.params.id;
            const deleteId = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(deleteId);
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