import React, { useEffect, useState } from 'react'
import useWordle from '../hook/useWordle';
import { Grid } from './Grid';
import { Keypad } from './Keypad';
import Modal from './Modal';

interface WordleProps {
    solution: string;
}

export const Wordle: React.FC<WordleProps> = ({ solution }) => {

    const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys } = useWordle(solution)
    const [showModal, setShowModal]  = useState<Boolean>(false)

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp)

        if (isCorrect) {
            setTimeout(() => {
                setShowModal(true)
            }, 2000);
            window.removeEventListener("keyup", handleKeyUp)
            console.log(`Congrats, you win!`)
        }

        if (turn === 6) {
            setTimeout(() => {
                setShowModal(true)
            }, 2000);
            window.removeEventListener("keyup", handleKeyUp)
            console.log(`Unlucky, out of guesses!`)
        }

        return () => window.removeEventListener("keyup", handleKeyUp)
    }, [handleKeyUp, isCorrect, turn])

    useEffect(() => {
        console.log(guesses)
        console.log(`Turn: ${turn}`)
        console.log(`Correct: ${isCorrect}`)
    }, [guesses, turn, isCorrect])

    return (
        <div>
            {/* <div> Solution: {solution}</div>
            <div> current guess: {currentGuess} </div> */}
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
            <Keypad usedKeys = {usedKeys}/>
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
        </div>
    );
};