exports.handler = function(event, context, callback) {
    const { file } = event.queryStringParameters;

    const response = {
        statusCode: 200,
        body: file
    };

    callback(response);
};
