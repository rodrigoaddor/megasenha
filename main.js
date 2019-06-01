const fs = require("fs")
const readline = require("readline")
const rl = readline.createInterface(process.stdin, process.stdout)

let words = []

fs.readFile("palavras.txt", (err, file) => {
    if (file) {
        words = file.toString().split("\r\n").sort()
        fs.writeFile("backup.txt", words.join("\r\n"), err => {if (err) console.error(err)})
    }

    console.log(`${words.length} palavras carregadas.\nAdicionando palavras. Digite "q" para sair`)

    addWords()
})

const addWords = () => {
    rl.question("", input => {
        if (input === "q") {
            fs.writeFile("palavras.txt", words.sort().join("\r\n"), err => {
                if (err)
                    console.err(err)

                rl.close()
                return
            })

            rl.close()
            return
        }

        input = input.charAt(0).toUpperCase() + input.slice(1)

        if (words.includes(input)) {
            console.log(`! ${input} já está na lista de palavras.\n`)
        } else {
            words.push(input)
            console.log(`+ [${words.length}]`)
        }
        
        addWords()
    })
}