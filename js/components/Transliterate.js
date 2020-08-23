export default class Transliterate {
    constructor(symbols) {
        this._symbols  = symbols;
    }
    //Ищем латинские символы состоящие из более одной буквы и заменяем на кириллический символ
    _strTransliterate(str) {
        this._symbols.filter((s) => (s[1].length>1)).forEach((item) => {
            str = str.replace(item[1], item[0]);
        });
        return str;
    }
    //Переводим символ в кириллицу
    inCyrillicSymbol(symbol) {
        const letter = this._symbols.find((s) => (s[1]===symbol));
        return (letter) ? letter[0] : symbol;
    }
    //Переводим строку в кириллицу
    inCyrillicStr(str) {
        str = this._strTransliterate(str)
        return str.split('').map(s => this.inCyrillicSymbol(s)).join('');
    }
    //Переводим символ в латиницу
    inLatinSymbol(symbol) {
        const letter = this._symbols.find((s) => (s[0]===symbol));
        return (letter) ? letter[1] : symbol;
    }
    //Переводим строку в латиницу
    inLatinStr(str) {
        return str.split('').map(s => this.inLatinSymbol(s)).join('');
    }
    //Проверка, все ли буквы латинские
    isStrCyrillic(str) {
        return str.split('').every((s) => s===this.inLatinSymbol(s));
    }
}