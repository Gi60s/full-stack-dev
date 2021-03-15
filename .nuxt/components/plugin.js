import Vue from 'vue'

const components = {
  BlockQuote: () => import('../../components/global/block-quote.vue' /* webpackChunkName: "components/block-quote" */).then(c => c.default || c),
  ImageZoom: () => import('../../components/global/image-zoom.vue' /* webpackChunkName: "components/image-zoom" */).then(c => c.default || c),
  QuestionAnswer: () => import('../../components/global/question-answer.vue' /* webpackChunkName: "components/question-answer" */).then(c => c.default || c),
  Logo: () => import('../../components/Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c),
  Search: () => import('../../components/Search.vue' /* webpackChunkName: "components/search" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
