const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error')
const User = require('./models/user');





const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById("60468436e8457122881eba8a")
        .then(user => {
            
            req.user = user;
            next()
        })
       .catch(err => console.log(err));
    
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect('mongodb://127.0.0.1:27017/shop', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    User.findOne().then(user => {
        if(!user) {
            const user = new User({
                name: 'John Doe',
                email: 'Johndoe@gmail.com',
                cart: {
                    items: []
                }
            })

            user.save()
        }
    })
    
    

    
    app.listen(3000, () => console.log('Server is listening at port 3000'));
})
.catch(err => {
    console.log(err);
})


