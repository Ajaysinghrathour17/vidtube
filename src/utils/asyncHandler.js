const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        // Call the requestHandler and handle any errors
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err)); // Pass any errors to the next middleware
    }
};

export  {asyncHandler};