const express = require('express');
const cors = require('cors');

const app = express();

// Configura CORS per consentire l'accesso da localhost:4200
app.use(cors({
    origin: '*', // Specifica l'origine
    methods: ['POST', 'GET', 'OPTIONS','HEAD','PUT'], // Metodi consentiti
    allowedHeaders: ['Origin', 'X-Requested-With','Content-Type'], // Intestazioni consentite
    credentials: true // Permetti l'invio di cookie o credenziali
}));

// Middleware per il parsing del body
app.use(express.json()); // Per body JSON

// Route POST per /test
app.get('/listDirFile', (req, res) => {
    const body = req.body; // Accedi al body della richiesta
	
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, 
			
    res.status(200).send(`Received: ${JSON.stringify(body)}`);
});

// Avvia il server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
