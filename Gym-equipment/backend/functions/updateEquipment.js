const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const { userId, equipmentId } = event.pathParameters;
  const { name, type, status } = JSON.parse(event.body);
  const lastUpdated = new Date().toISOString();

  const params = {
    TableName: 'GymEquipment',
    Key: { userId, equipmentId },
    UpdateExpression: 'set #name = :name, #type = :type, #status = :status, lastUpdated = :lastUpdated',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#type': 'type',
      '#status': 'status',
    },
    ExpressionAttributeValues: {
      ':name': name,
      ':type': type,
      ':status': status,
      ':lastUpdated': lastUpdated,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const { Attributes } = await dynamodb.update(params).promise();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,PUT'
      },
      body: JSON.stringify(Attributes),
    };
  } catch (error) {
    console.error('Error updating equipment:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,PUT'
      },
      body: JSON.stringify({ error: 'Could not update equipment' }),
    };
  }
};