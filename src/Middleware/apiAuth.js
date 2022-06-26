const {errorResponseWithoutData}=require('../Helper/Responce')


module.exports = {

    isAuthenticRequest : async (req,res,next) =>{
        
        console.log(" in to the middlewaree");
        
        // console.log("reqc:: ", req);

        if(req.headers['x-api-key'] === 'eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MTM2NTkwMzMsImV4cCI6MTU0NTE5NTAzMywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IndlYiIsIlN1cm5hbWUiOiJXRUIiLCJFbWFpbCI6IndlYkBleGFtcGxlLmNvbSJ9'){
            next();
        } 
        else{
            errorResponseWithoutData(res,'Access denied x-api-key needed , or wrong api key',401)
        }
    
    }

}