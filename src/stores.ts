import { writable, get } from 'svelte/store';
import { states, language } from './types';

let state = writable(states.LANDING);
let lang = writable(language.RU);

export const toggleLanguage = () => lang.update(() => get(lang) === language.RU ? language.EN : language.RU);
export const locale = (ru:string, en:string) => get(lang) == language.RU ? ru : en;

export default state;
