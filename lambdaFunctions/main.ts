const AWS = require("aws-sdk");
const secretsManager = new AWS.SecretsManager();
exports.handler = async (event:any) => {
    let sm = await secretsManager.getSecretValue({ SecretId: 'secrate ID'}).promise();
    let credentials = JSON.parse(sm.SecretString);
    console.log(credentials);
}