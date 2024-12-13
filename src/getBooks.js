const AWS = require("aws-sdk");

exports.getBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { BookID } = event.pathParameters;

  const result = await dynamodb
    .get({
      TableName: "BooksTable",
      Key: { BookID },
    })
    .promise();

  if (!result.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Libro no encontrado" }),
    };
  }


  return {
    statusCode: 200,
    body: JSON.stringify(result.Item), 
  };
};
