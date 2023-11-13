export const localsMiddleware=(req,res,next)=>{
    console.log("middleware print");
    console.log("==========================================");
    console.log(req.session);
    console.log("==========================================");
    next();
}