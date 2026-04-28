const csrf = require('csurf'); // [cite: 30]
const cookieParser = require('cookie-parser');

app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
  // Pass the token to the view [cite: 30]
  res.render('send', { csrfToken: req.csrfToken() });
});