//HÄR skapar vi en egen klass som vi ärver ifrån ERROR precis som i OOP

class ServerError extends Error {
  constructor(statusCode, message) {
    //super anropar superklassen i error som vi vet skickar ett medelande
    super(message);
    //Detta blir denna statuscoden som skickas in
    this.statusCode = statusCode;
  }
}

const errorRequestHandler = (error, req, res, next) => {
  // Log error for dev purposes
  console.error(req.method, req.path, error);

  if (res.writableEnded) {
    return console.error(
      "Response has been sent even though there was an error..."
    );
  }

  // Mongoose validation error
  if (error instanceof MongooseError.StrictModeError) {
    return res.status(400).json(error.message);
  }

  // Mongoose validation error
  if (error instanceof MongooseError.ValidationError) {
    return res.status(400).json(error.message);
  }

  // HTTP error
  if (error instanceof HttpError) {
    return res.status(error.status).json(error.message);
  }

  // Express or own error
  if (error instanceof Error) {
    let status = error.status || error.statusCode || 500;
    return res.status(status).json(error.message);
  }

  // Unknown server error
  return res.status(500).json("Unknown server error");
};
/** Can be used to throw http errors with a specified status code */
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
//MÅSTE exporteras vi har ärvt och lagt till en statuskod
//Denna måste importaras i app.js
module.exports = { ServerError, errorRequestHandler, HttpError };
