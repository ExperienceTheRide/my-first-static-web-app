import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

function Dashboard() {

    return <div>
    <Helmet>
      <meta charset="utf-8" />
      <link rel="icon" type="image/x-icon" href="favicon.ico" />
      <meta name="description" content="Access to all Commander functions" />
      <title>Commander Dashboard</title>
    </Helmet>
        <div data-testid="text">This is the dashboard!</div>
    </div>
}

export default Dashboard;