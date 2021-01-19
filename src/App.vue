<template>
  <div id="app" data-theme="light" class="app-background-color text-color">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-background-color {
  background-color:  #F5F6F8 !important;
  /*background-color:  #19212D !important;*/
}

.inner-background-color {
  background-color:  #FFFFFF !important;
  /*background-color:  #131822 !important;*/
}

.text-color {
  color: #000000 !important;
  /*color: #ffffff !important;*/
}

@media (prefers-color-scheme: dark) {
  .app-background-color {
    background-color:  #19212D !important;
  }

  .inner-background-color {
    background-color:  #131822 !important;
  }

  .text-color {
    color: #ffffff !important;
  }
}

@media (prefers-color-scheme: light) {
  .app-background-color {
    background-color:  #F5F6F8 !important;
  }

  .inner-background-color {
    background-color:  #FFFFFF !important;
  }

  .text-color {
    color: #000000 !important;
  }
}
</style>
