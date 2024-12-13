const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.listBooks = async (event) => {
  const params = {
    TableName: 'BooksTable'
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    return {
        statusCode: 500,
      body: JSON.stringify({ error: 'No hay libro existentes' })
    };
  }
};