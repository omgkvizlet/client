import {ActionTypes, IAction, IState, Languages} from "../types";

const initialState:IState = {
    sets:[{
        name:'Transport',
        words:[{
            word:'Transport',
            translation:'der Verkehr',
            partOfLanguage:'noun',
            sex:'m',
        },{
        word:'Transport',
        translation:'der Verkehr',
        partOfLanguage:'noun',
        sex:'m',
    },{
        word:'Transport',
        translation:'der Verkehr',
        partOfLanguage:'noun',
        sex:'m',
    },{
        word:'Transport',
        translation:'der Verkehr',
        partOfLanguage:'noun',
        sex:'m',
    }],
        fromLanguage:Languages.ENGLISH,
        toLanguage:Languages.GERMAN,
        visibility:'private'
    },{
        name:'Food',
        words:[{
            word:'Food',
            translation:'Їжа',
            partOfLanguage:'noun',
            sex:'f',
        }],
        fromLanguage:Languages.ENGLISH,
        toLanguage:Languages.UKRAINIAN,
        visibility:'private'
    }, {
        name: 'Fine',
        words: [{
            word: 'Fine',
            translation: 'Bien',
            partOfLanguage: 'noun',
            sex: 'm',
        }],
        fromLanguage:Languages.ENGLISH,
        toLanguage:Languages.SPANISH,
        visibility:'public'
    },
        {
            name:'Food',
            words:[{
                word:'Food',
                translation:'Їжа',
                partOfLanguage:'noun',
                sex:'f',
            }
            ],
            fromLanguage:Languages.ENGLISH,
            toLanguage:Languages.UKRAINIAN,
            visibility:'private'
        },
        {
            name:'Food',
            words:[{
                word:'Food',
                translation:'Їжа',
                partOfLanguage:'noun',
                sex:'f',
            }],
            fromLanguage:Languages.ENGLISH,
            toLanguage:Languages.UKRAINIAN,
            visibility:'public'
        },
        {
            name:'Food',
            words:[{
                word:'Food',
                translation:'Їжа',
                partOfLanguage:'noun',
                sex:'f',
            }],
            fromLanguage:Languages.ENGLISH,
            toLanguage:Languages.UKRAINIAN,
            visibility:'private'
        },
    ],

    currentLang1:Languages.SPANISH,
    currentLang2:Languages.ENGLISH

}

export const mainReducer = (state = initialState, action:IAction):IState => {
    switch (action.type) {
        case ActionTypes.SWITCH_LANGS:
            return {...state, currentLang1:state.currentLang2,currentLang2:state.currentLang1}
        case ActionTypes.ADD_WORD:
            return {...state,sets:state.sets.map(el=>{
                if (el.name == action.data.name){
                    el.words = [...el.words,action.data.word]
                    return el
                }
                return el
            })}
        case ActionTypes.ADD_SET:
            return {...state,sets:state.sets.concat(action.data)}
        case ActionTypes.CHANGE_LANG1:
            console.log('1');
            return {...state,currentLang1:action.data}
        case ActionTypes.CHANGE_LANG2:
            console.log('2');
            return {...state,currentLang2:action.data}

        default:
            return {...state}
    }
}