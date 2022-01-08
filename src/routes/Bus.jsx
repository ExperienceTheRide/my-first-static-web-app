import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

function Bus() {

    return <div>
    <Helmet>
      <meta charset="utf-8" />
      <link rel="icon" type="image/x-icon" href="./favicon.ico?v=2" />
      <meta name="description" content="Cloud and chat pluigin for Commander bus app" />
      <title>Bus Commander</title>
    </Helmet>
        <div data-testid="text">This is the Bus!</div>
    </div>
}

export default Bus;