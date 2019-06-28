import React from 'react';
import { StaticRouter } from 'react-router';
import { routes } from '../index';
import ReactDOMServer from 'react-dom/server';

export function renderRoute(res, req, initialData) {
    const context = {};

    const html = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            {routes}
        </StaticRouter>
    );

    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        });
        res.end();
    } else {
        res.send(renderFullPage(html, initialData));
        res.end();
    }
}


function renderFullPage(html, initialData) {
    return `
    <html lang="en">
      <head>
        <title>Server Site</title>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialData)}
      </script>
      <script type="text/javascript" src="bundle.js"></script>
    </html>`;
}
