import {defineComponent, ref, reactive, getCurrentInstance} from 'vue';
import TableLayout from "@/components/TableLayout";
import {getFriendsList} from "@/api/system/bot";
import './index.less'
import {CommonFormItem} from "@/components/CommonForm";
export default defineComponent({
    isPage: true,
    name: 'FriendsList',
    setup(){
        const formJson = reactive<CommonFormItem[]>([
            {
                type: 'input',
                label: '名字',
                fieldName: 'name',
                extraConfig: {
                    // className: "row",
                },
                dataType: String,
            },
            {
                type: 'input',
                label: '备注',
                fieldName: 'alias',
                extraConfig: {
                    // className: "row",
                },
                dataType: String,
            },
        ])
        const columns = reactive<Common.TableColumns[]>([
            {
                title: '名字',
                dataIndex: 'name',
            },
            {
                title: '备注',
                dataIndex: 'alias',
            },
            {
                title: '是否好友',
                dataIndex: 'city',
                customRender:({ record: {friend} })=>{
                    const res = friend?'是':'否';
                    return (
                        <span>
                            {res}
                        </span>
                    )
                }
            },
            {
                title: '性别',
                dataIndex: 'gender',
                customRender:({ record: {gender} })=>{
                    const genderMap={
                        0:"未知",
                        1:"男",
                        2:"女"
                    }
                    return (
                        <span>
                            {genderMap[gender]}
                        </span>
                    )
                }
            },
            {
                title: '住址',
                dataIndex: 'city',
                customRender:({ record: {city,address,province} })=>{
                    const res = address || `${province}-${city}`
                    return (
                        <span>
                            {res}
                        </span>
                    )
                }
            },
            {
                title: '签名',
                dataIndex: 'signature',
            },
            {
                title: '操作',
                dataIndex: 'option',
                customRender:({ record })=>{
                    return (
                        <span>
                            <a-button size={"small"} type="primary" class='btn' shape="round" v-action={'bot:friend:send'}>发送文本</a-button>
                            <a-button size={"small"} type="primary" class='btn' shape="round" v-action={'bot:friend:send'}>发送素材</a-button>
                        </span>
                )
                }
            },
        ])
        return{
            columns,
            formJson
        }
    },
    render(){
        const {
            columns,
            formJson
        } = this;
        return(
            <div class="container">
                <TableLayout
                    ref="tableLayoutRef"
                    formJson={formJson}
                    columns={columns}
                    search={getFriendsList}
                ></TableLayout>
            </div>
        )
    }
})