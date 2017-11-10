import * as React from 'react';
import {renderToString} from 'react-dom/server';
import {readJSONSync} from 'fs-extra';
import {resolve} from 'path';
import Koa from 'koa';
import App from '../app';

const app = new Koa();

const {css, js} = readJSONSync(resolve(__dirname, '../build/client/assets.json')).entrypoints.main;

app.use((ctx) => {
  console.log(ctx.originalUrl);
  const appContent = renderToString(<App />);
  ctx.status = 200;
  ctx.body = `
    <html>
      <head>
        ${cssImports(css)}
      </head>
      <div id="app">
        ${appContent}
      </div>
      ${javascriptImports(js)}
    </html>
  `;
});

const listener = app.listen(8082, 'localhost');
export default listener;

function cssImports(css: string[]) {
  return css
    .map((cssPath) => `<link href="${cssPath}" rel="stylesheet" type="text/css" />`)
    .join('\n');
}

function javascriptImports(javascript: string[]) {
  return javascript
    .map((scriptPath) => `<script type="text/javascript" src="${scriptPath}" defer></script>`)
    .join('\n');
}
