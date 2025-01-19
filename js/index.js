const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();

// Initialize WhatsApp client
const client = new Client({
authStrategy: new LocalAuth(),
puppeteer: {
args: ['--no-sandbox']
}
});

// Collaborator numbers (add your actual collaborator numbers here)
const collaborators = [
{ number: '244954323757@c.us', busy: false },
{ number: '330772026889@c.us', busy: false },
{ number: '244948925827@c.us', busy: false }
];

// Store ongoing transactions
const transactions = new Map();

// Generate QR code for WhatsApp Web authentication
client.on('qr', (qr) => {
qrcode.generate(qr, { small: true });
console.log('QR Code generated. Scan it with WhatsApp to authenticate.');
});

client.on('ready', () => {
console.log('WhatsApp bot is ready!');
});

// Handle incoming messages
client.on('message', async (message) => {
if (message.body.toLowerCase() === 'sim' || message.body.toLowerCase() === 'yes') {
const collaborator = collaborators.find(c => c.number === message.from);
if (collaborator) {
const transaction = transactions.get(message.from);
if (transaction) {
collaborator.busy = true;
await client.sendMessage(transaction.customerNumber,
'Um colaborador aceitou sua solicitação e entrará em contato em breve.');
await client.sendMessage(message.from,
`Detalhes da transação:\n${transaction.details}`);
transactions.delete(message.from);
}
}
} else if (message.body.toLowerCase() === 'não' || message.body.toLowerCase() === 'no') {
const transaction = transactions.get(message.from);
if (transaction) {
transactions.delete(message.from);
findNextAvailableCollaborator(transaction);
}
}
});

// Express endpoint to handle new transaction requests
app.post('/api/transaction', express.json(), async (req, res) => {
const { customerNumber, payAmount, receiveAmount, currency } = req.body;

const transactionDetails = {
customerNumber,
details: `Nova transação:\nPagar: ${payAmount} ${currency.from}\nReceber: ${receiveAmount} ${currency.to}`,
timestamp: new Date()
};

const success = await findNextAvailableCollaborator(transactionDetails);

if (success) {
res.json({ status: 'success', message: 'Procurando colaborador disponível...' });
} else {
res.json({ status: 'error', message: 'Nenhum colaborador disponível no momento.' });
}
});

async function findNextAvailableCollaborator(transaction) {
const availableCollaborator = collaborators.find(c => !c.busy);

if (availableCollaborator) {
transactions.set(availableCollaborator.number, transaction);
await client.sendMessage(availableCollaborator.number,
'Nova solicitação de câmbio. Você está disponível? (Responda com Sim ou Não)');
return true;
}

await client.sendMessage(transaction.customerNumber,
'Desculpe, não há colaboradores disponíveis no momento. Por favor, tente novamente mais tarde.');
return false;
}

// Initialize WhatsApp client and start server
client.initialize();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
