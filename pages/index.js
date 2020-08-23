import { massageInput, countCharacters, limitCharacters, checkboxTransliterate, massageForm, url, login, symbols } from '../js/utils/constants.js';
import Api from '../js/components/Api.js'
import Transliterate from '../js/components/Transliterate.js'
let massage = []; 
const request = new Api(login); 
const transliterate = new Transliterate(symbols);

//Количество  символов и сообщений.
function countSMS() {
    const checked = transliterate.isStrCyrillic(massageInput.value); 
    const count = massageInput.value.length;
    const limit = (checked) ? ((count<=160) ? 160 : 153) : ((count<=70) ? 70 : 67);
    limitCharacters.textContent = (count) ? Math.floor((count-1) / limit) + 1 : 0;
    countCharacters.textContent = count;
}

//Поиск сообщения.
function searchString(str) {
    return massage.find((data) => data[1]===str);
}

//Ввод сообщения. 
function textInput() {

    const checked = checkboxTransliterate.checked;
    
    massage = massageInput.value.split(' ').map((s) => (!transliterate.isStrCyrillic(s)) ? [transliterate.inCyrillicStr(s), transliterate.inLatinStr(s)] : 
    ((searchString(s)) ? [transliterate.inCyrillicStr(searchString(s)[0]), s] : [transliterate.inCyrillicStr(s), s]));
    
    if (checked && !transliterate.isStrCyrillic(massageInput.value)) {
        massageInput.value = massageInput.value.split('').map((s) => transliterate.inLatinStr(s)).join('');
    }
    countSMS();
}
//Транслитерация текста.
function clickCheckbox(e) {
    const checked = e.target.checked;
    if (checked) {
        massageInput.value = massage.map((letter) => letter[1]).join(' ');
    } else {
        massageInput.value = massage.map((letter) => letter[0]).join(' ');
    }
    countSMS();
}
//Отправка формы
function handleSubmit(e) {
    e.preventDefault();
    const data = `massage=${massageInput.value}`;
    request.addMassage(url, data)
        .then((res) => {
            console.log(res)
            massage = [];
            massageInput.value = '';
            countSMS();
        })
        .catch((err) => {
            console.log(err)
        })
}

massageInput.addEventListener('input', textInput);
checkboxTransliterate.addEventListener('click', clickCheckbox)
massageForm.addEventListener('submit', handleSubmit)

