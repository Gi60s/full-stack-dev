<template>
  <el-autocomplete
    popper-class="search"
    v-model="query"
    :fetch-suggestions="querySearch"
    :trigger-on-focus="false"
    type="search"
    placeholder="Search"
    @select="handleSelect">
    <!-- <i
      class="el-icon-search el-input__icon"
      slot="suffix"
      @click="handleIconClick">
    </i> -->
    <template slot-scope="{ item }">
      <div class="title">{{ item.title }}</div>
      <div class="crumbs" v-if="item.crumbs">{{ item.crumbs }}</div>
      <div class="description">{{ item.blurb }}</div>
    </template>
  </el-autocomplete>
</template>

<script>
export default {
  data () {
    return {
      query: ''
    }
  },

  props: ['searchFunction', 'version'],

  methods: {
    handleSelect (item) {
      this.$router.push(item.realPath)
    },
    async querySearch (query, callback) {
      this.searchFunction(query, callback)
    }
  }
}
</script>

<style>

.search .title {
  font-weight: bold;
  font-size: 150%;
  line-height: 1.2em;
  padding: .7em 0 0 0;
}

.search .crumbs {
  margin-top: -6px;
  font-style: italic;
  opacity: .8;
}

.search .description {
  font-size: 90%;
  line-height: 1.2em;
  padding: .7em 0 0 0;
  margin-bottom: 1em;
  white-space: normal;
  /* border-bottom: 1px solid #EEE; */
  max-height: 4.6em;
  text-overflow: ellipsis;
}
</style>
