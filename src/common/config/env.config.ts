// Crearemos una función que mapeará las variables de entorno
export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3002,
  defaultLimit: +process.env.DEFAULT_LIMIT || 7,
});
// esta función lo que devulve es un objeto con nuestras variables de entorno mapeadas
// nuestra app utilizará este archivo para validar las variables de entorno
// esto se configura en nuestro appendFile.module dentro del ConfigModule.forRoot dentro de un objeto
