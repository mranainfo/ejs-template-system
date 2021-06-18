const { series, parallel, watch } = require("gulp")
const { exec } = require("child_process")
const colors = require("colors")

function compilePages(cb) {
  return exec("npm run build", (error, stdout) => {
    if (error) throw error
    console.log(stdout)
  })
}

function compileCss(cb) {
  return exec("npm run css", (error, stdout, stderr) => {
    if (error) throw error
    console.log(stderr.green)
  })
}

function startServer(cb) {
  return exec("npm run dev", (error, stdout) => {
    if (error) throw error
    console.log(stdout)
  })
}

function watchFiles() {
  watch(["pages/**/*", "components/**/*"], compilePages)
  watch(["pages/**/*", "components/**/*"], compileCss)
}

exports.default = parallel(startServer,  series(compilePages, compileCss, watchFiles));
