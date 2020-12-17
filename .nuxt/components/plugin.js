import Vue from 'vue'

const globalComponents = {
  BlockQuote: () => import('../../components/global/block-quote.vue' /* webpackChunkName: "components/global/block-quote" */).then(c => c.default || c),
  ImageZoom: () => import('../../components/global/image-zoom.vue' /* webpackChunkName: "components/global/image-zoom" */).then(c => c.default || c),
  QuestionAnswer: () => import('../../components/global/question-answer.vue' /* webpackChunkName: "components/global/question-answer" */).then(c => c.default || c)
}

for (const name in globalComponents) {
  Vue.component(name, globalComponents[name])
}
