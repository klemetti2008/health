// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from "dotenv";
import process from 'process';
import {Client} from "./_types";
import {getEnvFile} from "./getEnvFile";

export const BASE_OUTPUT_PATH = "src/_requests"

const envFile = getEnvFile();
dotenv.config({path: envFile});
console.log(process.env.NEXT_PUBLIC_MAJA_OPENAPI_SCHEMA);

export const apiClients: Client[] = [
  {
    name: "SSOClient",
    inputPath: process.env.NEXT_PUBLIC_SSO_OPENAPI_SCHEMA as string,
  },
  {
    name: "MajaClient",
    inputPath: process.env.NEXT_PUBLIC_MAJA_OPENAPI_SCHEMA as string,
  },
  // {
  //   name: "HeadquartersClient",
  //   inputPath: process.env.NEXT_PUBLIC_HEADQUARTERS_OPENAPI_SCHEMA as string,
  // },
]