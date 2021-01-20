<template>
  <div v-bind:inner-background-color="setThemeAttribute" class="card job-post-container m-4 col-lg-4" @click.prevent="getJobDetails()">
    <div class="post-logo-container">
      <img :src="companyLogo" alt="No logo" class="post-logo-image">
    </div>
    <div class="text-secondary small mt-2">
      <span>{{getPostTime()}}</span> . <span>{{type}}</span>
    </div>
    <div class="font-weight-bold">
      {{getJobTitle()}}
    </div>
    <div class="text-secondary small">
      {{getCompanyName()}}
    </div>
    <div class="text-primary small mt-3" @click.prevent="">
      {{getCompanyLocation()}}
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import SharedMixin from '@/mixins/shared'

export default {

  name: 'JobPost',
  mixins: [SharedMixin],
  props: {
    id: {
      type: String,
      required: true
    },
    company: {
      type: String,
      default: ''
    },
    companyLogo: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    postedTime: {
      type: String,
      default: ''
    }
  },
  methods: {
    getJobTitle () {
      if (this.title.length > 22) {
        return `${this.title.substring(0, 21)}..`
      }
      return this.title
    },
    getCompanyName () {
      if (this.company.length > 31) {
        return `${this.company.substring(0, 30)}..`
      }
      return this.company
    },
    getCompanyLocation () {
      if (this.location.length > 31) {
        return `${this.location.substring(0, 30)}..`
      }
      return this.location
    },
    getJobDetails () {
      const route = `/details/${this.id}`
      this.$router.push(route)
    },
    getPostTime () {
      return moment(this.postedTime).fromNow()
    }
  }
}
</script>

<style scoped>
.job-post-container {
  max-width: 232px;
  height: 150px;
  display: inline-block;
  border-radius: 5px;
}

.post-logo-container {
  width: 160px;
  height: 50px;
  margin-top: -15px;
}

.post-logo-image {
  max-width: 100%;
  max-height: 100%;
}
</style>
