import * as fs from 'fs'

export default (path: string, content: any) => {
    return fs.writeFileSync(path, content)
}
