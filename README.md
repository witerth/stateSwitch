# stateSwitch
### 开关滑块组件

仿照element-ui开关组件源码改造了一个开关滑块组件，目前只有vue2的

效果如下：

![image-20210225174310770](./public/img/8utbm-6r5vf.gif)

### 使用方法

首先使用npm下载

`npm i vue-state-switch `

使用代码如下：

```vue
<template>
  <div>
    <state-switch v-model="state"/>
  </div>
</template>

<script>
import stateSwitch from 'vue-state-switch'
export default {
  components: {
    stateSwitch
  },
  data() {
    return {
      state: true
    }
  }
}
</script>
```



### Attributes

| 参数            | 说明           | 类型                      | 默认值 |
| --------------- | -------------- | ------------------------- | ------ |
| value / v-model | 绑定值         | boolean / string / number | true   |
| disabled        | 是否禁用       | boolean                   | false  |
| openText        | 打开的文字描述 | string                    | 打开   |
| closeText       | 关闭的文字描述 | string                    | 关闭   |
| openValue       | 打开时的值     | boolean / string / number | true   |
| closeValue      | 关闭时的值     | boolean / string / number | false  |
| duration        | 过渡时间, 秒   | number                    | —      |

