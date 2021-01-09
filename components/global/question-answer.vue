<template>
  <div class="question-answer" :class="{ 'collapsed': collapsed }" @click="collapsed = !collapsed">
<!--    <i class="el-icon-question"></i>-->
    <div class="question">
      <div class="title">Question:</div>
      <div v-if="q" v-html="question"></div>
      <slot v-else name="question"></slot>
    </div>
    <div class="answer">
      <div class="title">Answer:</div>
      <slot></slot>
    </div>
  </div></template>

<script>
import marked from 'marked'

export default {
  name: 'question-answer',

  data () {
    return {
      collapsed: true
    }
  },

  props: ['q'],

  computed: {
    question () {
      return marked(this.q || '')
    }
  }
}
</script>

<style lang="stylus">
@import "../../assets/main.styl"

.question-answer {
  background: #EFC9AF;
  margin: 15px 0;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  > * {
    position: relative;
    z-index: 1;
  }

  > i {
    position: absolute;
    z-index: 0;
    color: color-white;
    font-size: 120px;
    font-weight: bold;
    top: 0;
    right: -20px;
    opacity: .6;
  }

  .title {
    margin-bottom: 15px;
    font-weight: bold;
  }

  .question {
    padding: 10px;

    &:after {
      display: none;
      margin-top: 10px;
      content: 'Click to show answer';
      font-style: italic;
      font-size: 90%;
    }
  }

  .answer {
    padding: 10px;
  }

  &.collapsed {
    .answer {
      display: none;
    }
    .question:after {
      display: block;
    }
  }
}
</style>
