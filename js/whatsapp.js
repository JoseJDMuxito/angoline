async function handleTransaction(payAmount, receiveAmount, isEuroToKwanza) {
  const customerNumber = prompt('Por favor, insira seu número de WhatsApp (com código do país):');
  if (!customerNumber) return;

  const formattedNumber = customerNumber.replace(/\D/g, '');

  try {
    const response = await fetch('/api/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerNumber: `${formattedNumber}@c.us`,
        payAmount,
        receiveAmount,
        currency: {
          from: isEuroToKwanza ? 'EUR' : 'AOA',
          to: isEuroToKwanza ? 'AOA' : 'EUR'
        }
      })
    });

    const result = await response.json();
    alert(result.message);
  } catch (error) {
    console.error('Error:', error);
    alert('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
  }
}
