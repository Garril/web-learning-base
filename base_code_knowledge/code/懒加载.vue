<template>
  <div>
    <div>
      <h1><strong>Loading...</strong></h1>
      <h2><strong>{{percent}}%</strong></h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      percent: '',
      images: [
        'example.png',
        '...',
        '...'
      ]
    }
  },
  mounted() {
    this.preload()
  },
  methods: {
    preload: function() {
      for (let url of this.images) {
        let image = new Image()
        image.src = url
        image.onload = () => {
          this.count++
          this.percent = Math.floor(this.count / this.images.length * 100)
        }
      }
    },
  },
  watch: {
    count: function(num) {
      if (num === this.images.length) {
        this.$router.push({path: 'home'})
      }
    }
  }
}
</script>