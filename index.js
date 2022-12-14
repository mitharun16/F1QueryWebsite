const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")

app.use(cors());
app.use(express.json());

// get drivers with certain name, team, year, round, and position, and race name
app.get("/drivers/:name/:sponsor/:year/:round/:position/:track", async(req, res) => {
    try {
        const {name, sponsor,year,round,position,track} = req.params;

        var sql='SELECT races.name,grid, position, results.number, laps, results.time, fastestlap, fastestlaptime, forename, surname, drivers.nationality FROM results INNER JOIN drivers ON results.driverid = drivers.driverid INNER JOIN sponsors ON results.sponsorid = sponsors.sponsorid INNER JOIN races ON results.raceid = races.raceid INNER JOIN tracks ON races.circuitid=tracks.circuitId WHERE sponsors.sponsorref=sponsors.sponsorref';

        if(name!='0'){
            sql+=' AND drivers.driverref =\''+name+'\'';
        }
        if(sponsor!='0'){
            sql+=' AND sponsors.sponsorref =\''+sponsor+'\'';
        }
        if(year!=0){
            sql+=' AND year='+year;
        }
        if(round!=0){
            sql+=' AND round='+round;
        }
        if(position!=0){
            if(position=="null"){
                sql+=' AND position is null'
            }else{
            sql+=' AND position='+position;
            }
        }
        if(track!=0){
            sql+=' AND circuitref=\''+track+'\'';
        }
        const drivers = await pool.query(
            sql); 
        res.json(drivers.rows);
    } catch (err) {
        console.error(err.message);
    }
}) 

app.listen(4000, () => {
    console.log("Server has started on 4000")
})

var http = require('http');
var fs = require('fs');
var url=require('url');

http.createServer(function(req, res){
    var q =url.parse(req.url,true);
    var filename="."+q.pathname;
    fs.readFile(filename,function(err,data){
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("Page not found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
   
}).listen(3000);
console.log("Webpage is open on 3000")
console.log("Everything is working.")
// open in http://localhost:3000/home.html
console.log('Webpage has turned on http://localhost:3000/home.html');