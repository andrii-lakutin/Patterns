function BadLogger(name) {  
    this.name = name;
    var LOG_HEADER = '[' + name + ']:';
    var self = this;

    return {
        getName: function getName() {
            return self.name;
        },
        getType: function getType() {
            return 'BadLogger';
        },
        information: function information(message) {
            console.info(LOG_HEADER + message + '- INFORMATION' );
        },
        debg: function debg(message) {
            console.log(LOG_HEADER + message + '- DEBG');
        },
        w: function w(message) {
            console.warn(LOG_HEADER + message + '- W' );
        },
        err: function err(message) {
            console.error(LOG_HEADER + message+ '- ERR' );
        }
    }
}

function ShortLogger(name) {  
    this.name = name;
    var LOG_HEADER = '[' + name + ']';
    var self = this;
    var getTime = function() {
        return '[' + new Date().toISOString() + ']';
    }
    return {
        getName: function getName() {
            return self.name;
        },
        getType: function getType() {
            return 'ShortLogger';
        },
        i: function i(message) {
            console.info(LOG_HEADER + getTime() + '[I]: ' + message);
        },
        d: function d(message) {
            console.log(LOG_HEADER + getTime() + '[D]: ' + message);
        },
        w: function w(message) {
            console.warn(LOG_HEADER + getTime() + '[W]: ' + message);
        },
        e: function e(message) {
            console.error(LOG_HEADER + getTime() + '[E]: ' + message);
        }
    }
}

function LoggerAdapter(loggerObj) {  
    if (!loggerObj) {
        throw Error('Parameter [loggerObj] is not defined.');
    }
    console.log('[LoggerAdapter] is using Logger with name: ' + loggerObj.getName());
    var CONSTANTS = {
        DEBUG: 'DEBUG',
        WARNING: 'WARNING',
        INFORMATION: 'INFORMATION',
        ERROR: 'ERROR',
        BAD_LOGGER: 'BadLogger',
        SHORT_LOGGER: 'ShortLogger'
    };
    var loggerFunctionMapper = {};

    if(loggerObj.getType() === CONSTANTS.BAD_LOGGER) {
        loggerFunctionMapper[CONSTANTS.DEBUG] = loggerObj.debg;
        loggerFunctionMapper[CONSTANTS.INFORMATION] = loggerObj.information;
        loggerFunctionMapper[CONSTANTS.WARNING] = loggerObj.w;
        loggerFunctionMapper[CONSTANTS.ERROR] = loggerObj.err;
    }
    else if (loggerObj.getType() === CONSTANTS.SHORT_LOGGER) {
        loggerFunctionMapper[CONSTANTS.DEBUG] = loggerObj.d;
        loggerFunctionMapper[CONSTANTS.INFORMATION] = loggerObj.i;
        loggerFunctionMapper[CONSTANTS.WARNING] = loggerObj.w;
        loggerFunctionMapper[CONSTANTS.ERROR] = loggerObj.e;
    }

    function information(message) {
        try {
          loggerFunctionMapper[CONSTANTS.INFORMATION](message);
        }
        catch(err) {
            throw Error('No implementation for Logger: ' + loggerObj.toString());
        }
    };

    function debug(message) {
        try {
          loggerFunctionMapper[CONSTANTS.DEBUG](message);
        }
        catch(err) {
            throw Error('No implementation for Logger: ' + loggerObj.toString());
        }
    };

    function warning(message) {
        try {
          loggerFunctionMapper[CONSTANTS.WARNING](message);
        }
        catch(err) {
            throw Error('No implementation for Logger: ' + loggerObj.toString());
        }
    };

    function error(message) {
        try {
          loggerFunctionMapper[CONSTANTS.ERROR](message);
        }
        catch(err) {
            throw Error('No implementation for Logger: ' + loggerObj.toString());
        }
    };

    return {
        debug: debug,
        information: information,
        warning: warning,
        error: error
    }
}
 
var shortLog = new ShortLogger('ShortLoger');  
var badLogger = new BadLogger('BadLogger');

var loggerAdapter = LoggerAdapter(badLogger);  
loggerAdapter.information('This is logged through LoggerAdapter');  
loggerAdapter.debug('This is logged through LoggerAdapter');  
loggerAdapter.warning('This is logged through LoggerAdapter');  
loggerAdapter.error('This is logged through LoggerAdapter');

console.log();

var loggerAdapter2 = LoggerAdapter(shortLog);  
loggerAdapter2.information('Now This is logged through LoggerAdapter');  
loggerAdapter2.debug('Now This is logged through LoggerAdapter');  
loggerAdapter2.warning('Now This is logged through LoggerAdapter');  
loggerAdapter2.error('Now This is logged through LoggerAdapter');