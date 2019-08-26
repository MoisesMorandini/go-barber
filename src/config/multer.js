import multer from 'multer';
import crypto from 'crypto';
import { exname, resolve } from 'path';
import { extname } from 'upath';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        // gera uma sequencia de bytes
        if (err) return cb(err);
        // converte os bytes em hexadecimal e concatena com o extencao do arquivo original
        // ex: 123abc412589acbdef.png
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
