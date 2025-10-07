export namespace ENVIRONMENT {
  export enum VARIABLE {
    PORT = 'PORT',
    API_PREFIX = 'API_PREFIX',
    BD_HOST = 'BD_HOST',
    BD_NAME = 'BD_NAME',
    BD_PORT = 'BD_PORT',
    BD_USERNAME = 'BD_USERNAME',
    BD_PASSWORD = 'BD_PASSWORD',
    REDIS_URL = 'REDIS_URL',
    CACHE_STORE = 'CACHE_STORE',
    CACHE_GLOBAL = 'CACHE_GLOBAL',
    CACHE_TTL = 'CACHE_TTL',
    KAFKA_BROKER = 'KAFKA_BROKER',
  }
  export enum VALUE {
    TEST = 'TEST',
    PROD = 'PROD',
  }
}
