import { createLogger, format, transports } from 'winston';

const config = {
  levels: {
    success: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7,
    emerg: 8,
  },
  colors: {
    success: 'green',
  },
};

export const logger = createLogger({
  transports: [new transports.Console()],
  levels: config.levels,
  format: format.combine(
    format.colorize({
      colors: config.colors,
    }),
    format.splat(),
    format.simple()
  ),
});
