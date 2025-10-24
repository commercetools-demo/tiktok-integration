import dotenv from 'dotenv';
dotenv.config();

import { CommercetoolsClient } from 'tiktok-integration-shared';
import { assertError } from '../utils/assert.utils';
import { deleteCustomerCreateSubscription } from './actions';
import { readConfiguration } from '../utils/config.utils';

async function preUndeploy(): Promise<void> {
  const apiRoot = CommercetoolsClient.createApiRoot(readConfiguration());
  await deleteCustomerCreateSubscription(apiRoot);
}

async function run(): Promise<void> {
  try {
    await preUndeploy();
  } catch (error) {
    assertError(error);
    process.stderr.write(`Post-undeploy failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}

run();
