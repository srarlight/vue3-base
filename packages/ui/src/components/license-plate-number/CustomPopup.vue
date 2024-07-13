<template>
    <div class="popup">
      <transition name="fade">
        <div class="popup-overlay" @click="clickMask" v-show="show"></div>
      </transition>
      <transition name="slide">
        <div class="popup-content" v-show="show">
          <slot></slot>
        </div>
      </transition>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'CustomPopup',
    props: {
      show: {
        type: Boolean,
        default: true
      },
      onClose: {
        type: Function
      }
    },
    emits: ['update:show', 'close'],
    setup(_, { emit }) {
      const clickMask = () => {
        emit('close')
        emit('update:show', false)
      }
  
      return {
        clickMask
      }
    }
  })
  </script>
  
  <style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translate3d(0, 100%, 0);
  }
  
  .popup {
    .popup-overlay {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100vh;
      width: 100vw;
      background: rgba(0, 0, 0, 0.5);
    }
    .popup-content {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      transition: transform 0.3s;
      z-index: 100;
    }
  }
  </style>
  