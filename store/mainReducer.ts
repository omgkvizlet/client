import {ActionTypes, IAction, IState, Languages} from "../types";
import {withSpring} from "react-native-reanimated";

const returnContext = function(){
    return this
}
let initialState:IState = {
    sets:[{
        //
        randomArr:[1,2,3,4,5,6],
        name:'Transport',
        words:[{
            word:'Transport',
            translation:'der Verkehr',
            partOfLanguage:'noun',
            sex:'m',
        },{
        word:'Transport',
        translation:'der ldskfjlskdj',
        partOfLanguage:'noun',
        sex:'m',
    },{
        word:'Transport',
        translation:'der dlskfjlskfgjdlk',
        partOfLanguage:'noun',
        sex:'m',
    },{
        word:'Transport',
        translation:'der AAAA',
        partOfLanguage:'noun',
        sex:'m',
    }],
        // @ts-ignore
        fromLanguage:Languages['English'],
        // @ts-ignore
        toLanguage:Languages['German'],
        visibility:'private',
    },{
        name:'Food',
        words:[{
            word:'Food',
            translation:'Їжа',
            partOfLanguage:'noun',
            sex:'f',
        }],
        // @ts-ignore
        fromLanguage:Languages['English'],
        // @ts-ignore
        toLanguage:Languages['Ukrainian'],
        visibility:'private'
    }, {
        name: 'Fine',
        words: [{
            word: 'Fine',
            translation: 'Bien',
            partOfLanguage: 'noun',
            sex: 'm',
        }],
        // @ts-ignore
        fromLanguage:Languages['English'],
        // @ts-ignore
        toLanguage:Languages['Spanish'],
        visibility:'public'
    },
        {
            name:'AAA',
            words:[{
                word:'Food',
                translation:'Їжа',
                partOfLanguage:'noun',
                sex:'f',
            }
            ],
            // @ts-ignore
            fromLanguage:Languages['English'],
            // @ts-ignore
            toLanguage:Languages['Ukrainian'],
            visibility:'private'
        },
        {
            name:'lkjlkjlkj',
            words:[{
                word:'Food',
                translation:'Їжа',
                partOfLanguage:'noun',
                sex:'f',
            }],
            // @ts-ignore
            fromLanguage:Languages['ENGLISH'],
            // @ts-ignore
            toLanguage:Languages['Ukrainian'],
            visibility:'public'
        },
        {
            name:'kjdflkds',
            words:[{
                word:'Food',
                translation:'Їжа',
                partOfLanguage:'noun',
                sex:'f',
            }],
            // @ts-ignore
            fromLanguage:Languages['English'],
            // @ts-ignore
            toLanguage:Languages['Ukrainian'],
            visibility:'private'
        },
    ],

    // @ts-ignore
    currentLang1:Languages['Spanish'],
    // @ts-ignore
    currentLang2:Languages['English']

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
        case ActionTypes.FETCH_SET:
            return {...state, currentSet:action.data}
        case ActionTypes.ADD_SET:
            return {...state,sets:state.sets.concat(action.data)}
        case ActionTypes.CHANGE_LANG1:
            console.log('1');
            return {...state,currentLang1:action.data}
        case ActionTypes.CHANGE_LANG2:
            console.log('2');
            return {...state,currentLang2:action.data}
        case ActionTypes.RETURN_CARD:
            return {
                ...state,
                currentSet:{
                    ...state.currentSet,
                    // @ts-ignore
                    currentCard:{
                        ...state.currentSet?.currentCard,
                        x:withSpring(0),
                        y:withSpring(0)
                    }
                }
            }
        case ActionTypes.SET_CURRENT_CARD:
            // @ts-ignore
            return {...state,currentSet:{...state.currentSet,currentCard:action.data}}
        case ActionTypes.REMOVE_WORD:
            console.log(action.data)
            // @ts-ignore
            return {...state,sets:state.sets.map(set=>{
                if(set.name == state.currentSet?.name){
                    set.words = set.words.filter(el=>el.word != action.data)
                }
                return set
                //
                // @ts-ignore
                }),currentSet:{...state.currentSet,words:state.currentSet.words.filter(el=>el.word!=action.data)}}
        default:
            return {...state}
    }
}