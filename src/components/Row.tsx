import React from 'react'
import { RowProps } from '../types/common'

export const Row: React.FC<RowProps> = ({ guess, currentGuess }) => {

    if (guess) {
        return (
            <div className='row past'>
                {guess.map((char, idx) => {
                    return <div key={idx} className={char.color}>{char.key}</div>
                })}
            </div>
        )
    } 

    if (currentGuess) {

        let letters = [...currentGuess]
        let empties = [...Array(5 - currentGuess.length)]

        return (
            <div className='row current'>
                {letters.map((letter, i) => {
                    return <div key={i} className="filled">{letter}</div>
                })}
                {empties.map((_, i) => {
                    return <div key={i}></div>
                })}
            </div>
        )
    }

    return (
        <div className='row'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
