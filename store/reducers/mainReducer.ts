import {ActionTypes, IAction, IState, Languages} from "../../types";


let initialState:IState = {
    sets:[{
        //
        randomArr:[1,2,3,4,5,6],
        name:'Transport',
        words:[{
            word:'train',
            translation:'der Zug',
            partOfLanguage:'noun',
            sex:'m',
        },{
        word:'bus',
        translation:'der Bus',
        partOfLanguage:'noun',
        sex:'m',
    },{
        word:'vehicle',
        translation:'das Auto',
        partOfLanguage:'noun',
        sex:'m',
    },{
        word:'subway',
        translation:'der U-Bahn',
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
            word:'Worc',
            translation:'translation',
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
            word: 'Worc',
            translation: 'translation',
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
                word:'Worc',
                translation:'translation',
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
                word:'Worc',
                translation:'translation',
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
                word:'Worc',
                translation:'translation',
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
    //
    // @ts-ignore
    currentLang1:Languages['Spanish'],
    // @ts-ignore
    currentLang2:Languages['English']

}

export const mainReducer = (state = initialState, action:IAction):IState => {
    switch (action.type) {
        case ActionTypes.SET_GUESSING_CARD2:
            return {
                ...state,
                currentSet:{
                    ...state.currentSet,
                    // @ts-ignore
                    matchGame:{
                        ...state.currentSet?.matchGame,
                        guessingCard2:action.data
                    }
                }
            }
        case ActionTypes.WRONG_MATCH:
            console.log('IS WROT',state.currentSet?.matchGame?.isWrong)
            return {...state, currentSet:{...state.currentSet,matchGame:{...state.currentSet?.matchGame,isWrong:!state.currentSet?.matchGame?.isWrong}}}
        case ActionTypes.CORRECT_MATCH:
            return {...state, currentSet:{...state.currentSet, matchGame:{...state.currentSet?.matchGame, isWrong:false}}}
        case ActionTypes.SET_GUESSING_CARD:
            console.log('aaa set')
            return {...state, currentSet:{...state.currentSet,matchGame:{...state.currentSet?.matchGame,guessingCard1:action.data}}}
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
        case ActionTypes.LEARN_WORD:
            return {
                ...state,
                currentSet:{
                    ...state.currentSet,
                    // @ts-ignore
                    flashCardsGame:{
                        ...state.currentSet?.flashCardsGame,
                        learned:action.data
                    }
                }
            }
        case ActionTypes.ADD_SET:
            return {...state,sets:state.sets.concat(action.data)}
        case ActionTypes.CHANGE_LANG1:
            console.log('1');
            return {...state,currentLang1:action.data}
        case ActionTypes.CHANGE_LANG2:
            console.log('2');
            return {...state,currentLang2:action.data}
        case ActionTypes.RETURN_CARD:
            console.log('lkdjflsj')
            return {
                ...state,
                currentSet:{
                    ...state.currentSet,
                    // @ts-ignore
                    flashCardsGame:{
                        ...state.currentSet?.flashCardsGame,
                        isReturned:!state.currentSet?.flashCardsGame?.isReturned
                    }
                }
            }
            // return {
            //     ...state,
            //     currentSet:{
            //         ...state.currentSet,
            //         // @ts-ignore
            //         currentCard:{
            //             ...state.currentSet?.currentCard,
            //             x:withSpring(0),
            //             y:withSpring(0)
            //         }
            //     }
            // }
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