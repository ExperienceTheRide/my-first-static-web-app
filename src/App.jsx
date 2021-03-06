import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { publish, subscribe } from '@experiencetheride/local-message-router';
import { initialize } from './name-getter'

function App() {
  const [greeting, setGreeting] = useState('')
  const value = 'World';

  useEffect(() => {
    initialize('Home')

    subscribe('response', ({ greeting }) => {
      setGreeting(greeting)
    })

    publish({ route: 'call' })

  }, [])


  return <div>
    <Helmet>
      <meta charset="utf-8" />
      <link rel="icon" type="image/x-icon" href="./favicon.ico?v=2" />
      <meta name="description" content="Live Ride bus status updates" />
      <title>Ride Bus Updates</title>
    </Helmet>
    <div>Hello {value}!</div>
    <div>The time is now {Date()}.</div>
    <div>Static Greeting: {greeting}</div>
    <div>The version is {VERSION}</div>
    <div>The mode is {MODE}</div>
    <div>A new line</div>
  </div>

}

export default App;
