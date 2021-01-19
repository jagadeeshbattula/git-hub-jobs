<template>
  <div class="container search-container">
    <div class="row search-row inner-background-color text-color">
      <div class="col-lg-4 col-sm-12 mt-2 mb-2 p-0 border-right">
        <input type="text" class="form-control border-0 inner-background-color text-color" id="job-description" placeholder="Job description" v-model="search.description">
      </div>
      <div class="col-lg-4 col-sm-12 mt-2 mb-2 p-0 border-right">
        <input type="text" class="form-control border-0 inner-background-color text-color" id="job-location" placeholder="Job location" v-model="search.location">
      </div>
      <div class="col-lg-3 col-sm-12 form-check m-2 pt-1">
        <input class="form-check-input mt-2 inner-background-color text-color" type="checkbox" v-model="search.fullTimeOnly" id="full-time-jobs">
        <label class="form-check-label" for="full-time-jobs">
          Full time only
        </label>

        <button :disabled="hasNoSearchData" type="button" class="btn btn-primary" @click.prevent="getSearchResults">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ApiHelper from '@/helpers/apis'
import { isEmpty as _isEmpty } from 'lodash'

export default {
  name: 'SearchPanel',
  data () {
    return {
      searchData: {
        description: '',
        location: '',
        fullTimeOnly: false
      }
    }
  },
  mounted () {
    this.onMounted()
  },
  computed: {
    ...mapGetters({
      search: 'search'
    }),
    hasNoSearchData () {
      return _isEmpty(this.searchData.description) &&
        _isEmpty(this.searchData.location) &&
        this.searchData.fullTimeOnly === false
    }
  },
  methods: {
    ...mapActions({
      setSearch: 'setSearch',
      setJobsList: 'setJobsList'
    }),
    async onMounted () {
      this.searchData = this.search
      if (this.hasNoSearchData) {
        await ApiHelper.getDefaultGeoLocation(this)
      }
    },
    getSearchResults () {
      const searchPayload = {
        search: this.searchData
      }
      this.setSearch(searchPayload)
      ApiHelper.getJobsList(this)
    }
  }
}
</script>

<style scoped>
.search-container {
  margin-top: -30px;
}

.search-row {
  max-width: 845px;
  border-radius: 5px;
  margin: 0 auto
}
</style>
