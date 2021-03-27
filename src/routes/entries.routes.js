const {Router} = require('express');
const router = Router();
const passport = require('passport');
const {renderIndex, getAllUsers, getUser, getUserFavs, renderMyAccount, createAccount, renderSignIn, renderProfile, logout, isAuthenticated} = require('../controllers/entries.controller');

router.get('/', renderIndex);
router.get('/api/users', getAllUsers);
router.get('/api/user/:id', getUser);
router.get('/api/userFavs/:id', getUserFavs);
router.get('/signUp', renderMyAccount);
router.post('/signUp', createAccount);
router.get('/signIn', renderSignIn);
router.post('/signIn', passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signIn',
    passReqToCallback: true
  }));
router.get('/profile', isAuthenticated, renderProfile);
router.get('/logout', logout);

module.exports = router;