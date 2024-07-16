class Logger {
    debug(msg: string, arg1?: any, arg2?: any, arg3?: any) {
        if(process.env.TRACE_MODE == 'on') {
            const log = '🐞   ' + this.msgLog() + msg;
            this.print(log);
            this.print(arg1);
            this.print(arg2);
            this.print(arg3);
        }
    }

    error(msg: string, arg1?: any, arg2?: any, arg3?: any) {
        if(process.env.TRACE_MODE == 'on') {
            const log = '❌   ' + this.msgLog() + msg;
            console.error(log);
            this.print(arg1);
            this.print(arg2);
            this.print(arg3);
        }
    }

    private print(value: any) {
        if(value) console.log(value);
    }

    private msgLog() {
        const logId = generateUniqueID();
        return [logId] + '    ' + process.env.APP_NAME + '  ::::  ';
    }
}

const getRandomLetters = (length = 1) => Array(length).map(e => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('');
const getRandomDigits = (length = 1) => Array(length).map(e => Math.floor(Math.random() * 10)).join('');
const generateUniqueID = () => {
let id = getRandomLetters(2) + getRandomDigits(4);
return id;
};


export const LOG = new Logger();