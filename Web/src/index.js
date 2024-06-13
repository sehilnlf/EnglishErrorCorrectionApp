const path = require('path');
const express = require('express');
const { engine, create } = require('express-handlebars');
const morgan = require('morgan');
// const db = require('./config/db'); // Commented out to remove Mongoose dependency
const app = express();
const port = 3002; // Changed port number

// Middleware to handle data sent from the client
app.use(express.urlencoded({ extended: true })); // Data sent as form
app.use(express.json()); // Data sent as JSON

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
// app.use(morgan('combined'));

// Create a Handlebars instance and register the helper
const hbs = create({
    extname: '.hbs',
    helpers: {
        eachInRange: function(n, context, options) {
            let result = '';
            for (let i = 0; i < n; i++) {
                result += options.fn(context[i]);
            }
            return result;
        }
    }
});

// Template engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route handlers
app.get('/', (req, res) => {
    return res.render('home',
        {
            noHeader: true,
        }
    );
}); 


// Start the server
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
