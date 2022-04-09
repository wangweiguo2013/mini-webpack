import fs from 'fs'
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import { transformFromAst } from 'babel-core'

/**
 * 读取文件
 * 获取依赖关系-ast
 * @param {*} params 
 */
function createAssets(relativePath) {
    const source = fs.readFileSync(relativePath, { encoding: 'utf-8' })

    const ast = parser.parse(source, { sourceType: "module" })
    // console.log(ast.program)

    const deps = []
    traverse.default(ast, {
        ImportDeclaration({ node }) {
            deps.push(node.source.value)
        }
    })

    const { code } = transformFromAst(ast, null, {
        presets: ['env']
    })
    console.log(code)

    return {
        filePath,
        code,
        deps
    }


}

function createGraph() {
    const mainAssets = createAssets('./example/main.js')
    const queue = [mainAssets]
    for (const asset of queue) {
        asset.deps.forEach((relativePath) => {
            const child = createAssets(relativePath)
            queue,push(child)
        })
    }
    return queue
}


const graph = createGraph()


const build = function () {
    const template = fs.readFileSync('./bundle.ejs', { encoding: 'utf-8' })
    const code = ejs.render(template, data)
    fs.writeFileSync('dist/bundle.js', code, { encoding: 'utf-8'})
}
build()
console.log(createAssets())