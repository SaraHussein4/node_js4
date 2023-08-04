const request=require("request")

const forcast=(long,longd,callback)=>{
 const url = "https://api.weatherapi.com/v1/current.json?key=7f97e74ef23b418c97a155211230503&q="
 + long +"," +longd
 request({url,json:true},(error,response)=>{

 if (error){
     callback("unable to contact" ,undefined)
 }else if(response.body.error){
     callback(response.body.error.message,undefined)
 }
 else{

     callback(undefined,response.body.location.name+" it is" +response.body.current.condition.text+"it is "+response.body.current.temp_c+" °C")
 }

})
}

module.exports= forcast
