const express = require('express')
const app = express()
const path = require("path")
var hbs = require('hbs')
const port = process.env.PORT || 3000
app.set('view engine', 'hbs') 
const partialpath = path.join(__dirname, '../temp/partials')
hbs.registerPartials(partialpath)
const viewsDir = path.join(__dirname, '../temp/views')
app.set("views", viewsDir)   
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))
//Home Page
app.get('/', (reg, res) => {
    res.render('index', {
        title:"Home Page",
        desc:"Welcome To Home Page"
    })
})
//Check Weather
app.get('/check_weather' ,(req , res)=>{
    res.render('check_weather' ,{
        title:'Weather Page',
       country : 'egypt' ,
       latitude :29.8719034524 ,
       longtitude : 26.4941838299 ,
       curWeather: "Clear" ,
       temperature: 27
    })
})
//weather Page
app.get('/weather' ,(req , res)=>{
    res.render('weather' ,{
        message:"hello"   
    })
})
const geocode=require('./tools/geocode')
const forcast=require('./tools/forecast')
const request=require("request")
app.get('/hello',(req,res)=>{
    if(!req.query.address){
    return res.send({
        error:"you must enter value"
})
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
    }
    forcast(data.long,data.longd,(error,forcastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forcast:forcastData,
            location:req.query.address,
            lat: data.long,
            lon: data.longd
        })
    })
    })
})

app.get('*',(req,res)=>{
    res.send("404 page Not Found")
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
   