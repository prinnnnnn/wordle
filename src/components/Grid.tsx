import React from 'react'
import { Row } from './Row'
import { GridProps } from '../types/common'

export const Grid: React.FC<GridProps> = ({ currentGuess, guesses, turn }) => {
    return (
        <div>
            {guesses.map((guess, idx) => {
                if (idx === turn) {
                    return <Row key={idx} currentGuess={currentGuess}/>
                } else {
                    return <Row key={idx} guess={guess}/>
                }
            })}
        </div>
    )
}