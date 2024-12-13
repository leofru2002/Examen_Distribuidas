const AWS = require("aws-sdk");

exports.updateBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { BookID } = event.pathParameters;
  const { title, author, description } = JSON.parse(event.body);

  await dynamodb
    .update({
      TableName: "BooksTable",
      Key: { BookID },
      UpdateExpression:
        "set title = :title, author = :author, description = :description",
      ExpressionAttributeValues: {
        ":title": title,
        ":author": author,
        ":description": description,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Libro actualizado satisfactoriamente",
    }),
  };
}; 