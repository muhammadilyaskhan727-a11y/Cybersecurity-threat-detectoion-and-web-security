const express = require('express');
const rateLimit = require('express-rate-limit'); // [cite: 11]
const helmet = require('helmet'); // For CSP and HSTS [cite: 15, 16]
const cors = require('cors'); // [cite: 12]

const app = express();

// 1. Rate Limiting [cite: 11, 17]
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later."
});
app.use('/api/', limiter);

// 2. Security Headers (HSTS & CSP) [cite: 15, 16, 18]
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "trusted-scripts.com"],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true }
}));

// 3. CORS Configuration [cite: 12]
app.use(cors({
  origin: 'https://your-trusted-frontend.com',
  methods: ['GET', 'POST']
}));

app.listen(3000, () => console.log('Secured API running on port 3000'));