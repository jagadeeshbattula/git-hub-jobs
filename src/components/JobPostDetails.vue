<template>
  <div>
    <app-header />
    <div class="container search-container">
      <nav class="navbar navbar-expand-lg static-top inner-background-color">
        <div class="container">
          <div style="width: 150px" class="">
            <img class="post-logo-image" :src="jobDetails.company_logo" alt="">
          </div>
          <div class="d-inline-block">
            <div class="font-weight-bolder" l> {{ jobDetails.company }}</div>
            <div class="small"> {{ jobDetails.company_url }}</div>
          </div>
          <button class="btn btn-primary float-right">Company Site</button>
        </div>
      </nav>

      <div class="mt-5 p-3 inner-background-color">
        <div class="mb-3">
          <div class="d-inline-block">
            <div class="small"> {{getPostTime()}} . {{jobDetails.type}}</div>
            <div class="font-weight-bolder"> {{ jobDetails.title }}</div>
            <div class="text-info small">{{ jobDetails.location }}</div>
          </div>
          <button class="btn btn-primary float-right">Apply Now</button>
        </div>

        <div class="mb-3" v-html="jobDetails.description">
        </div>
      </div>

      <div class="card mt-5 inner-background-color">
        <div class="card-body">
          <h5 class="card-title">How to Apply</h5>
          <p class="card-text" v-html="jobDetails.how_to_apply"></p>
        </div>
      </div>

      <div class="card mt-5 inner-background-color">
        <div class="card-body">
          <div class="d-inline-block">
            <div class="font-weight-bolder">
              {{ jobDetails.company }}
            </div>
            <div class="small">
              {{ jobDetails.company_url }}
            </div>
          </div>
          <button class="btn btn-primary float-right">Apply Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import ApiHelper from '@/helpers/apis'
import moment from 'moment'

export default {
  name: 'JobPostDetails',
  components: {AppHeader},
  props: {},
  data () {
    return {
      id: this.$route.params.id,
      jobDetails: {
        company: '',
        company_logo: '',
        company_url: '',
        created_at: '',
        type: '',
        title: '',
        description: '',
        how_to_apply: ''
      }
    }
  },
  mounted () {
    this.onMounted()
  },
  computed: {
  },
  methods: {
    onMounted () {
      ApiHelper.getJobDetails(this)
    },
    getPostTime () {
      return moment(this.jobDetails.created_at).fromNow()
    }
  }
}
</script>

<style scoped>
.search-container {
  max-width: 700px;
  border-radius: 5px;
  margin: -30px auto 0;
}

.post-logo-image {
  max-width: 100%;
  max-height: 100%;
}
</style>
