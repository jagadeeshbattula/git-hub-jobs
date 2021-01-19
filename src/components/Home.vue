<template>
  <div>
    <app-header />
    <search-panel />
    <list-container />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import SearchPanel from '@/components/SearchPanel'
import ListContainer from '@/components/ListContainer'

export default {
  name: 'Home',
  components: {SearchPanel, ListContainer, AppHeader},
  data () {
    return {
    }
  },
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
