<template>
  <div>
    <!-- 编辑SKU -->
    <el-dialog
      :lock-scroll="false"
      :title="'批量查询' + label"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :append-to-body="true"
      width="800px"
    >
      <el-form
        ref="form"
        :label-width="labelWidth"
      >
        <el-form-item :label="label">
          <el-input
            v-model="skuCodes"
            :placeholder="`请输入${label}`"
            :autosize="{ minRows: 10 }"
            clearable
            type="textarea"
            @input="
              () => {
                this.$forceUpdate()
              }
            "
          />
        </el-form-item>
        <el-form-item>
          <div style="font-size: 14px; color: #666">
            备注：一行一个，或英文逗号分隔，最多支持{{ maxLen }}个批量搜索
          </div>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button
            type="primary"
            @click="onSubmitBtn"
          >
            确定
          </el-button>
          <el-button @click="visible = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'SkuBatchDialog',
  props: {
    maxLen: {
      type: Number,
      default: 200
    },
    label: {
      type: String,
      default: ''
    },
    labelWidth: {
      type: String,
      default: '80px'
    }
  },
  data() {
    return {
      visible: false,
      skuCodes: ''
    }
  },
  methods: {
    show(skuCodes) {
      this.visible = true
      this.skuCodes = skuCodes
    },
    onSubmitBtn() {
      const { skuCodes } = this
      let returns = ''
      if (skuCodes && skuCodes.trim()) {
        let skuArr = skuCodes
          .split(/\r\n|[\r\n]/)
          .join(',')
          .split(',')
          .filter((sku) => sku && sku.trim())
        skuArr.forEach((item, i) => {
          skuArr[i] = item.trim()
        })
        if (skuArr.length > this.maxLen) {
          this.$message.warning(`超出允许输入最大数量${this.maxLen}个，已自动截取！`)
          skuArr.length = this.maxLen
        }
        returns = skuArr.join(',')
      }
      this.visible = false
      this.$emit('submit', returns)
    }
  }
}
</script>
<style lang="scss" scoped></style>
