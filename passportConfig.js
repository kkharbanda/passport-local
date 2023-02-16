const LocalStrategy = require("passport-local").Strategy;

const userModel = require("./models");
exports.initailizingPassport = (passport)=>{
    passport.use(new LocalStrategy(
        async (username, password, done) =>{
            const user = await userModel.find({username}); 
            console.log(user)
            if (!user) { return done(null, false); }
    
                return done(null, user);   
                     

        }
      ));


passport.serializeUser(function(user, done) { done(null, user) })

passport.deserializeUser( async (id,done)=>{
    try {
      const user = await userModel.findById(id);
      done(null,user);  
    } catch (error) {
        done(error,false);
    }
});
}
 exports.isauthenticate = (req,res,next)=>{
    if(req.user) return next();
    res.redirect("/login");
 }