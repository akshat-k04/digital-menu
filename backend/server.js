// import modules
require('dotenv').config();
const app = require('./app.js');
const connect_to_mongo = require('./database_connection.js');


//giving the port (space from where it run) to the server
port = process.env.PORT;
app.listen(port, () => { console.log(`server is listening at port ${port}`) });




// connecting to database
connect_to_mongo();



// const bcrypt = require('bcrypt');
// bcrypt.hash('Urban_eat', 10, function (err, hash) {
//     // Store hash in your password DB.
//     console.log(hash) ;
// });