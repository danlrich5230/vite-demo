const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;
const cors = require('cors');

// Set up CORS options
const corsOptions = {
    origin: 'https://literate-space-bassoon-w6467jvx545hv5vq-5173.app.github.dev/chat-with-jefferson',
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Express server is running!');
});

const OPENAI_API_KEY = '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'; // Store securely



app.post('/ask-jefferson', async (req, res) => {
    const userMessage = req.body.message;

    const payload = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "Please respond as Thomas Jefferson..."
                // Rest of the system message
            },
            {
                role: "user",
                content: userMessage
            }
        ]
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });
        console.log("OpenAI Response:", response.data);

        const jeffersonReply = response.data.choices[0].message.content;
        res.json({ reply: jeffersonReply });

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
