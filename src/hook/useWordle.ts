import { useState } from "react";
import { Guess } from "../types/common"
 
const useWordle = (solution: any) => {

    const [turn, setTurn] = useState<number>(0)
    const [currentGuess, setCurrentGuess] = useState<string>('')
    const [guesses, setGuesses] = useState<Array<Array<Guess>>>([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState<Array<string>>([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState<Boolean>(false)
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: string }>({})

    /* format guess into an array of letter objects */
    const formatGuess = () => {
        console.log(`Formatting guess "${currentGuess}"`)
        let solutionArray = [...solution]
        let formattedGuess: Array<Guess> = [...currentGuess].map((ch) => {
            return {
                "key":ch,
                "color":"grey"
            }
        })
        
        // find green, yellow letter
        formattedGuess.forEach((ch, i) => {
            if (solutionArray[i] === ch.key) {
                formattedGuess[i].color = "green"
                solutionArray[i] = null
            }
        })

        formattedGuess.forEach((ch, i) => {
            if (solutionArray.includes(ch.key) && ch.color !== "green") {
                formattedGuess[i].color = "yellow"
                solutionArray[solutionArray.indexOf(ch)] = null
            }
        })

        return formattedGuess
        
    }

    /* add a new guess, count the number of guess, update isCorrect */
    const addNewGuess = (coloredGuess: Array<Guess>) => {

        if (currentGuess === solution) {
            setIsCorrect(true)
        }

        setGuesses((prevGuesses) => {
            let newGuess = [...prevGuesses]
            // console.log(newGuess)
            newGuess[turn] = coloredGuess
            // console.log(newGuess)
            return newGuess
        })

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })

        setTurn(turn+1)

        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys}
        
            coloredGuess.forEach((cl) => {
                const currentColor = newKeys[cl.key]

                if (cl.color === "green") {
                    newKeys[cl.key] = "green"
                    return
                }
                if (cl.color === "yellow" && currentColor !== "green") {
                    newKeys[cl.key] = "yellow"
                    return
                }
                if (cl.color === "grey") {
                    newKeys[cl.key] = "grey"
                    return
                }

            })

            return newKeys

        })

        setCurrentGuess("")

    }

    /* handle event (guesses submissions) */
    const handleKeyUp = (event:any) => {
        const { key } = event;

        if (key === "Enter") {
            // only add guess if turn < 5 and guess never be seen and 5-char-long

            if (turn > 5) {
                console.log("All guesses are used!!!")
                return
            }

            if (history.includes(currentGuess)) {
                console.log("Duplicated word")
                return
            }

            if (currentGuess.length !== 5) {
                console.log("A word must be 5 characters long")
                return
            }

            const coloredGuess = formatGuess()
            console.log(coloredGuess)
            addNewGuess(coloredGuess)

        }
        
        if (key === "Backspace") {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }

    };

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyUp }

}

export default useWordle;