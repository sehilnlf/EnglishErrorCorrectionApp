// const path = require('path');
// const express = require('express');
// const { engine, create } = require('express-handlebars');
// const morgan = require('morgan');
// // const db = require('./config/db'); // Commented out to remove Mongoose dependency
// const app = express();
// const port = 3002; // Changed port number

// // Middleware to handle data sent from the client
// app.use(express.urlencoded({ extended: true })); // Data sent as form
// app.use(express.json()); // Data sent as JSON

// app.use(express.static(path.join(__dirname, 'public')));

// // HTTP logger
// // app.use(morgan('combined'));

// // Create a Handlebars instance and register the helper
// const hbs = create({
//     extname: '.hbs',
//     helpers: {
//         eachInRange: function(n, context, options) {
//             let result = '';
//             for (let i = 0; i < n; i++) {
//                 result += options.fn(context[i]);
//             }
//             return result;
//         }
//     }
// });

// // Template engine
// app.engine('.hbs', hbs.engine);
// app.set('view engine', '.hbs');
// app.set('views', path.join(__dirname, 'resources', 'views'));

// // Route handlers
// app.get('/', (req, res) => {
//     return res.render('home',
//         {
//             noHeader: true,
//         }
//     );
// }); 

// app.get('/grammar', (req, res) => {
//     return res.render('grammar');
// }); 

// // Route để xử lý request POST từ form
// app.post('/submit', (req, res) => {
//     console.log(req.body);
//     const textToCorrect = req.body.textToCorrect;
//     // Xử lý dữ liệu textToCorrect ở đây
//     console.log(`Received text to correct: ${textToCorrect}`);
//     // Trả về phản hồi
//     res.render("grammar");
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`App listening on port http://localhost:${port}`);
// });

const path = require('path');
const express = require('express');
const { engine, create } = require('express-handlebars');
const morgan = require('morgan');
const app = express();
const port = 3002;

// Middleware để xử lý dữ liệu gửi từ client
app.use(express.urlencoded({ extended: true })); // Dữ liệu gửi dưới dạng form
app.use(express.json()); // Dữ liệu gửi dưới dạng JSON

app.use(express.static(path.join(__dirname, 'public')));

// Tạo một instance của Handlebars và đăng ký helper
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

// Thiết lập engine template là Handlebars
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route handlers
app.get('/', (req, res) => {
    return res.render('home', {
        noHeader: true,
    });
});

app.get('/grammar', (req, res) => {
    return res.render('grammar');
});

// Route để xử lý request POST từ form
app.post('/grammar', (req, res) => {
    const textToCorrect = req.body.textToCorrect;
    // Xử lý dữ liệu textToCorrect ở đây (ví dụ: lưu vào database, xử lý ngữ pháp,...)
    console.log(`Received text to correct: ${textToCorrect}`);
    // Sau khi xử lý, render lại trang grammar hoặc trang khác
    res.render('grammar', { correctedText: textToCorrect });
});

// Khởi động server
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
