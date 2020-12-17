<template>
  <div class="image-zoom" :class="zoomClass">
    <div ref="overlay" class="overlay" @click="zoom = 0"></div>
    <img ref="image" :alt="alt" :src="src" @click="nextZoom()">
    <img class="image-2" :alt="alt" :src="src"  @click="nextZoom()">
  </div></template>

<script>
import marked from 'marked'

export default {
  name: 'image-zoom',

  data () {
    return {
      zoom: 0
    }
  },

  props: ['alt', 'src'],

  methods: {
    isZoomable () {
      const image = this.$refs.image
      if (!image) return false
      return image.width < image.naturalWidth || image.height < image.naturalHeight
    },
    nextZoom () {
      if (this.zoom > 0) {
        this.zoom = 0
      } else if (this.isZoomable()) {
        this.zoom = 1
      }
      console.log(this.zoom)
    }
  },

  computed: {
    zoomClass () {
      const classes = []
      if (this.isZoomable() || this.zoom > 0) classes.push('zoomable')
      classes.push('zoom-' + this.zoom)
      return classes.join(' ')
    }
  }
}
</script>

<style lang="stylus" scoped>
.image-zoom {
  max-width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;

  .overlay {
    position: fixed;
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -2;
    opacity: 0;
    background: rgba(0, 0, 0, .53);
    transition: all ease-in-out 300ms;
  }

  .image-2 {
    position: fixed;
    z-index: -2;
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all ease-in-out 300ms;
  }

  &.zoomable {
    img {
      cursor: pointer;
    }
  }

  &.zoom-1, &.zoom-2 {
    .overlay {
      opacity: 1;
      z-index: 5;
    }

    .image-2 {
      max-width: 100%;
      opacity: 1;
      z-index: 6;
    }
  }

  &.zoom-2 {

    .image-2 {
      max-width: none;
      cursor: move;
    }
  }
}
</style>
