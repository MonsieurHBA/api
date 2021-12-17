 // user model
 const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')

 module.exports.signup_get = (req , res)=> {
    res.render('signup');
}
module.exports.login_get = (req , res)=> {
    res.render('login');
}
module.exports.signup_post = (req , res)=> {
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    
    
  
    if (errors.length > 0) {
      res.render('signup', {
        errors,
        name,
        email,
        password,
        password2
      });
      } else {
        // Validation passed
        User.findOne({ email: email})
        .then(user => {
          if(user) {
            // user exist
            errors.push({ msg: 'Email is already existed' })
            res.render('signup', {
              errors,
              name,
              email,
              password,
              password2
            });
          } else {
            {
        const newUser = new User({
          name,
          email,
          password
        });

      // Hash Password
      bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          //set password to hash
          newUser.password = hash;
          // savve user
          newUser.save()
              .then(user => {
                  res.redirect('/login')
              })
              .catch(err => console.log(err));
           }))  
         }
          }
        })
      }
  }

module.exports.login_post = (req , res , next )=> {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login', 
  })(req, res, next);
}