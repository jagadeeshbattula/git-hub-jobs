<template>
  <div id="app" v-bind:app-background-color="setThemeAttribute" v-bind:text-color="setThemeAttribute">
    <router-view/>
  </div>
</template>

<script>

import SharedMixin from '@/mixins/shared'

export default {
  name: 'App',
  mixins: [SharedMixin]
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[app-background-color="light"]  {
  background-color:  #F5F6F8 !important;
}

[app-background-color="dark"]  {
  background-color:  #19212D !important;
}

[inner-background-color="light"]  {
  background-color:  #FFFFFF !important;
}

[inner-background-color="dark"]  {
  background-color:  #131822 !important;
}

[text-color="light"]  {
  color: #000000 !important;
}

[text-color="dark"]  {
  color: #ffffff !important;
}
</style>
