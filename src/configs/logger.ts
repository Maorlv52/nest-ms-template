import { createLogger, format, transports } from 'winston';
import type { Logger } from 'winston';

const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      (info): string =>
        `[${String(info.timestamp)}] [${String(info.level).toUpperCase()}] ${String(info.message)}`,
    ),
  ),
  transports: [new transports.Console()],
});

export default logger;
