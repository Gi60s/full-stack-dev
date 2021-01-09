<template>
  <div class="block-quote">
    <i class="el-icon-chat-dot-round"></i>
    <blockquote><slot></slot></blockquote>
    <div v-if="attribution" class="attribution">&mdash; {{ attribution }}</div>
  </div></template>

<script>
import marked from 'marked'

export default {
  name: 'question-answer',

  data () {
    return {

    }
  },

  props: ['attribution'],

  computed: {
    question () {
      return marked(this.q || '')
    }
  }
}
</script>

<style lang="stylus">
@import "../../assets/main.styl"

.block-quote {
  background-color: color-light-gray;
  border-radius: radius;
  padding: (pad / 2) pad;
  position: relative;
  overflow: hidden;
  margin: pad 0;

  > i {
    position: absolute;
    z-index: 0;
    color: color-white;
    font-size: 120px;
    font-weight: bold;
    top: 0;
    right: -20px;
    opacity: .8;
  }

  > blockquote {
    position: relative;
    z-index: 1;
    padding-right: 70px;
  }

  .attribution {
    position: relative;
    z-index: 1;
    text-align: left;
    margin-bottom: pad;
  }
}
</style>
