import fs from 'fs';
import path from 'path';

const root = process.cwd();
const src = path.join(root, 'server', 'index.js');
const dstDir = path.join(root, 'dist');
const dst = path.join(dstDir, 'index.js');

fs.mkdirSync(dstDir, { recursive: true });
fs.copyFileSync(src, dst);

// Copy public/* into web/ so web/ is self-contained as well
const pubDir = path.join(root, 'public');
const webDir = path.join(root, 'web');
fs.mkdirSync(webDir, { recursive: true });
if (fs.existsSync(pubDir)) {
  for (const file of fs.readdirSync(pubDir)) {
    fs.copyFileSync(path.join(pubDir, file), path.join(webDir, file));
  }
}
console.log('[build] dist/index.js and web/ assets ready.');
