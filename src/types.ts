export enum states {
    LANDING = 0,
    LOGGED = 1,
    KID = 2
}

export enum language {
    RU = 0,
    EN = 1
}

export interface IGameStep {
    question: string,
    rightAnswer: string,
    wrongAnswers: [string, string, string]
}