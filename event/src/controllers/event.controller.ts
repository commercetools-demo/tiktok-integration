import { Request, Response } from 'express';
import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { resourceCreation } from './resource-creation.controller';

/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (request: Request, response: Response) => {
  let customerId = undefined;

  // Check request body
  if (!request.body) {
    logger.error('Missing request body.');
    throw new CustomError(400, 'Bad request: No Pub/Sub message was received');
  }

  // Check if the body comes in a message
  if (!request.body.message) {
    logger.error('Missing body message');
    throw new CustomError(400, 'Bad request: Wrong No Pub/Sub message format');
  }

  // Receive the Pub/Sub message
  const pubSubMessage = request.body.message;

  // For our example we will use the customer id as a var
  // and the query the commercetools sdk with that info
  const decodedData = pubSubMessage.data
    ? Buffer.from(pubSubMessage.data, 'base64').toString().trim()
    : undefined;

  try {
    if (decodedData) {
      const jsonData = JSON.parse(decodedData);
      //CoCo sending message to indicate the resource was created, does not need processing
      console.log('Event message received');
      console.log(JSON.stringify(jsonData, null, 2));
      switch (jsonData.notificationType) {
        case 'ResourceCreated':
          await resourceCreation(jsonData);
          break;
        case 'ResourceUpdated':
          console.log('Resource updated');
          break;
        case 'ResourceDeleted':
          console.log('Resource deleted');
          console.log('Resource created');
      }
    }
  } catch (error) {
    logger.error('Error processing event', error);
    throw error;
  }

  // Return the response for the client
  response.status(204).send();
};
