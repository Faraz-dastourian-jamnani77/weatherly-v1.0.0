
const request = require('request')
const weatherStats = (longitude,latitude,callback)=>{
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=6bb69c7b720920cf1e4a7c3f33a07141`


    request({url,json:true},(err,{body})=>{
             if(err){
                 callback('Unable to connect to the Service :(')
        
             }else if(body.message){
                 callback('Unable to find your location :(')
             }
             else{
                 callback(undefined,`It's ${body.main.temp} degrees out there and it has ${body.weather[0].description}
                 \n Hottest Temprature:${body.main.temp_max}\n Coolest Temprature:${body.main.temp_min}`)
             }    
         })



}



module.exports = weatherStats



