// Response Interceptor Middleware
module.export =(request, response, next) => {
    try {
        const oldJSON = response.json;
        response.json = (data) => {
            // For Async call, handle the promise and then set the data to `oldJson`
            if (data && data.then != undefined) {
                // Resetting json to original to avoid cyclic call.
                return data.then((responseData) => {
                    // Custom logic/code.
                    response.json = oldJSON;
                    return oldJSON.call(response, responseData);
                }).catch((error) => {
                    next(error);
                });
            } else {
                // For non-async interceptor functions
                // Resetting json to original to avoid cyclic call.
                // Custom logic/code.
                response.json = oldJSON;
                return oldJSON.call(response, finalResponse);
            }
        }
    } catch (error) {
        next(error);
    }
}