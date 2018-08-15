var express =  require("express");
var app     =  express();
var bodyParser  = require("body-parser");
var cors = require('cors');
var router = express.Router();

var mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'staffbase',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

// Basic set up
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cors({origin: 'http://localhost:4200'}));
app.use('/api', router);

//api

router.post('/login', function(req,res){
  var username= req.body.Username;
  var password = req.body.Password;
  let query = 'SELECT * FROM user_credentials WHERE Email ='+ mysql.escape(username);
  let query1 = 'SELECT * FROM user_credentials WHERE Password ='+ mysql.escape(password);
  connection.query(query, function(err, result){ 
    if( result[0] == null || err){
      res.json({success:false, message:"User doesn't exist"})
    }else{
      connection.query(query1, function(err, result){
        if( result[0] == null || err){
          res.json({success:false, message:"password mismatch"})
        }
        else{
      res.json(
        {
          success:true,
           message: 'login success', 
           user_data: result,
          })
    }
  });
  }
  });
})



router.post('/register', function(req,res){
  let query = "INSERT INTO user_credentials (FirstName, LastName, Email,Password) VALUES ('"+req.body.FirstName+"', '"+req.body.LastName+"','"+req.body.email+"','"+req.body.password+"');"
  connection.query(query, function(err, result){ 
    if(err){
      res.json({success:false, message:"User doesn't exist"})
    }else{
      res.json({success:true, message: 'user registered'})
  }
  });
});

router.post('/postQuestion', function(req,res){
  var myDate = new Date();
  let query = "INSERT INTO user_questionaire (FirstName, LastName, Email, Question, Answer, Posted_date) VALUES ('"+req.body.FirstName+"', '"+req.body.LastName+"','"
  +req.body.Email+"','"+req.body.Question+"' ,'"+req.body.Answer+"', '"+myDate+"');"
  connection.query(query, function(err, result){ console.log(result);
    if(err){
      res.json({success:false, message:"please post again"})
    }else{
      res.json({success:true, message: 'question posted'})
  }
  });
});

router.get('/getQuestion', function(req,res){
  let query = "SELECT * FROM user_questionaire";
  connection.query(query, function(err, result){ 
    if(err){
      res.json({success:false, message:"please post again"})
    }else{
      res.json({success:true, message: 'question posted', questionList: result})
  }
  });
});

router.post('/getMyQuestion', function(req,res){
  let query = "SELECT * FROM user_questionaire where FirstName = '"+req.body.FirstName+"'";
  connection.query(query, function(err, result){ console.log(result, req.body);
    if(err){
      res.json({success:false, message:"please post again"})
    }else{
      res.json({success:true, message: 'question posted', questionList: result})
  }
  });
});

router.post('/postAnswer', function(req,res){
  var myDate = new Date();
  let query = "UPDATE user_questionaire SET Answer = '"+req.body.Answer+"' WHERE ID = '"+req.body.ID+"'"

  connection.query(query, function(err, result){
    if(err){
      res.json({success:false, message:"please post again"})
    }else{
      res.json({success:true, message: 'Answer posted'})
  }
  });
});

router.post('/deleteQuestion', function(req,res){
  var myDate = new Date();
  let query = "DELETE FROM user_questionaire WHERE ID = '"+req.body.ID+"'"

  connection.query(query, function(err, result){
    if(err){
      res.json({success:false, message:"please post again"})
    }else{
      res.json({success:true, message: 'Answer posted'})
  }
  });
});


// We are listening on port number 3005
app.listen(3005, function (err) {
    if (err) {
      console.log(err);
      return new Error;
    }else{
        console.log("server listening on 3005");
    }
  })

  

