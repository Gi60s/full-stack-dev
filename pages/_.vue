<template>
  <div class='page'>
    <div class="overlay" :class="{ 'show-overlay': overlay }" @click="overlay = false"></div>

    <div class='header'>
      <div class="center">
        <!-- site title / header -->
        <div class="site-header">
          <nuxt-link to="/">
            <h1>Full Stack Web</h1>
          </nuxt-link>
        </div>
        <div class="spacer"></div>

        <!-- mobile view menu button -->
        <el-button class="mobile-menu-button" icon="el-icon-menu" @click="overlay = !overlay"></el-button>

        <div class="site-navigation">
          <search :search-function="runSearch" />
        </div>
      </div>
    </div>

    <div class='body center'>

      <!-- left navigation -->
      <div class='aside-left' :class="{ 'show-navigation': overlay }">

        <!-- mobile navigation -->
        <div class="mobile-content">

          <!-- mobile search -->
          <div class="mobile-menu-group" :class="{ 'active-menu': mobileMenu === 'Search' }">
            <div class="mobile-menu-button" @click="setMobileMenu('Search')">Search</div>
            <div class="mobile-menu-group-content mobile-menu-search">
              <el-input id="mobile-search-input" placeholder="Search" v-model="mobileSearch" clearable></el-input>
              <div class="mobile-search-content">
                <p v-if="mobileSearch === ''">Search above.</p>
                <p v-if="mobileSearch !== '' && mobileSearchResults.length === 0">No results.</p>
                <div class="mobile-search-result" @click="$router.push(item.path)" v-for="(item, index) in mobileSearchResults" :key="index">
                  <div class="mobile-search-result-title">{{item.title}}</div>
                  <div class="mobile-search-result-blurb">{{item.blurb}}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- mobile site navigation -->
          <div class="mobile-menu-group" :class="{ 'active-menu': mobileMenu === 'Site Navigation' }">
            <div class="mobile-menu-button" @click="setMobileMenu('Site Navigation')">Site Navigation</div>
            <div class="mobile-menu-group-content">
              <ul>
                <li v-for="navItem in navigation.menu[navigation.mode]" :key="navItem.path">
                  <nuxt-link v-if="!navItem.children" :to="'/' + navItem.path">{{ navItem.title }}</nuxt-link>
                  <div class="nav-group" v-else>
                    <div class="nav-group-title">{{ navItem.title }}</div>
                    <ul v-if="navItem.children">
                      <li v-for="child in navItem.children" :key="child.path">
                        <nuxt-link :to="'/' + child.path">{{ child.title }}</nuxt-link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- mobile table of contents -->
          <div v-if="doc && doc.toc && !doc.noRightColumn && doc.toc.length" class="mobile-menu-group" :class="{ 'active-menu': mobileMenu === 'Page Content' }">
            <div class="mobile-menu-button" @click="setMobileMenu('Page Content')">Page Content</div>
            <div class="mobile-menu-group-content">
              <ul>
                <li v-for="link of doc.toc" :key="link.id" :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }">
                  <NuxtLink :to="'#' + link.id">{{ link.text }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- mobile ecosystem -->
          <div class="mobile-menu-group" :class="{ 'active-menu': mobileMenu === 'Ecosystem' }">
            <div class="mobile-menu-button" @click="setMobileMenu('Ecosystem')">Ecosystem</div>
            <div class="mobile-menu-group-content">
              <a class="ecosystem" v-for="item in navigation.ecosystem" :key="item.url" :href="item.url" target="_blank">{{ item.title }}</a>
            </div>
          </div>
        </div>

        <ul class="site-navigation">
          <div class="mode-toggle">
            <el-switch v-model="navigation.mode"
                       active-value="topics"
                       active-color="#13ce66"
                       active-text="Organize by Topics"
                       inactive-value="ordered"
                       inactive-color="#ff4949"
            ></el-switch>
          </div>
          <li v-for="(navItem, i) in navigation.menu[navigation.mode]" :key="i">
            <nuxt-link v-if="!navItem.children" :to="'/' + navItem.path">{{ navItem.title }}</nuxt-link>
            <div class="nav-group" v-else>
              <div class="nav-group-title">{{ navItem.title }}</div>
              <ul v-if="navItem.children">
                <li v-for="child in navItem.children" :key="child.path">
                  <nuxt-link :to="'/' + child.path">{{ child.title }}</nuxt-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div ref="content" class='content'>

        <h1 v-if="doc">{{ doc.title }}</h1>

        <nuxt-content :document="doc" />
      </div>

      <div class='aside-right' v-if="doc && doc.toc && !doc.noRightColumn">
        <div v-if="doc.toc.length">
          <h4>Page Content</h4>
          <div class="toc">
            <ul>
              <li v-for="link of doc.toc" :key="link.id" :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }">
                <NuxtLink :to="'#' + link.id">{{ link.text }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div>
        <a href="https://www.npmjs.com/package/openapi-enforcer-middleware" target="_blank">NPM</a>
        |
        <a href="https://github.com/byu-oit/openapi-enforcer-middleware" target="_blank">Github</a>
      </div>
      <div class="edit-this-page">
        Caught a mistake or want to contribute to the documentation?
        <a :href="'https://github.com/byu-oit/openapi-enforcer-middleware/tree/master/website/content' + editPath" target="_blank">
          Edit this page on Github.
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Search from '@/components/Search'

let navigationMenu = null

document.addEventListener('click', e => {
  if (e.target.getAttribute('aria-hidden') === 'true') {
    e.target.blur()
    e.preventDefault()
  }
})

export default {
  components: {
    Search
  },

  // async beforeRouteEnter  (to, from, next) {
  //   next()
  // },

  // async beforeRouteUpdate (to, from, next) {
  //   await loadPageData(this, this.$content, to.path)
  //   next()
  // },

  mounted () {
    console.log('page component mounted')

    setTimeout(() => {
      // TODO: if an image loads this will be out of position once the image completes
      if (window.location.hash) {
        const hash = window.location.hash
        const el = document.querySelector('a[href="' + hash + '"]')
        if (el) el.scrollIntoView()
      }
    }, 0)
  },

  async asyncData({$content, $router, params}) {

    if (!navigationMenu) {
      const { data } = await axios.get('/navigation.json')
      navigationMenu = data
    }

    const path = params.pathMatch || '/'
    let doc = null
    let isIndex = path === '/'
    try {
      doc = await $content(path === '/' ? 'index' : path).fetch()
    } catch (e) {
      isIndex = true
      doc = await $content(path, 'index').fetch()
    }
    if (Array.isArray(doc)) {
      const matchPath = '/' + path.replace(/^\//, '').replace(/\/$/, '')
      doc = doc.filter(d => {
        const p = d.path.replace(/\/index$/, '')
        return p === matchPath
      })[0]
    }

    return {
      editPath: path.replace(/\/$/, '') + (isIndex && doc ? '/index' : '') + '.md',
      doc,
      navigation: {
        mode: 'ordered',
        path,
        menu: navigationMenu
      },
      mobile: {
        overlay: false,
        search: '',
        searchResults: []
      },
      mobileMenu: 'Site Navigation',
      mobileSearch: '',
      mobileSearchResults: [],
      overlay: false,
      query: ''
    }
  },

  computed: {

  },

  methods: {
    setMobileMenu(key) {
      this.mobileMenu = key
      if (key === 'Search') {
        setTimeout(() => document.getElementById('mobile-search-input').focus(), 50)
      } else {
        this.mobileSearch = ''
      }
    },
    async runSearch (query, callback) {
      if (!query) {
        return callback([])
      } else {
        const data = await this.$content(null, { deep: true })
          .search(query)
          // .only(['title', 'description', 'path'])
          .fetch()

        // score search results and create blurbs
        const q = query.toLowerCase()
        let results = []
        data.forEach(result => {
          result = Object.assign({}, result)
          let score = 0
          let realPath = result.path

          // default the blurb to the description
          result.blurb = result.description

          // extra points if it's the page title
          const title = result.title.toLowerCase()
          const index = title.indexOf(q)
          if (title === q) {
            score += 6
          } else if (index !== -1) {
            score += 4
          }
          if (index === 0 || title[index - 1] === ' ') score += 2

          // extra points for being in table of contents
          const tocLength = result.toc.length
          let h2 = ''
          let tocMatch = false
          for (let i = 0; i < tocLength; i++) {

            const toc = result.toc[i]
            const text = toc.text.toLowerCase()
            const index = text.indexOf(q)

            if (toc.depth === 2) h2 = toc.text

            if (text === q) {
              results.push({
                title: toc.depth === 2 ? toc.text : h2 + ' > ' + toc.text,
                blurb: 'Page: ' + result.title,
                realPath: result.path + '#' + toc.id,
                score: 5 + toc.depth
              })
              tocMatch = true
            } else if (index !== -1) {
              results.push({
                title: toc.depth === 2 ? toc.text : h2 + ' > ' + toc.text,
                blurb: 'Page: ' + result.title,
                realPath: result.path + '#' + toc.id,
                score: (index === 0 || text[index - 1] === ' ' ? 1 : 0) + 3 + toc.depth
              })
              tocMatch = true
            }
          }

          // if a result was not already added for this page then add one now
          if (!tocMatch) {
            results.push({
              title: result.title,
              blurb: result.description,
              realPath: result.path,
              score: 0
            })
          }
        })

        // sort results to best matches
        results.sort((a, b) => {
          return a.score > b.score ? -1 : 1
        })

        // limit results to 7 or fewer
        results = results.slice(0, 7)

        console.log('search results', results.map(v => JSON.parse(JSON.stringify(v))))
        callback(results)
      }
    }
  },

  watch: {
    mobileSearch (newValue, oldValue) {
      this.runSearch(newValue, results => {
        this.mobileSearchResults = results
      })
    },

    overlay (newValue) {
      if (newValue === true) {
        this.mobileMenu = 'Site Navigation'
      }
    }
  }
}

// function getCookie(cname) {
//   const name = cname + "=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(';');
//   for(let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

</script>

<style lang="stylus">

</style>
