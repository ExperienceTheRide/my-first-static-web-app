import React, { useEffect, useState } from 'react';
import { publish, subscribe } from '@experiencetheride/local-message-router';
import './test'

function App() {
  const [greeting, setGreeting] = useState('')
  const value = 'World';

  useEffect(() => {
    subscribe('response', ({greeting}) => {
      setGreeting(greeting)
    })

    publish({route: 'call'})

  }, [])


  return <div>
    <div>Hello {value}</div>
    <div>The time is now {Date()}.</div>
    <div>{greeting}</div>
    <div>The version is {VERSION}</div>
    <div>The mode is {MODE}</div>
  </div>

}

export default App;
