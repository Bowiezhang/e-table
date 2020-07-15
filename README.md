# e-table

> 模仿ant-design-vue后台系统提供的s-table，对element的table组件和pagination组件进行封装

## 组件例子

test.vue文件

该组件支持element table的所有api，el-table-column的api放在column数组中即可

## 组件额外添加的props

* data(Promise)：表格的数据来源，需要传入promise的函数，一般直接将后台所提供的api接入即可，出入参需要自行修改

* columns(Array)：表格的列表项，字段与el-table-column一致，额外添加scopedSlots字段，传入该字段时在表格插入内容（详见例子）

* selectionChange(Function)：原为table的@selection-change改为v-bind，用钩子传入组件调用,传入时自动展示选择项

* index(Boolean)：默认为false，传入true时展示type=index的列

## 组件提供方法

* refresh：刷新表格数据，传入true时返回第一页