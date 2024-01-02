let sql = 'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?';

const xpto = ['Morty', 14].reduce((acc, curr) => {
    acc = acc.replace('?', curr)
    // console.log({sql, curr, acc})
    return acc
}, sql)

console.log(xpto)

const execute = (sql = '', options = []) => {
    return options.reduce((acc, curr) => {
      return acc.replace('?', curr)
    }, sql)
}


const connection = {
    execute,
}
console.log(connection.execute('abc ? 12312123 ?',[555,333]))