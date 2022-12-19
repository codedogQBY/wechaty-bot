import http from "@/utils/http";
import {PaginationResponse} from "@/components/TableLayout";

const Bot = '/bot';

const api = {
    scan:`${Bot}/scan`,
    logout:`${Bot}/logout`,
    getUserSelf:`${Bot}/getUserSelf`,
    getLogonoff:`${Bot}/getLogonoff`,
    getAllFriends:`${Bot}/getAllFriends`
};

export function getScan(){
    return http.get(api.scan);
}

export function logout(){
    return http.get(api.logout);
}

export function getUserSelf(){
    return http.get(api.getUserSelf);
}

export function getLogonoff(){
    return http.get(api.getLogonoff);
}

export function getFriendsList(params: Common.PaginationParams):Promise<PaginationResponse<Common.TreeNode>>{
    return http.post(api.getAllFriends, params);
}

