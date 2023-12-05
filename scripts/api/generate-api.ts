// eslint-disable-next-line import/no-extraneous-dependencies
import {generate} from 'openapi-typescript-codegen';

import path from "path";
import {Client} from "./_types";
import {BASE_OUTPUT_PATH} from "./config";

async function generateApi(client: Client) {
  const {inputPath, name: clientName} = client
  const outputPath = `${BASE_OUTPUT_PATH}/${clientName.replace('Client', '')}`

  if (!inputPath || !outputPath) {
    console.error('Missing environment variables: OPENAPI_INPUT or OPENAPI_OUTPUT.');
    process.exit(1);
  }

  try {
    await generate({
      input: inputPath,
      output: outputPath,
      clientName,
      httpClient: 'axios',
      request: path.join(__dirname, "request.ts"),
    });
    console.log('API generated successfully for client: ', clientName, ' at path: ', outputPath, ' from schema: ', inputPath);
  } catch (error) {
    console.error('Error generating API:', error);
    process.exit(1);
  }
}

export {
  generateApi,
}