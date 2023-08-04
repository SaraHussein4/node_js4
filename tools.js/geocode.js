const request=require("request")
const address=(address,callback)=>{
const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'  +address+ '.json?access_token=pk.eyJ1IjoiZGluYWFobWVkLSIsImEiOiJjbGtoNmVnYjUwNndvM3JvNHo3b2QyYjV2In0.IFsbxm_jgRJotA14w9GSjg'
   request({url:geocodeurl,json:true},(error,response)=>{

    //low level error
    if (error){
callback("unable",undefined)
    }
    else if(response.body.message){

callback(response.body.message,undefined)
    }
    else if(response.body.features.length==0){
        callback("unable location",undefined)
    }
   
    else{
        callback(undefined,{  long:response.body.features[0].center[0],
             longd:response.body.features[0].center[1]

        })
        
    }

   })
}
module.exports=
    address
