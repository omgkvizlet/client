export enum Langs {
    Czech = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Czech_Republic.svg/2560px-Flag_of_the_Czech_Republic.svg.png',

    German = "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1200px-Flag_of_Germany.svg.png",

    English = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Flag_of_Great_Britain_%281707%E2%80%931800%29.svg/1200px-Flag_of_Great_Britain_%281707%E2%80%931800%29.svg.png",

    Spanish = "https://cdn.britannica.com/36/4336-004-6BD81071/Flag-Spain.jpg"
}
export enum ActionTypes {
    SWITCH_LANGS = "SWITCH_LANGS",

    CHANGE_LANG1 = "CHANGE_LANG1",

    CHANGE_LANG2 = "CHANGE_LANG2",

    ADD_WORD = "ADD_WORD",

    ADD_SET = "ADD_SET",

    REMOVE_SET = "REMOVE_SET"

}
export interface IAction {
    data:any,
    type:ActionTypes
}
export enum Languages {
    CZECH = 'Czech',

    GERMAN = "Czech",

    ENGLISH = "English",

    SPANISH = "Spanish",

    UKRAINIAN = "UKRAINIAN"
}
export interface IState {
    currentLang1:string,

    currentLang2:string,

    sets:ISet[]
}
export interface IWord {
    word:string,

    translation:string,

    sex:'f'|'m'|'n'|null,

    partOfLanguage:'adjective' | 'noun' | 'verb' | 'adverb' | 'preposition' | 'pronounce'|null,
}
export interface ISet {

    fromLanguage:string,

    toLanguage:string,
    visibility:'private'| 'public',

    words:IWord[],

    name:string,
}