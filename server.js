const express = require('express');
const app = require('./app');
const http = require('http');
const port = process.env.PORT || 1200 ;



app.listen(port, ()=>{
    console.log("Server is running on port " + port)
})