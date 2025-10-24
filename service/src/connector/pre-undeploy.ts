import dotenv from 'dotenv';
dotenv.config();

import { CommercetoolsClient } from 'tiktok-integration-shared';
import { assertError } from '../utils/assert.utils';
import { deleteCartUpdateExtension } from './actions';
import { Utils } from 'tiktok-integration-shared';

async function preUndeploy(): Promise<void> {
  const apiRoot = CommercetoolsClient.createApiRoot(Utils.readConfiguration());
  await deleteCartUpdateExtension(apiRoot);
}

async function run(): Promise<void> {
  try {
    await preUndeploy();
  } catch (error) {
    assertError(error);
    process.stderr.write(`Pre-undeploy failed: ${error.message}`);
    process.exitCode = 1;
  }
}

run();
