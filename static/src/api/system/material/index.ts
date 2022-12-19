import http from "@/utils/http";
import {PaginationResponse} from "@/components/TableLayout";
const Material = '/material';
const api = {
    add: `${Material}/add`,
    delete: `${Material}/delete`,
    edit: `${Material}/edit`,
    list: `${Material}/list`,
};

interface Req  {
    name:string, content?:string, type:number, url?:string
}
/*
*
* */
export function getTextMaterialList(params: Common.PaginationParams):Promise<PaginationResponse<Common.TreeNode>>{
    return http.post(api.list, {type:1,...params});
}

export function getFileMaterialList(params: Common.PaginationParams):Promise<PaginationResponse<Common.TreeNode>>{
    return http.post(api.list, {type:2,...params});
}

export function deleteMaterialById(params: { ids: string }){
    return http.get(api.delete, { params });
}

export function editMaterialById(params: { name: string; id: number; type: number; content: string; url: string }){
    return http.post(api.edit,  params );
}

export function addMaterial(params: Req){
    return http.post(api.add,  params );
}