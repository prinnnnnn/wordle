import React, { useState, useEffect } from 'react'
import { KeyPad, KeyPadProps } from '../types/common'

const dbPort = 3001

export const Keypad: React.FC<KeyPadProps> = ({ usedKeys }) => {

    const [letters, setLetters] = useState<Array<KeyPad> | null>(null)

    useEffect(() => {

        fetch(`http://localhost:${dbPort}/letters`)
            .then(res => res.json())
            .then(json => {
                setLetters(json)
            })

    }, [])


    return (
        <div className='keypad'>
            {letters && letters.map((keypad) => {

                const color = usedKeys[keypad.key]

                return (
                    <div key={keypad.key} className={color}>{keypad.key}</div>
                )
            })}
        </div>
    )
}
