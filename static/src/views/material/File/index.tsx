import {defineComponent, ref, reactive, getCurrentInstance} from 'vue';
import TableLayout from "@/components/TableLayout";
import {ToolButton} from "@/components/TableLayout/Tool";
import { getFileMaterialList,deleteMaterialById } from '@/api/system/material';
import MaterialDialog  from '../MaterialDialog'
interface  MaterialFormData {
    id:undefined|number,name:string, content?:string, type:number, url?:string
}
export default defineComponent({
    isPage: true,
    name: 'FileMaterial',
    setup() {
        const instance = getCurrentInstance();
        const tableLayoutRef = ref<InstanceType<typeof TableLayout>>();
        const materialDialogRef = ref<InstanceType<typeof MaterialDialog>>()
        const buttons = reactive<ToolButton<number, MaterialFormData>[]>([
            {
                key: 'approve-add',
                onClick: ()=>{
                    materialDialogRef.value?.show('add');
                } ,
                action: 'add',
                vAction: 'system:materialFile:add',
                icon: 'add',
                text: '新增',
            },
            {
                key: 'approve-edit',
                onClick: (_selectKey: number[],
                          selectNodes: MaterialFormData[])=>{
                    materialDialogRef?.value?.show('edit', selectNodes[0]);
                },
                action: 'edit',
                vAction: 'system:materialFile:edit',
                icon: 'edit',
                text: '编辑',
            },
            {
                key: 'approve-delete',
                onClick: (_selectKey: number[],
                          selectNodes: MaterialFormData[])=>{
                    instance?.proxy!.$confirm({
                        title: '是否确认删除',
                        okText: '是',
                        okType: 'danger',
                        cancelText: '否',
                        maskClosable: false,
                        onOk: () => {
                            const ids: number[] = [];
                            const each = (tree: Common.TreeNode[]) => {
                                tree.forEach((item) => {
                                    ids.push(item.id);
                                    if (item.children) {
                                        each(item.children);
                                    }
                                });
                            };
                            each(selectNodes as unknown as Common.TreeNode[]);
                            deleteMaterialById({
                                ids: ids.join(','),
                            }).then(() => {
                                instance?.proxy!.$message.success('删除成功');
                                reSearch();
                            });
                        },
                    });
                },
                action: 'delete',
                vAction: 'system:materialFile:delete',
                icon: 'delete',
                text: '删除',
            },
            {
                key: 'approve-query',
                onClick: (_selectKey: number[],
                          selectNodes: MaterialFormData[])=>{
                    materialDialogRef?.value?.show('query', selectNodes[0]);
                },
                action: 'query',
                vAction: 'system:materialFile:query',
                icon: 'query',
                text: '详情',
            },
        ])
        const columns = reactive<Common.TableColumns[]>([
            {
                title: '名字',
                dataIndex: 'name',
                width: 150,
            },
            {
                title: '链接',
                dataIndex: 'url',
                width: 400,
            },
            {
                title: '更新时间',
                dataIndex: 'updatedAt',
                width: 150,
            },
        ])
        const reSearch = function () {
            tableLayoutRef?.value?.resetSearch();
        };
        return{
            tableLayoutRef,
            materialDialogRef,
            buttons,
            columns,
            reSearch
        }
    },
    render() {
        const {
            buttons,
            columns,
            reSearch
        } = this
        return (
            <div class="container">
                <TableLayout
                    ref="tableLayoutRef"
                    buttons={buttons}
                    columns={columns}
                    search={getFileMaterialList}
                ></TableLayout>
                <MaterialDialog ref="materialDialogRef" materialType={2} onUpdate={reSearch}></MaterialDialog>
            </div>
        );
    },
});
