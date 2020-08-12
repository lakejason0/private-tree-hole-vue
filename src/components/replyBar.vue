<template>
  <div style="position: fixed; bottom: 16px; left: 0; right: 0;display: flex;align-items: center;justify-content: center">
    <div>
      <v-toolbar
          dense
          floating
          @click="$emit('click')"
          fixed
          class="reply-bar"
          :class="{ 'reply-bar--hidden': !showReplyBar }"
      >
        <v-text-field
            hide-details
            single-line
            readonly
            :value="content"
        ></v-text-field>
        <v-btn icon>
          <v-icon>send</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
  </div>
</template>

<style scoped>
.reply-bar {
    transform: translate3d(0, 0, 0);
    transition: 0.1s all ease-out
}

.reply-bar--hidden {
    box-shadow: none;
    transform: translate3d(0, 200%, 0);
}
</style>

<script>
export default {
    props: {
        content: String
    },
    data: () => ({
        showReplyBar: true,
        lastScrollPosition: 0
    }),
    mounted () {
        window.addEventListener('scroll', this.onScroll)
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        onScroll () {
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

            if (currentScrollPosition < 0) {
                return
            }

            if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60 ) {
                return
            }

            this.showReplyBar = (currentScrollPosition < this.lastScrollPosition) || (scrollTop + windowHeight >= scrollHeight)
            this.lastScrollPosition = currentScrollPosition
        }
    }
}
</script>
