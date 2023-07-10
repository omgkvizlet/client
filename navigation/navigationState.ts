import {NavigationState} from "@react-navigation/native";

export const navigationState:NavigationState = {
    type:'stack',
    key:'main-stack',
    routeNames:['Main','FS','SETS_SELECTION','SET_PAGE'],
    routes:[
        {
            name:'Main',
            key:'main'
        },
        {
            name:'FS',
            params:{id:1|2},
            key:'flags-selection',
        },
        {
            name:'SETS_SELECTION',
            key:'sets-selection'
        },
        {
            name:'SET_PAGE',
            key:'set-page'
        }
    ],

}