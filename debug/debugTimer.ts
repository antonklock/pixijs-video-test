interface DebugTimer {
    startMessage: string;
    endMessage: string;
    startedAt: Date;
    endedAt: Date;
    isRunning: boolean;
    start: () => Date;
    stop: () => Date;
}

const startTimer = (startMessage: string) => {
    const start = new Date();
    console.log(
        "%c" + startMessage + "%c" +
        start.toLocaleTimeString() +
        "." +
        start.getMilliseconds().toString().padStart(3, "0").slice(0, 2),
        "color: #00B2FF; font-weight: bold",
        "color: #EB9539; font-weight: bold"
    );

    return start;
}

const stopTimer = (start: Date, stopMessage: string) => {
    const end = new Date();
    console.log(
        "%c" + stopMessage + "%c" +
        end.toLocaleTimeString() +
        "." +
        end.getMilliseconds().toString().padStart(3, "0").slice(0, 2),
        "color: #00B2FF; font-weight: bold",
        "color: #a2e8dd; font-weight: bold"
    );

    const totalTime = ((end.getTime() - start.getTime()) / 1000).toFixed(2);
    console.log(
        "%cTotal time: %c" + totalTime + "s",
        "color: #00B2FF; font-weight: bold",
        "color: #5DAB28; font-weight: bold"
    );

    return end;
}

const debugTimer: DebugTimer = {
    startMessage: "Started timer at: ",
    endMessage: "Finished timer at: ",
    startedAt: new Date(),
    endedAt: new Date(),
    isRunning: false,
    start: () => {
        debugTimer.startedAt = startTimer(debugTimer.startMessage);
        debugTimer.isRunning = true;
        return debugTimer.startedAt;
    },
    stop: () => {
        debugTimer.endedAt = stopTimer(debugTimer.startedAt, debugTimer.endMessage);
        debugTimer.isRunning = false;
        return debugTimer.endedAt;
    }
}

export const createDebugTimer = (startMessage: string, endMessage: string) => {
    return {
        startMessage,
        endMessage,
        startedAt: new Date(),
        endedAt: new Date(),
        isRunning: false,
        start: () => {
            debugTimer.startedAt = startTimer(startMessage);
            debugTimer.isRunning = true;
        },
        stop: () => {
            debugTimer.endedAt = stopTimer(debugTimer.startedAt, endMessage);
            debugTimer.isRunning = false;
        }
    }
}