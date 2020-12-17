export { default as BlockQuote } from '../../components/global/block-quote.vue'
export { default as ImageZoom } from '../../components/global/image-zoom.vue'
export { default as QuestionAnswer } from '../../components/global/question-answer.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as Search } from '../../components/Search.vue'

export const LazyBlockQuote = import('../../components/global/block-quote.vue' /* webpackChunkName: "components/global/block-quote" */).then(c => c.default || c)
export const LazyImageZoom = import('../../components/global/image-zoom.vue' /* webpackChunkName: "components/global/image-zoom" */).then(c => c.default || c)
export const LazyQuestionAnswer = import('../../components/global/question-answer.vue' /* webpackChunkName: "components/global/question-answer" */).then(c => c.default || c)
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/Logo" */).then(c => c.default || c)
export const LazySearch = import('../../components/Search.vue' /* webpackChunkName: "components/Search" */).then(c => c.default || c)
