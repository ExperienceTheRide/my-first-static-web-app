import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { publish, subscribe } from '@experiencetheride/local-message-router';
import { initialize } from '../name-getter'

function Dashboard() {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    initialize('Dashboard')
    subscribe('response', ({ greeting }) => {
      setGreeting(greeting)
    })

    publish({ route: 'call' })
  })

    return <div>
    <Helmet>
      <meta charset="utf-8" />
      <link rel="icon" type="image/x-icon" href="./favicon.ico?v=2" />
      <meta name="description" content="Access to all Commander functions" />
      <title>Commander Dashboard</title>
    </Helmet>
        <div data-testid="text">This is the dashboard!</div>
    <div>Static Greeting: {greeting}</div>
    </div>
}

export default Dashboard;