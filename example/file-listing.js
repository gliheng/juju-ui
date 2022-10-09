/// A vite addon to list files or dirs, useful for development
import fs from 'fs';
import qs from 'qs';
import path from 'path';

export default function fileListing() {
  return {
    name: 'file-listing',
    configureServer: (server) => {
      server.middlewares.use('/@file-listing', (req, res) => {
        const { path: dir, type } = qs.parse(req.url.slice(2));
        const dirpath = path.resolve(__dirname, dir);
        fs.readdir(dirpath, (err, files = []) => {
          if (err) {
            res.writeHead(500);
            res.end(String(err));
            return;
          }
          const entries = files.filter(e => {
            const stat = fs.statSync(path.resolve(dirpath, e));
            return type == 'd' && stat.isDirectory() || type == 'f' && stat.isFile()
          });
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(entries));
        });
      });
    },
  };
}
