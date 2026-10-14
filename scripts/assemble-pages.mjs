import { cpSync, existsSync } from 'node:fs';

if (!existsSync('dist/index.html') || !existsSync('storybook-static/index.html')) {
  throw new Error('Build both service and Storybook before assembling Pages.');
}
cpSync('storybook-static', 'dist/storybook', { recursive: true });
console.log('Pages artifact ready: dist/ (service), dist/storybook/ (Storybook)');
