import pino from 'pino';

const logger = pino({
  level: 'info', // Nivel de log (info, debug, error, etc.)
  transport: {
    target: 'pino-pretty', // Opcional: para logs legibles en consola
    options: {
      colorize: true,
    },
  },
});

export default logger;