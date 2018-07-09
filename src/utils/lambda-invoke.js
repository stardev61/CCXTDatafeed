import AWS from 'aws-sdk';

const lambda = new AWS.Lambda({
  region: 'us-east-2'
});

export default function invoke(functionName, payload) {
  const params = {
    FunctionName: functionName,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(payload)
  };

  return lambda.invoke(params).promise();
}
