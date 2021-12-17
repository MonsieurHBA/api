const { Router } = require('express')  // Router from ExpressJs
const authController = require('../Controller/authController')
const router = Router();

router.get('/signup' , authController.signup_get );
router.post('/signup' , authController.signup_post);
router.get('/login' , authController.login_get);
router.post('/login' , authController.login_post);
router.get('/dashboard' , (req , res) => res.render('dashboard' , { name: req.user.name}))
// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });


module.exports = router ;