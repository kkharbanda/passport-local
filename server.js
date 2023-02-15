const express = require("express")
const userModel = require("./models");
const app = express();
app.use(express.json());
app.set('view engine', 'ejs')
app.get('/register', (req, res) => {
    res.render('register')
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
app.listen(4000,()=>
console.log(`server working on port `))