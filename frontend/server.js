const express = require('express');
const app = express();

app.set('view engine','pug');
app.use(express.static('frontend/css'));
app.use(express.static('frontend/js'));
app.use(express.static('build/contracts'));

app.get('/', (req, res) => {        
    res.render('index', {
        title: "ACADEMIA TOKEN ICO",
        message: "ACADEMIA TOKEN ICO SALE"
    });
});

app.listen(3000, () => console.log("App is listening on port 3000"));