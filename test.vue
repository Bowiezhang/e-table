<template>
  <div>
    <s-table ref="table" :columns="columns" :data="loadData">
      <template slot="action" slot-scope="{ text, row }">
        <div>{{ text }}</div>
        <div>{{ row }}</div>
      <template>
    </s-table>
  </div>
</template>

<script>
import Stable from './index'

export default {
  name: 'table-test',

  data() {
    this.columns = [
      { title: '名称', dataIndex: 'name' },
      { title: '测试项目', dataIndex: 'a' },
      { title: '操作', align: 'center', scopedSlots: 'action' },
    ]

    return {
      queryParam: {},
      loadData: (parameter) => new Promise(resolve => resolve()),
    }
  }
}
</script>

<style>

</style>