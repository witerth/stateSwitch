<template>
  <div
    ref="switchBox"
    class="switch-box switch-box-basic"
    :class="{ 'is-disabled': disabled, 'is-checked': checked }"
    @click.prevent="switchValue">
    <input
      class="state-switch-input"
      type="checkbox"
      @change="handleChange"
      ref="input"
      :true-value="openValue"
      :false-value="closeValue"
      :disabled="disabled"
      @keydown.enter="switchValue"
    >
    <span ref="open" class="open">{{ openText }}</span>
    <span ref="close" class="close">{{ closeText }}</span>
    <div
      ref="switchMove"
      class="switch-move switch-box-basic"
      :style="{transform: !checked ? switchMoveTrans : ''}">
      <div
        ref="switchMoveC"
        class="switch-move-c switch-box-basic"
        :style="{transform: !checked ? switchMoveCTrans : ''}">
        <span ref="openBelow" class="open below">{{ openText }}</span>
        <span ref="closeBelow" class="close below">{{ closeText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StateSwitch',
  props: {
    value: {
      type: [Boolean, String, Number],
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    openText: {
      type: String,
      default: '打开'
    },
    closeText: {
      type: String,
      default: '关闭'
    },
    openValue: {
      type: [Boolean, String, Number],
      default: true
    },
    closeValue: {
      type: [Boolean, String, Number],
      default: false
    },
    duration: {
      type: Number,
    }
  },
  data() {
    return {
      switchMoveTrans: '',
      switchMoveCTrans: '',
      parentNodes: [],
      noneNodes: []
    }
  },
  computed: {
    checked() {
      return this.value === this.openValue;
    }
  },
  watch: {
    checked() {
      this.$refs.input.checked = this.checked;
    }
  },
  mounted() {
    let el = [this.$refs.switchBox];
    this.getParentNode(el);
    this.parentNodes.forEach(item => {
      if (item.style.display === 'none') {
        this.noneNodes.push(item);
        item.style.display = 'block';
        item.style.visibility = 'hidden';
      }
    })

    let switchMoveWidth = Math.max(+this.$refs.close.clientWidth, +this.$refs.open.clientWidth);
    this.$refs.switchBox.style.width = switchMoveWidth * 2 + 'px';
    this.$refs.switchMove.style.width = switchMoveWidth + 'px';
    this.$refs.switchMoveC.style.width = switchMoveWidth * 2 + 'px';
    this.$refs.open.style.width = switchMoveWidth + 'px';
    this.$refs.close.style.width = switchMoveWidth + 'px';
    this.$refs.openBelow.style.width = switchMoveWidth + 'px';
    this.$refs.closeBelow.style.width = switchMoveWidth + 'px';
    this.switchMoveTrans = `translateX(${switchMoveWidth}px)`;
    this.switchMoveCTrans = `translateX(-${switchMoveWidth}px)`;
    if (this.duration) {
      this.$refs.switchMove.style.transitionDuration = this.duration + 's'
      this.$refs.switchMoveC.style.transitionDuration = this.duration + 's'
    }

    this.noneNodes.forEach(item => {
      item.style.display = 'none';
      item.style.visibility = '';
    })
    this.noneNodes = [];
  },
  methods: {
    handleChange(event) {
      const val = this.checked ? this.closeValue : this.openValue;
      this.$emit('input', val);
      this.$emit('change', val);
      this.$nextTick(() => {
        // set input's checked property
        // in case parent refuses to change component's value
        this.$refs.input.checked = this.checked;
      });
    },
    switchValue(e) {
      if (e.target.className.includes('open') !== this.checked || e.target.className.includes('close') !== !this.checked) {
        !this.disabled && this.handleChange();
      }
    },
    getParentNode (arr) {
      arr.push(arr[arr.length - 1].parentNode);
      if (arr[arr.length - 1].id === 'app') {
        this.parentNodes = arr;
        return;
      }
      this.getParentNode(arr);
    }
  }
}
</script>

<style scoped>
  .switch-box {
    position: relative;
    background-color: rgb(236, 245, 255);
    cursor: pointer;
  }
  .switch-box-basic {
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 14px;
  }
  .state-switch-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  span {
    position: absolute;
    padding: 0 20px;
    display: inline-block;
    text-align: center;
    user-select: none;
    color: #303133;
    text-align: center;
  }
  .open {
    left: -20px;
  }
  .close {
    right: -20px;
  }
  .below {
    color: #fff;
  }
  .open.below {
    padding-right: 0;
  }
  .close.below {
    padding-left: 0;
  }
  .switch-move {
    position: absolute;
    left: 0;
    transition: transform 0.3s linear;
    overflow: hidden;
    background-color: #409eff;
  }
  .switch-move-c {
    position: relative;
    transition: transform 0.3s linear;
  }
  .is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
</style>
