module.exports = {
    'env': {
        'commonjs': true,
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error', //comprobacion que toda igualdad sea con ===
        'no-trailing-spaces': 'error', //evita espacios finales de linea inecesarios
        'object-curly-spacing': [
            'error', 'always'// comprueba espaciado (1) antes y despues de las llaves
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }  //espacios en blanco consistentes en parametros de funcion
        ],
        'no-console': 0
    }
}
