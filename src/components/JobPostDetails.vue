<template>
  <div>
    <app-header />
    <div class="container search-container">
      <nav v-bind:inner-background-color="setThemeAttribute" class="navbar navbar-expand-lg static-top">
        <div class="container">
          <div class="header-logo">
            <img class="post-logo-image" :src="jobDetails.company_logo" alt="">
          </div>
          <div class="header-company-details">
            <div class="font-weight-bolder"> {{ jobDetails.company }}</div>
            <div class="small"> {{ jobDetails.company_url }}</div>
          </div>
          <a :href="jobDetails.company_url" target="_blank" class="btn btn-primary header-button">Company Site</a>
        </div>
      </nav>

      <div v-bind:inner-background-color="setThemeAttribute" class="mt-5 p-3">
        <div>
          <div class="body-company-details mb-5">
            <div class="small"> {{getPostTime()}} . {{jobDetails.type}}</div>
            <div class="font-weight-bolder"> {{ jobDetails.title }}</div>
            <div class="text-info small">{{ jobDetails.location }}</div>
          </div>
          <a class="btn btn-primary float-right body-apply-button mb-5" :href="jobDetails.url" target="_blank">Apply Now</a>
        </div>

        <div class="mb-3 mt-5" v-html="jobDetails.description">
        </div>
      </div>

      <div v-bind:inner-background-color="setThemeAttribute" class="card mt-5">
        <div class="card-body">
          <h5 class="card-title">How to Apply</h5>
          <p class="card-text" v-html="jobDetails.how_to_apply"></p>
        </div>
      </div>

      <div v-bind:inner-background-color="setThemeAttribute" class="card mt-5">
        <div class="card-body">
          <div class="footer-company-details">
            <div class="font-weight-bolder">
              {{ jobDetails.company }}
            </div>
            <div class="small">
              {{ jobDetails.company_url }}
            </div>
          </div>
          <a class="btn btn-primary float-right footer-apply-button" :href="jobDetails.url" target="_blank">Apply Now</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import ApiHelper from '@/helpers/apis'
import moment from 'moment'
import SharedMixin from '@/mixins/shared'

export default {
  name: 'JobPostDetails',
  components: {AppHeader},
  mixins: [SharedMixin],
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
        how_to_apply: '',
        url: ''
      }
    }
  },
  mounted () {
    this.onMounted()
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

.footer-company-details, .body-company-details {
  display: inline-block;
}

.header-logo {
  width: 150px;
}

.header-company-details {
  display: inline-block;
}

.header-button {
  float: right;
}

@media screen and (max-width: 600px) {
  .footer-apply-button, .body-apply-button, .body-company-details {
    width: 100%;
  }

  .footer-company-details {
    display: none;
  }

  .header-button {
    float: none;
    width: 100%;
  }

  .header-company-details {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
