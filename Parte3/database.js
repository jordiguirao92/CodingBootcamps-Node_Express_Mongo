var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true, useNewUrlParser: true}, function (err, client){
    if (err) throw err
    console.log('Conectado al servidor');

    var db = client.db('animals');

    var collection = db.collection('mammals');

    collection.insertMany([
        {1 : "dog"}, {2 : "cat"}, {3 : "bear"}
    ]);

    db.collection('mammals').find().toArray(function (err, result){
        if (err) throw err;
        console.log(result);
    })
})