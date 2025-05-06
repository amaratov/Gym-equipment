const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { userId } = event.pathParameters;

  const params = {
    TableName: 'GymEquipment',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
  };

  try {
    const { Items } = await dynamodb.query(params).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,GET'
      },
      body: JSON.stringify(Items),
    };
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,GET'
      },
      body: JSON.stringify({ error: 'Could not fetch equipment' }),
    };
  }
};