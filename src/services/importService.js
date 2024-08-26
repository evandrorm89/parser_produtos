const axios = require('axios');
const zlib = require('zlib');
const Product = require('../models/product');

const importProducts = async () => {
    const baseUrl = process.env.baseUrl || 'https://challenges.coode.sh/food/data/json';
    const indexFileUrl = `${baseUrl}/index.txt`;

    try {
        const response = await axios.get(indexFileUrl);
        const fileNames = response.data.trim().split('\n');

        for (const fileName of fileNames) {
            const fileUrl = `${baseUrl}/${fileName.trim()}`;
            console.log('Baixando e processando o arquivo:', fileUrl);

            const response = await axios({
                url: fileUrl,
                method: 'GET',
                responseType: 'stream',
            });

            const gunzipStream = zlib.createGunzip();
            let jsonBuffer = '';
            let productCount = 0;

            await new Promise((resolve, reject) => {
                response.data
                    .pipe(gunzipStream)
                    .on('data', async (chunk) => {
                        jsonBuffer += chunk.toString();
                        let startIndex = 0;
                        while (true) {
                            const endIndex = jsonBuffer.indexOf('}', startIndex);
                            if (endIndex === -1) break;

                            const jsonStr = jsonBuffer.slice(startIndex, endIndex + 1);
                            startIndex = endIndex + 1;

                            try {
                                const productData = JSON.parse(jsonStr);
                                productData.imported_t = new Date();
                                productData.status = 'draft';

                                if (typeof productData.code === 'string') {
                                    productData.code = productData.code.replace(/"/g, '');
                                    productData.code = parseInt(productData.code, 10);
                                }

                                if (typeof productData.created_t === 'string') {
                                    productData.created_t = productData.created_t.replace(/"/g, '');
                                    productData.created_t = parseInt(productData.created_t, 10);
                                }

                                if (typeof productData.last_modified_t === 'string') {
                                    productData.last_modified_t = productData.last_modified_t.replace(/"/g, '');
                                    productData.last_modified_t = parseInt(productData.last_modified_t, 10);
                                }

                                if (typeof productData.nutriscore_score === 'string') {
                                    productData.nutriscore_score = productData.nutriscore_score.replace(/"/g, '');
                                    productData.nutriscore_score = parseInt(productData.nutriscore_score, 10);
                                    if (isNaN(productData.nutriscore_score)) {
                                        productData.nutriscore_score = null;
                                    }
                                }

                                const result = await Product.findOneAndUpdate(
                                    { code: productData.code },
                                    productData,
                                    { upsert: true, new: true, setDefaultsOnInsert: true }
                                );
                                console.log(`Produto ${result.code} ${result.isNew ? 'criado' : 'atualizado'}`);
                                productCount++;
                                if (productCount >= 100) {
                                    gunzipStream.pause();
                                    response.data.unpipe(gunzipStream);
                                    resolve();
                                    return;
                                }
                            } catch (error) {
                                if (error.code === 11000) {
                                    console.log(`Produto com código duplicado: ${productData.code}. Pulando..`);
                                } else {
                                    console.error('Erro processando produto:', error);
                                    console.error('Produto:', jsonStr);
                                }
                            }
                        }
                        jsonBuffer = jsonBuffer.slice(startIndex);
                    })
                    .on('end', () => {
                        console.log(`${fileName} processado com sucesso.`);
                        resolve();
                    })
                    .on('error', (error) => {
                        console.error('Erro ao processar o arquivo:', error);
                        reject(error);
                    });
            });

            break; // Remover esta linha para importar todos os arquivos
        }

        console.log('Importação de produtos finalizada com sucesso');

    } catch (error) {
        console.error('Erro ao importar produtos:', error);
        throw error; // Repassar o erro a ser tratado no controller no cron.js
    }
};

module.exports = {
    importProducts,
};
