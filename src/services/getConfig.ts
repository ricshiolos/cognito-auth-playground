
import axios from 'axios';

export type ErrorType = {
  message?: "string";
  code?: Number;
}

export type ConfigResponse = {
  appId?: "string";
  tenantId?: "string";
  xApiKey?: "string";
  environment?: "DEV" | "STAGING" | "PRODUCTION";
  error?: ErrorType;
} | null;

export const getConfig = ():Promise<ConfigResponse> => {
  return new Promise((resolve, reject) => {
    axios.get('/config.json')
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject({
          error: {
            code: error.request.status,
            message: 'There was an error loading the configuration file.'
          }
        })
      })
  })
}