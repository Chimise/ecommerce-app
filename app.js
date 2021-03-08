const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error')
const User = require('./models/user');
let userId;

const mongoConnect = require('./util/database').mongoConnect;


const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById("6043e5cf28819f20b4a14df2")
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next()
        })
       .catch(err => console.log(err));
    
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect( () => {
    app.listen(3000, () => {
    console.log('Server running on port 3000')
})

})


