const express= require('express');

const mysql= require('mysql2');

const bodyParser = require('body-parser');

const path = require('path');

const app = express();

const port = 3000;

// Your MySQL RDS database configuration

const db = mysql.createConnection ({

host: 'nodedb.c5czmabflugz.us-east-1.rds.amazonaws.com',

user: 'admin',

password:'WebApp#123',

database: 'hello',
});

//connect to the database
db.connect((err) => {
    if(err) {
      console.error('Error connectingnto MySQL:',err);
    }else{
        console.log('connected to MySQL');
        createTable(); //calling the function
    }
});

//funtion to create the table if it doesn;t exist

function createTable() {
    const sql= `
    CREATE TABLE IF NOT EXISTS students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCAHR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL)`;
    db.query(swl, (err,reslt) => {
        if(err) {
            console.error('error creating tablke:',err);
        }else {
            console.log('table created or already exists');
        }
    });
}

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(express.static(path.jopin(__dirname, 'form.html')));

//insert data
app.post('/insert', (req, res)=> {
    const { name,address,phone }=req.body;
    const sql ='INSERT INTO students(name, address ,phone) VALUES (?,?,?)';
    db.query(sql,[name,address,phone],(err,result) => {
        if(err){
            console.error('Error indrting data:',err);
            res.status(500).send('Error isnerting data');
        }else {
            console.log('Data inserted successfully');
            res.send('Data inserted successfully');
        }
    });
});

//delete data
app.post('/delete', (req, res) => {

    const [name] = req.body;
    
    const sql= 'DELETE FROM students WHERE name =?';
    
    db.query(sql, [name], (err, result) => {
    
    if (err) {
    
    console.error('Error deleting data:', err);
    
    res.status (500).send('Error deleting data');
    
    } else {
    
    console.log('Data deleted successfully');
    
    res.send('Data deleted successfully');
    }
    
    });
    
});

app.listen(prt, () => {
    console.log(`server running at http://localhost:${port}`);
});
    
    