import {$api} from "../$api";

export class SetsService {
    static async getAllSets(){
        return $api.get('/sets')
    }
    static async getSet(id){
        return $api.get(`/sets/${id}`)
    }
    static async addWord()
}