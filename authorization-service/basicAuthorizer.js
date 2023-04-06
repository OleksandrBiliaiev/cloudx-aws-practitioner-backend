export const basicAuthorizer = async (event) => {

  const generatePolicyDocument = (effect, resource) =>{
    return {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }]
    }
  }
  const principalId = 'test';
  const generateResponse = (principalId, effect, resource) => {
    return {principalId, policyDocument: generatePolicyDocument(effect, resource)}
  };

  try {
    console.log('event:', event); 
    const { authorizationToken, methodArn } = event;
    const credentials = Buffer.from(authorizationToken.replace('Basic ', ''), 'base64').toString().split('=');
    const response = credentials[1] === process.env.TEST_USER_NAME 
      ? generateResponse(principalId, 'Allow', methodArn)
      : generateResponse(principalId, 'Deny', methodArn);
    return response;
  } catch (error) {
    console.error(error);
    const response = {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(error),
    };
    return response;
  }

};