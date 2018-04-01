import * as _ from 'lodash'

export const LocalStorage = {
    setItem: (key, value) => {
        let localStorage = window.localStorage
        if (!localStorage) {
            alert("浏览器不支持localStorage。");
            return;
        } else {
            !_.isEmpty(key) && localStorage.setItem(key, value);
        }
    },
    getItem: (key) => {
        let localStorage = window.localStorage
        if (!localStorage) {
            alert("浏览器不支持localStorage。");
            return undefined;
        } else {
            return localStorage.getItem(key);
        }
    }
}
