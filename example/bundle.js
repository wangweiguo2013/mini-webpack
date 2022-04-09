(function (modules) {
    function require(filePath) {
        const module = {
            exports: {}
        }
        const fn = modules[filePath]

        fn(require, module, module.exports)
        return module.exports
    }
    require('./main.js')
})({
    './foo.js': function (require, module, exports) {
        const foo = function () {
            console.log('foo.js')
        }
        module.exports = {
            foo
        }
    },
    './main.js': function (require, module, exports) {
        const { foo } = require('./foo.js')
        foo()
    }
})