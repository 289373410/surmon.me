<template>
  <div v-show="loading" class="spinner-box">
    <div class="spinner-inner">
      <div class="la-ball-beat">
        <div :style="spinnerStyle" />
        <div :style="spinnerStyle" />
        <div :style="spinnerStyle" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, h } from 'vue'
  export default defineComponent({
    name: 'Spin',
    props: {
      loading: {
        type: Boolean,
        default: true
      },
      color: {
        type: String,
        default: 'rgba(197, 197, 197, 0.4)'
      },
      height: {
        type: String,
        default: '15px'
      },
      width: {
        type: String,
        default: '15px'
      },
      margin: {
        type: String,
        default: '5px'
      }
    },
    data() {
      return {
        spinnerStyle: {
          backgroundColor: this.color,
          height: this.height,
          width: this.width,
          margin: this.margin
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .spinner-box {
    position: relative;
    width: 100%;
    min-height: 50px;
    height: 100%;

    @keyframes ball-beat {
      50% {
        opacity: 0.2;
        transform: scale(0.75);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    > .spinner-inner {
      width: 80px;
      height: 30px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -40px;
      margin-top: -15px;

      > .la-ball-beat {
        display: block;
        position: relative;
        box-sizing: border-box;
        font-size: 0;
        color: $white;
        width: 80px;
        height: 30px;

        > div {
          position: relative;
          box-sizing: border-box;
          display: inline-block;
          float: none;
          border: none;
          width: 15px;
          height: 15px;
          margin: 5px;
          background-color: $module-bg-hover;
          animation: ball-beat 0.7s -0.15s infinite linear;

          &:nth-child(2n-1) {
            animation-delay: -0.5s;
          }
        }

        &.la-sm {
          width: 26px;
          height: 8px;

          > div {
            width: 8px;
            height: 8px;
            margin: 3px;
          }
        }

        &.la-2x {
          width: 108px;
          height: 36px;

          > div {
            width: 20px;
            height: 20px;
            margin: 8px;
          }
        }

        &.la-3x {
          width: 162px;
          height: 54px;

          > div {
            width: 30px;
            height: 30px;
            margin: 12px;
          }
        }
      }
    }
  }
</style>
