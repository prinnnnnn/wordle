import React, { useEffect, useState } from 'react';
import { Wordle } from './components/Wordle';

const dbPort = 3001

function App() {

    const [solution, setSolutions] = useState<string | null>(null)

    useEffect(() => {
        fetch(`http://localhost:${dbPort}/solutions`)
            .then(res => res.json())
            .then(json => {
                const randomWord = json[Math.floor(Math.random() * json.length)]
                setSolutions(randomWord.word)
                // console.log(`Answer: ${solution}`)  
            })
    }, [setSolutions])

    return (
        <div className="App">
            <h1 className="app-name">WORDLE</h1>
            {/* {solution && <div>Solution is: {solution}</div>} */}
            {solution && <Wordle solution = {solution}/>}
        </div>
    );
}

export default App;
