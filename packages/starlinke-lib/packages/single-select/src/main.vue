<template>
  <div class="sl-single-select">
    <el-select
      v-model="value"
      :placeholder="label"
      clearable
      style="width:100%"
      @change="selectChange"
    >
      <el-option
        v-for="(selectItem, index) in selfOptions"
        :key="'option_' + index"
        :label="selectItem.label"
        :value="selectItem.value"
      />
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'SlSingleSelect',
  model: {
    prop: 'modelVal',
    event: 'valChange'
  },
  props: {
    modelVal: {
      type: [String, Number],
      required: true,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: '请选择'
    }
  },
  data() {
    return {
      value: null,
      selfOptions: []
    }
  },
  watch: {
    modelVal: {
      handler: function(newVal) {
        this.value = newVal
      }
    },
    options: {
      handler: function(val, oldVal) {
        if (Array.isArray(val)) {
          this.selfOptions = val
        }
      },
      immediate: true
    }
  },
  methods: {
    selectChange() {
      this.$emit('valChange', this.value)
    },
    reset() {
      this.value = null
      this.selfOptions = []
    }
  }
}
</script>
<style lang="scss"></style>
