<template>
  <div class="ml-progress">
    {{value}}
    <div class="ml-progress-circle ml-border" ref="progressCircle"></div>
  </div>
</template>
<script type="text/babel">
  export default {
    name: 'progress',
    props: {
      value: {
        type: Number,
        default: 0,
      }
    },
    data() {
      return {
        slipLeft: 0,
        dragObject: {},
      }
    },
    methods: {
      /**
       * 动画
       */
      translate($el, offset, callback) {
        $el.style.webkitTransition = ''
        $el.style.webkitTransform = `translate3d(${offset}px,-50%,0)`
        if (callback) callback.apply({}, arguments)
      },
      /**
       * 触发开发
       */
      touchStart(e) {
        const $el = this.$el
        const dragObject = this.dragObject
        const touch = e.touches ? e.touches[0] : e
        dragObject.startLeft = touch.pageX // 开始left值
        dragObject.$elWidth = $el.offsetWidth
      },
      /**
       * 触发移动
       */
      touchMove(e) {
        const dragObject = this.dragObject
        const touch = e.touches ? e.touches[0] : e
        dragObject.distanceX = touch.pageX - dragObject.currentLeft
        dragObject.currentLeft = touch.pageX
        let offsetLeft = dragObject.currentLeft - dragObject.startLeft
        if (Math.abs(offsetLeft) < 2) return
        this.log(offsetLeft)
        e.preventDefault()
        e.stopPropagation()
        this.translate(this.$refs.progressCircle, offsetLeft)
      },
      /**
       * 触发结束
       */
      touchEnd() {
        this.dragObject = {}
      },
    },
    mounted() {
      const $el = this.$refs.progressCircle
      $el.addEventListener('touchstart', (e) => {
        this.touchStart(e)
      })
      $el.addEventListener('touchmove', (e) => {
        this.touchMove(e)
      })
      $el.addEventListener('touchend', (e) => {
        this.touchEnd(e)
      })
    },
  }
</script>