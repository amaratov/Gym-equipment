const AWS = require('aws-sdk');
   const dynamodb = new AWS.DynamoDB.DocumentClient();

   exports.handler = async (event) => {
     const { userId, equipmentId } = event.pathParameters;

     const params = {
       TableName: 'GymEquipment',
       Key: { userId, equipmentId },
     };

     try {
       await dynamodb.delete(params).promise();
       return {
         statusCode: 200,
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers': 'Content-Type',
           'Access-Control-Allow-Methods': 'OPTIONS,DELETE'
         },
         body: JSON.stringify({ message: 'Equipment deleted' }),
       };
     } catch (error) {
       console.error('Error deleting equipment:', error);
       return {
         statusCode: 500,
         headers: {
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers': 'Content-Type',
           'Access-Control-Allow-Methods': 'OPTIONS,DELETE'
         },
         body: JSON.stringify({ error: 'Could not delete equipment' }),
       };
     }
   };