import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { publish, subscribe } from '@experiencetheride/local-message-router';
import { initialize } from '../name-getter'

function Bus() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    initialize('Bus')
    subscribe('response', ({ greeting }) => {
      setGreeting(greeting)
    })

    publish({ route: 'call' })
  })

  return <div>
    <Helmet>
      <meta charset="utf-8" />
      <link rel="icon" type="image/x-icon" href="./favicon.ico?v=2" />
      <meta name="description" content="Cloud and chat pluigin for Commander bus app" />
      <title>Bus Commander</title>
    </Helmet>
    <div data-testid="text">This is the Bus!</div>
    <div>Static Greeting: {greeting}</div>
    <div>You are authorized</div>
  </div>
}

export default Bus;