
import {generateApi} from "./generate-api";
import {apiClients} from "./config";
import {Client} from "./_types";

apiClients.forEach((client:Client) => {
  generateApi(client)
})