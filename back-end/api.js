var mongodbConfig = require("./mongodb-config.json")

var express = require('express');

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var urlDB = mongodbConfig.url;
var app = express();

const bodyParser = require('body-parser');



//app.use(bodyParser);
app.use(function(req, res, next) {
  var allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


/**
 * filterIDrestaurant - this function allows to add a filter using the idRestaurnat
 *
 * @param  {type} id the idRestaurant researched
 * @return {type}    the json allowing the filter
 */
function filterIDrestaurant(id) {
  if (id == null) {
    return {}
  }
  jsonFilter = {
    'idRestaurant': id
  }
  return jsonFilter
}



/**
 * filterIDInspection - description
 *
 * @param  {type} id description
 * @return {type}    description
 */
function filterIDInspection(id) {
  if (id == null) {
    return {}
  }
  jsonFilter = {
    '_id': new ObjectId(id)
  }
  return jsonFilter
}



/**
 * filterByYear - description
 *
 * @param  {type} year description
 * @return {type}      description
 */
function filterByYear(year) {
  if (year == null) {
    return {}
  }
  jsonFilter = {
    "inspectionDate": new RegExp(year + "\.")
  }
  return jsonFilter
}


/**
 * filterType - description
 *
 * @param  {type} type description
 * @return {type}      description
 */
function filterType(type) {
  if (type == null) {
    return {}
  }
  jsonFilter = {
    "restaurant.cuisineType": new RegExp(".*" + type + ".*")
  }
  return jsonFilter
}



/**
 * sortResultScore - description
 *
 * @param  {type} sortDir description
 * @return {type}         description
 */
function sortResultScore(sortDir) {
  if (sortDir == 0) {
    return {}
  }
  jsonSort = {
    "score": sortDir
  }
  return jsonSort
}


function filterName(name){
  if (name == null) {
    return {}
  }
  jsonFilter = {
    "restaurant.name": new RegExp(".*" + name + ".*")
  }
  return jsonFilter
}

function filterBorough(borough){
  if (borough == null) {
    return {}
  }
  jsonFilter = {
    "restaurant.borough": new RegExp(".*" + borough + ".*")
  }
  return jsonFilter
}



/**
 * getNumberInspection - description
 *
 * @param  {type} idRestaurant description
 * @return {type}              description
 */
function getNumberInspection(idRestaurant) {
  var aggregate = []
  match_id = {
    "$match": {
      "idRestaurant": idRestaurant
    }
  }
  group_by_id_restaurant_time = {
    "$group": {
      "_id": 0,
      "time": {
        $sum: 1
      }
    }
  }
  aggregate.push(match_id)
  aggregate.push(group_by_id_restaurant_time)
    return new Promise(function(resolve, reject) {
  MongoClient.connect(urlDB, function(err, db) {
    if (err)
      throw err;
    var dbo = db.db(mongodbConfig.base);
    dbo.collection(mongodbConfig.table).aggregate(aggregate).toArray(function(err, result) {
      if (err)
        throw err;
      resolve(result)
      db.close(); // close the connection
    });
    })
  });
}

function getAvgPerYearInspection(idRestaurant){
  var aggregate = []
  var match_id = {
     	   "$match" :
     	   		{
     	     	"idRestaurant": idRestaurant
     	     	}
     	 }

  var group_by_inpsection_date = {
         "$group" : {
           	"_id": {$substr: ["$inspectionDate",0,4]},
         		"number" : {"$sum":1}
         }
  }

  var group_avg_inspection_by_year = {
    	"$group":
           {
          		"_id" :  0,
          		"avg" : {$avg: "$number" }
          	}
  }
  aggregate.push(match_id)
  aggregate.push(group_by_inpsection_date)
  aggregate.push(group_avg_inspection_by_year)
  return new Promise(function(resolve, reject) {
    MongoClient.connect(urlDB, function(err, db) {
      if (err)
        throw err;
      var dbo = db.db(mongodbConfig.base);
      dbo.collection(mongodbConfig.table).aggregate(aggregate).toArray(function(err, result) {
        if (err)
          throw err;
        resolve(result)
        db.close(); // close the connection
      });
    });
  })
}

function getTheScoreMax(idRestaurant) {
  var aggregate = []
  var match_id = {
    "$match": {
      "idRestaurant": idRestaurant
    }
  }

  var group_by_the_max = {
    "$group": {
      "_id": 0,
      "maxScore": {
        $max: "$score"
      }
    }
  }
  aggregate.push(match_id)
  aggregate.push(group_by_the_max)
  return new Promise(function(resolve, reject) {
  MongoClient.connect(urlDB, function(err, db) {
    if (err)
      throw err;
    var dbo = db.db(mongodbConfig.base);
    dbo.collection(mongodbConfig.table).aggregate(aggregate).toArray(function(err, result) {
      if (err)
        throw err;
      resolve(result)
      db.close(); // close the connection
    });
    })
  });
}


function getAvgScore(idRestaurant){
  var aggregate = []
  var match_id = {
    "$match": {
      "idRestaurant": idRestaurant
    }
  }
  var group_by_the_avg = {
    "$group":
    {
      "_id": 0,
      "avg": { $avg: "$score" }
    }
  }
  aggregate.push(match_id)
  aggregate.push(group_by_the_avg)
  return new Promise(function(resolve, reject) {
  MongoClient.connect(urlDB, function(err, db) {
    if (err)
      throw err;
    var dbo = db.db(mongodbConfig.base);
    dbo.collection(mongodbConfig.table).aggregate(aggregate).toArray(function(err, result) {
      if (err)
        throw err;
      resolve(result)
      db.close(); // close the connection
    });
  });
});
}








/**
 * app - this call allows to return some stats in term of a restaurant
 *
 * @param  {type} '/inspections/stats' description
 */
app.get('/inspections/stats', function(req, res) {
  var idRestaurant = parseInt(req.query.idRestaurant)
  if (idRestaurant != null) {
    Promise.all([getAvgScore(idRestaurant), getTheScoreMax(idRestaurant), getNumberInspection(idRestaurant), getAvgPerYearInspection(idRestaurant)]).then(function(values) {

      console.log(values)

      var avgScore = values[0][0].avg
      var scoreMax = values[1][0].maxScore
      var numberInspec = values[2][0].time
      var avgPerYear = values[0][0].avg

      jsonResult = {}
      jsonResult.avgScore = avgScore
      jsonResult.scoreMax = scoreMax
      jsonResult.numberInspec = numberInspec
      jsonResult.avgPerYear = avgPerYear

      //console.log(jsonResult);
      res.json(jsonResult)
    });
  }
})



/**
 * app - this call allows to verify that a restaurant is already saved or note
 *
 * @param  {type} '/verify' route for using this api part
 */
app.get('/inspections/verify', function(req, res) {
  var phone = req.query.phone != null ? req.query.phone : null
  var zipcode = req.query.zipcode != null ? req.query.zipcode : null

  if(phone == null || zipcode == null){
    res.status(500).send({ error: 'Something failed!' })
  }

  MongoClient.connect(urlDB, function(err, db) {
    if (err) throw err;
    var dbo = db.db(mongodbConfig.base);
    jsonFilter = {"restaurant.phone" : phone ,"restaurant.zipcode" : zipcode}
    dbo.collection(mongodbConfig.table).findOne(jsonFilter, function(err, result) {
      if (err) throw err;
      jsonResult = {}
      jsonResult.found = (result != null)
      jsonResult.restaurant =  result != null ? result.restaurant : null
      jsonResult.idRestaurant = result != null ? result.idRestaurant : -1
      res.json(jsonResult) // send the request result
      db.close(); // close the connection
    });
  })
})

/**
 * app - this call allows only read data not edit
 *
 * @param  {type} '/inspections' route for using the api
 */
app.get('/inspections/read', function(req, res) {
  // by default the limit is 10
  // arguments are stored and anaylzed
  var limit = req.query.limit != null ? parseInt(req.query.limit) : 10
  var idRestaurant = req.query.idRestaurant != null ? parseInt(req.query.idRestaurant) : null
  var idInspection = req.query.idInspection != null ? req.query.idInspection : null
  var date = req.query.date != null ? req.query.date : null
  var type = req.query.type != null ? req.query.type : null
  var sortScore = req.query.score != null ? parseInt(req.query.score) : 0
  var name = req.query.name != null ? req.query.name : null
  var borough = req.query.borough != null ? req.query.borough : null

  // after taking arguments we do the request mongodbside
  MongoClient.connect(urlDB, function(err, db) {
    if (err) throw err;

    // this array manage differents parts aggregate
    var aggs = []

    // Match part
    // create the match part of the aggregate request
    var filterMatch = Object.assign(filterByYear(date),
      filterIDInspection(idInspection),
      filterIDrestaurant(idRestaurant),
      filterName(name),
      filterBorough(borough),
      filterType(type)
    );

    // push each aggregate part
    var match = {
      "$match": filterMatch
    }
    aggs.push(match)

    // Sort part
    // create the sort part
    var filterSort = sortResultScore(sortScore)

    if (Object.keys(filterSort).length != 0) {
      var sort = {
        "$sort": filterSort
      }
      aggs.push(sort)
    }

    var dbo = db.db(mongodbConfig.base);

    // the request is ready, we do it
    dbo.collection(mongodbConfig.table).aggregate(aggs).limit(limit).toArray(function(err, result) {
      if (err) throw err;
      res.json(result) // send the rrequestats result
      db.close(); // close the connection
    });
  });
});




/**
 * app - this call allows only edit data not read
 *
 * @param  {type} '/inspections/add' route for using the api
 */
app.post('/inspections/add', function(req, res) {
  console.log(req.body);
  res.send(JSON.stringify(req.body));
  MongoClient.connect(urlDB, function(err, db) {
  if (err) throw err;
  var dbo = db.db(mongodbConfig.base);
  dbo.collection(mongodbConfig.table).insertOne(req.body, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
});


app.post('/inspections/query/find', function(req, res) {
  console.log(req.body);
  MongoClient.connect(urlDB, function(err, db) {
    if (err)
      throw err;
    var dbo = db.db(mongodbConfig.base);
    console.log(req.body.q)
    dbo.collection(mongodbConfig.table).find(req.body.q).limit(10).toArray(function(err, result) {
      if (err)
        throw err;
      res.json(result) // send the rrequest result
      db.close(); // close the connection
    });
  });
});

app.post('/inspections/query/aggregate', function(req, res) {
  MongoClient.connect(urlDB, function(err, db) {
    if (err)
      throw err;
    var dbo = db.db(mongodbConfig.base);
    console.log(req.body)
    console.log(req.body.data)
    dbo.collection(mongodbConfig.table).aggregate(req.body.q).limit(10).toArray(function(err, result) {
      if (err)
        throw err;
      res.json(result) // send the rrequest result
      db.close(); // close the connection
    });
  });
});

app.listen(8000);
