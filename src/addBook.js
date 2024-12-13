const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.addBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { title, author, description } = JSON.parse(event.body);
  const BookID = v4();

  const newBook = {
    BookID,
    title,
    author,
    description,
  };

  await dynamodb
    .put({
      TableName: "BooksTable",
      Item: newBook,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newBook), 
  };
};
