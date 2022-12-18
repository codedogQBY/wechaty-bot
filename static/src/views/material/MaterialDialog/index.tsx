import CommonForm, {AcceptType, CommonFormItem} from '@/components/CommonForm';
import { computed, defineComponent, getCurrentInstance, ref } from 'vue';
import './index.less';
import {addMaterial, editMaterialById} from "@/api/system/material";
import {uploadFile} from'@/api/system/upload'
import { message } from 'ant-design-vue';


export type ActionType = 'edit' | 'add' | 'query';

const actionConfig = {
  edit: '编辑',
  add: '新增',
  query: '详情',
};

const defaultFormData = {
  id: -1,
  name:'',
  content:'',
  type:1,
  url:'',
};

export default defineComponent({
  components: {
    CommonForm,
  },
  emits: ['update'],
  props: {
    materialType: {
      type: Number,
      default: () => 1,
    },
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const commonFormRef = ref<InstanceType<typeof CommonForm>>();
    // 弹窗显示
    const visible = ref(false);
    const formData = ref({...defaultFormData,type:props.materialType});
    const type = ref<ActionType>('add');
    const title = computed(() => actionConfig[type.value]);
    const uploadLoading = ref<boolean>(false);
    const formJson = computed(function () {
      const disabled = type.value === 'query';
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      formData.value.type = props.materialType
      const commonFormItem: CommonFormItem[] = [
        {
          type:'radio-group',
          label:'类型',
          fieldName: 'type',
          className: 'row',
          vModel:formData.value.type,
          extraConfig: {
            disabled:true,
          },
          options:[
            {label:"文字",value:1},
            {label:"文件",value:2}
          ]
        },
        {
          type:'input',
          label:"名字",
          className: 'row',
          vModel:formData.value.name,
          fieldName: 'name',
          rules: [
            { required: true, message: '名字不能为空', trigger: 'blur' },
          ],
          extraConfig: {
            disabled:disabled,
          },
        }
      ]

      const textFormItem:CommonFormItem[] = [
        {
          type:'textarea',
          label:"内容",
          fieldName: 'content',
          vModel:formData.value.content,
          className: 'row',
          rules: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
          ],
          extraConfig: {
            disabled:disabled,
          },
        }
      ]

      const fileFormItem:CommonFormItem[] = [
        {
          type:'upload',
          label:"上传文件",
          fieldName: 'url',
          className: 'row',
          rules: [
            { required: true, message: '文件不能为空', trigger: 'blur' },
          ],
          extraConfig: {
            showUploadList: false,
            beforeUpload,
            disabled,
            acceptType: AcceptType.ALL,
          },
        }
      ]
      return [...commonFormItem,...(props.materialType === 1  ? textFormItem :fileFormItem)]
    })
    const handleOk = ()=>{
      if (type.value === 'query') {
        handleCancel();
        return false;
      }
      const callBack = () => {
        handleCancel();
        emit('update');
        instance?.proxy?.$message.success(`${title.value}成功`);
      };
      commonFormRef?.value?.formRef?.validate().then(() => {
        if (type.value === 'add') {
          addMaterial({
            ...formData.value,
          }).then(callBack);
        } else {
          editMaterialById({
            ...formData.value,
            id: formData.value.id as number,
          }).then(callBack);
        }
      });
    }
    const handleCancel = ()=>{
      visible.value = false;
      formData.value = {
        ...defaultFormData,
      };
      emit('update');
      commonFormRef?.value?.formRef?.resetFields();
    }
    const getData = ()=>{}
    const show = (newType: ActionType = 'add', val: (typeof defaultFormData) = defaultFormData)=>{
      type.value = newType;
      switch (newType) {
        case 'add': {
          formData.value = {
            ...defaultFormData,
          };
          break;
        }
        case 'edit':
        case 'query': {
          formData.value = {
            ...formData.value,
            id: val.id,
            name:val.name,
            content:val.content,
            type:val.type,
            url:val.url,
          };
          break;
        }
      }
      visible.value = true;
    }
    const beforeUpload = (file:File)=>{
      uploadLoading.value = true
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        message.error('文件大小不应大于20M');
        return false
      }
      const fileData = new FormData();
      fileData.append('file', file,file.name);
      uploadFile(fileData).then(data=>{
        const path = data.path
        formData.value.url = path
        uploadLoading.value = false
      })
      return false
    }
    return {
      visible,
      formData,
      type,
      title,
      formJson,
      handleOk,
      handleCancel,
      getData,
      show,
      commonFormRef,
    };
  },
  data() {
    return {};
  },

  mounted() {
    this.getData();
  },
  methods: {},
  render() {
    const {
      title,
      visible,
      handleOk,
      handleCancel,
      formData,
      formJson,
    } = this;
    return (
      <a-modal
        title={title}
        visible={visible}
        width="420px"
        cancelText="取消"
        okText="确定"
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CommonForm
          ref="commonFormRef"
          formData={formData}
          formJson={formJson}
        />
      </a-modal>
    );
  },
});
