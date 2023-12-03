import * as fs from 'fs';

export default (path: string) => {
    return fs.readFileSync(path, 'utf8');
}
