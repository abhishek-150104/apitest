
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow requests from frontend
app.use(express.json());

app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];
    const user_id = "abhishekkumarshrivastav_15012004";
    const email = "abhishek@gmail.com";
    const roll_number = "22BCS16819";

    const numbers = data.filter(item => !isNaN(Number(item)));
    const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
    const highest_alphabet = alphabets.length > 0 ? [alphabets.reduce((a, b) => (a > b ? a : b))] : [];

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_alphabet,
        data
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
