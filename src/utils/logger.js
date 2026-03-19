const isDev = __DEV__;

const formatArgs = (prefix, args) => {
  const message = args
    .map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : `${arg}`))
    .join(' ');
  return `[${prefix}] ${message}`;
};

const logger = {
  info: (...args) => {
    if (!isDev) return;
    console.info(formatArgs('INFO', args));
  },
  warn: (...args) => {
    console.warn(formatArgs('WARN', args));
  },
  error: (...args) => {
    console.error(formatArgs('ERROR', args));
  },
  debug: (...args) => {
    if (!isDev) return;
    console.debug(formatArgs('DEBUG', args));
  },
  event: (name, data) => {
    if (!isDev) return;
    console.log(formatArgs('EVENT', [name, data]));
  },
};

export default logger;
