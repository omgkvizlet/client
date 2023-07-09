import {SharedValue} from "react-native-reanimated/lib/types/lib";

export enum Langs {
    Czech = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/2560px-Flag_of_the_Czech_Republic.svg.png',

    German = "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png",

    English = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg/1200px-Flag_of_Great_Britain_%281707%E2%80%931800%29.svg.png",

    Spanish = "https://cdn.britannica.com/36/4336-004-6BD81071/Flag-Spain.jpg",

    Ukrainian = "https://flagpedia.net/data/flags/w1600/ua.png",

    Japanese = "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/800px-Flag_of_Japan.svg.png",

    Albanian = "https://cdn.britannica.com/00/6200-004-42B7690E/Flag-Albania.jpg",

    russian = "https://upload.wikimedia.org/wikipedia/commons/8/8a/LGBT_Rainbow_Flag.png"
}
export enum LanguagesAbbreviations{

}
const langsAbbreviationsArr = ['cs','de','en','es','uk','ja','sq']
// @ts-ignore
Object.keys(Langs).forEach(( lang:string, index) => LanguagesAbbreviations[lang] = langsAbbreviationsArr[index])

export interface IAuthState {
    user:IUser | null,
    status? :LoadingStatuses,
    error?:Error | null
}
export interface IUser {
    email?:string,
    username:string,
    password:string,
    token?:string
}

export enum LoadingStatuses {
    ERROR,
    LOADING,
    SUCCESS
}

export enum AuthActionTypes {
    AUTH_LOGOUT = "AUTH_LOGOUT",

    AUTH_SUCCESS = "AUTH_SUCCESS",

    AUTH_ERROR = "AUTH_ERROR",

    AUTH_LOADING = "AUTH_LOADING",

    SET_USER = "SET_USER",
}

export enum ActionTypes {
    LEARN_WORD = "LEARN_WORD",

    WRONG_MATCH = "WRONG_MATCH",

    CORRECT_MATCH = "CORRECT_MATCH",

    SET_GUESSING_CARD = "SET_GUESSING_CARD",

    SET_GUESSING_CARD2 = "SET_GUESSING_CARD2",

    REMOVE_WORD = "REMOVE_WORD",

    SWITCH_LANGS = "SWITCH_LANGS",

    CHANGE_LANG1 = "CHANGE_LANG1",

    CHANGE_LANG2 = "CHANGE_LANG2",

    ADD_WORD = "ADD_WORD",

    RETURN_CARD = "RETURN_CARD",

    ADD_SET = "ADD_SET",

    REMOVE_SET = "REMOVE_SET",

    FETCH_SET = "FETCH_SET",

    SET_CURRENT_CARD = "SET_CURRENT_CARD"

}
export interface IAction {
    data?:any,
    type:ActionTypes | AuthActionTypes
}
export enum Languages {

}
Object.keys(Langs).forEach(lang=>{
    // @ts-ignore
    Languages[lang] = lang
})
export interface IState {
    currentLang1:string,

    currentLang2:string,

    sets:ISet[],

    currentSet?:ISet,

}


export interface IWord {
    word:string,

    translation:string,

    sex:'f'|'m'|'n'|null,

    partOfLanguage:'adjective' | 'noun' | 'verb' | 'adverb' | 'preposition' | 'pronounce'|null,

}
export interface ICurrentCard {
    word:IWord,
    x:SharedValue<number> | number,
    y:SharedValue<number> | number
}
export interface ISet {

    fromLanguage:string,

    toLanguage:string,

    randomArr?:any[]

    visibility:'private'| 'public',

    words:IWord[],

    name:string,

    flashCardsGame?:IFlashCardsGame,

    matchGame?:IMatchGame,

    currentCard?:ICurrentCard
}

export interface IFlashCardsGame {
    learned:boolean

    knowThatWords?:IWord[],

    isReturned:boolean,

    learnYetWords?:IWord[]
}
export interface IMatchGame {
    guessingCard1: { index: number, word: string },

    guessingCard2: { index: number, translation: string },

    isWrong?: boolean,
}
