const path = require('path');
const express = require('express');
const { engine, create } = require('express-handlebars');
const { exec } = require('child_process');
const morgan = require('morgan');
const request = require('request'); // Thư viện requests đã được cài đặt

const app = express();
const port = 3002;

// Đường dẫn đầy đủ đến tệp thực thi Python của bạn
const pythonPath = 'C:\\Users\\Administrator\\AppData\\Local\\Programs\\Python\\Python310\\python.exe';
// Đường dẫn đầy đủ đến tệp `spelling_check.py`
const scriptPath = path.join(__dirname, 'spelling_check.py');

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

// request api từ hugging face
const API_URL = "https://api-inference.huggingface.co/models/sehilnlf/model_v6";
const API_TOKEN = "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"; // Thay bằng token thực tế của bạn




// Route handlers
app.get('/', (req, res) => {
    return res.render('home', {
        noHeader: true,
    });
});

// typing
app.get('/typing', (req, res) => {
    return res.render('typing');
});

// Route for spelling check
app.post('/typing', (req, res) => {
    const text = req.body.textToCorrect;
    const command = `${pythonPath} ${scriptPath} "${text}"`;

    exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(stderr);
        }

        // Parse stdout as JSON (assuming stdout is a JSON string)
        let suggestions = [];
        try {
            suggestions = JSON.parse(stdout);
        } catch (err) {
            console.error(`Error parsing JSON: ${err}`);
            return res.status(500).send('Error parsing JSON response');
        }

        console.log('Suggestions:', suggestions);

        // Render typing.hbs again with suggestions
        res.render('typing', { 
            textToCorrect: text,
            suggestions: suggestions 
        });
    });
});


// grammar
app.get('/grammar', (req, res) => {
    return res.render('grammar');
});

// Route để xử lý request POST từ form
app.post('/grammar', (req, res) => {
    const textToCorrect = req.body.textToCorrect;

    // Xử lý dữ liệu textToCorrect ở đây (ví dụ: lưu vào database, xử lý ngữ pháp,...)
    console.log(`Received text to correct: ${textToCorrect}`);
    
    // Tạo payload để gửi tới API của Hugging Face
    const payload = {
        inputs: textToCorrect
    };

    // Tạo options cho request
    const options = {
        url: API_URL,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        json: payload
    };

    // Gửi request tới API của Hugging Face
    request(options, (error, response, body) => {
        if (error) {
            console.error('Error:', error);
            response.status(500).send('Error occurred while querying model');
        } else {
            console.log('API Response:', body);
            // res.status(200).send(body); // Trả về kết quả từ API cho client
            // // Sau khi xử lý, render lại trang grammar hoặc trang khác
            res.render('grammar', {
                textToCorrect: textToCorrect, 
                generated_text: body[0].generated_text 
            });
        }
    });

    

});


// Khởi động server
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
