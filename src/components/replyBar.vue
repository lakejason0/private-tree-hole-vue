<template>
    <div
        style="position: fixed; bottom: 16px; left: 0; right: 0; display: flex; align-items: center; justify-content: center"
    >
        <div ref="bar">
            <v-toolbar
                :class="{ 'reply-bar--hidden': !showReplyBar }"
                @click="$emit('click')"
                class="reply-bar"
                dense
                fixed
                floating
            >
                <v-text-field
                    :value="content"
                    hide-details
                    readonly
                    single-line
                    
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
import {throttle} from 'lodash'
export default {
    props: {
        content: String
    },
    data: () => ({
        showReplyBar: true,
        lastScrollPosition: 0,
        barHeight: 0,
        _onScroll: null
    }),
    beforeMount() {
        this._onScroll = throttle(this.onScroll, 60)
    },
    mounted() {
        window.addEventListener('scroll', this._onScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this._onScroll)
    },
    methods: {
        onScroll() {
            if(!this.barHeight){
                this.barHeight = this.$refs.bar.getBoundingClientRect().height
            }
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > this.lastScrollTop) {
                this.showReplyBar = false
                let bottom = scrollTop > document.body.scrollHeight - this.barHeight - window.innerHeight
                if (bottom) {
                    this.showReplyBar = true
                }
            } else {
                this.showReplyBar = true
            }
            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }
    }
}
</script>
