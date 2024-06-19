export interface Guess {
    key: string,
    color: string
}

export interface WordleProps {
    solution: string;
}

export interface GridProps {
    currentGuess: string,
    guesses: Array<Array<Guess>>,
    turn: number
}

export interface RowProps {
    guess?: Array<Guess>,
    currentGuess?: string 
}

export interface KeyPad {
    key: string
}

export interface KeyPadProps {
    usedKeys: { [key: string]: string }
}

export interface ModalProps {
    isCorrect: Boolean,
    turn: number
    solution: string
}