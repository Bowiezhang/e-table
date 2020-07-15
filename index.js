import T from 'element-ui/lib/table'

export default {
  props: {
    ...T.props,

    data: {
      type: Function,
      required: true,
    },

    columns: {
      type: Array,
      required: true,
    },

    selectionChange: {
      type: Function,
      default: null,
    },

    index: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      pageNumber: 1,
      pageSize: 10,
      total: 0,

      localDataSource: [],
    }
  },

  methods: {
    /**
     * 表格重新加载
     * 如果参数为 true, 则强制刷新到第一页
     * @param {Boolean} bool
     */
    refresh(bool = false) {
      bool && (this.pageNumber = 1)
      this.loadData()
    },

    loadData() {
      this.$emit('load-data')

      const parameter = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      }

      const result = this.data(parameter)

      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then(({ data }) => {
          this.total = data && data.total ? data.total : 0

          this.localDataSource = data && data.list ? data.list : []

          if (data && data.list && data.list.length === 0 && this.pageNumber > 1) {
            this.pageNumber--
            this.loadData()
            return
          }
        })
      }
    },

    currentChange(page) {
      this.pageNumber = page
      this.loadData()
    },

    sizeChange(size) {
      this.pageSize = size
      this.pageNumber = 1
      this.loadData()
    },

    onChange(row) {
      this.selectionChange(row)
    },
  },

  render() {
    const props = {}
    Object.keys(T.props).forEach((k) => {
      if (k === 'data') {
        props[k] = this.localDataSource
      } else {
        this[k] && (props[k] = this[k])
      }
      return props[k]
    })
    const table = (
      <el-table {...{ props }} on-selection-change={this.onChange}>
        {this.selectionChange ? <el-table-column type="selection" width="55"></el-table-column> : ''}
        {this.index ? <el-table-column type="index" width="50"></el-table-column> : ''}
        {this.columns.map((item) => {
          if (!item.scopedSlots) {
            return <el-table-column {...{ props: item }}></el-table-column>
          } else {
            return (
              <el-table-column
                {...{
                  props: item,
                  scopedSlots: {
                    default: (props) => {
                      if (this.$scopedSlots[item.scopedSlots]) {
                        return this.$scopedSlots[item.scopedSlots]({ row: props.row, text: props.row[item.prop] })
                      } else {
                        return
                      }
                    },
                  },
                }}
              ></el-table-column>
            )
          }
        })}
      </el-table>
    )
    const pagination = (
      <el-pagination
        current-page={this.pageNumber}
        page-size={this.pageSize}
        page-sizes={[5, 10, 20, 100]}
        total={this.total}
        layout="total, sizes, prev, pager, next, jumper"
        on-current-change={this.currentChange}
        on-size-change={this.sizeChange}
      ></el-pagination>
    )
    return (
      <div class="table-wrapper">
        {table}
        {pagination}
      </div>
    )
  },

  created() {
    this.loadData()
  },
}
