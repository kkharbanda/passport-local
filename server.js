const express = require("express")
const userModel = require("./models");

var passport = require("passport")
const {initailizingPassport,isauthenticate} = require("./passportConfig");
const expressSession = require("express-session");
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended :false}))
initailizingPassport(passport)
app.use(expressSession({ secret:"secrey",resave :false,saveUninitialized:false}));
app.use(passport.initialize());

app.use(passport.session());



app.set('view engine', 'ejs')
app.get('/register', (req, res) => {
    res.render('register')
})
app.get('/login', (req, res) => {
  res.render('login')
})
app.post("/register", async (request, response) => {
    const user = new userModel(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});
app.post('/login', passport.authenticate("local"),async (req,res)=>{
  res.redirect('/');
});
  // app.post('/login', (req,res)=>{
  //   res.send(req.body);
  // })

  app.get('/logout', (req, res, next) =>{
   req.logout()
    res.redirect('/');
  });
  app.get("/" ,isauthenticate ,(req,res)=>{
    res.send("test webb");
  })
  
  app.get("/profile" ,isauthenticate ,(req,res)=>{
    console.log(res.user)
    res.send(req.user)
  })
app.listen(3000,()=>
console.log(`server working on port `))