const cron = require('node-cron');
const importService = require('../services/importService');

cron.schedule('0 0 * * *', async () => {
    console.log('Importação de produtos iniciada...');
    try {
        await importService.importProducts();
        console.log('Importação de produtos finalizada com sucesso');
    } catch (error) {
        console.error('Erro ao importar produtos', error);
    }
});

module.exports = cron;
