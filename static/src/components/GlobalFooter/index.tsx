import { defineComponent } from 'vue';
import './index.less';
export default defineComponent({
  render() {
    return (
      <div class="global-footer">
        <div class="links">
          <a
            href="https://juejin.cn/column/7131913396370276382"
            target="_blank"
          >
            Blog
          </a>

          <a href="https://github.com/fhtwl/vue3-ts-antd-admin" target="_blank">
            GitHub
          </a>

          <a href="https://github.com/fhtwl" target="_blank">
            @Fhtwl
          </a>
        </div>
        <div class="copyright">
          Copyright &copy; 2022
        </div>
      </div>
    );
  },
});
