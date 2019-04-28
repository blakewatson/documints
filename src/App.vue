<template>
    <div id="app">
        <nav class="navbar has-background-dark has-text-white" aria-label="Main Navigation">
            <div class="navbar-brand">
                <h1 class="site-title title is-marginless has-text-white">Docu<span class="has-text-primary">Mints</span></h1>
                <router-link to="/" class="navbar-item has-text-white">List</router-link>
            </div>
        </nav>
        <router-view/>
        <footer class="">
            <div class="content has-text-centered has-text-grey-dark">
                <p>
                    A <em>Vue</em> + <em>TypeScript</em> experiment.<br>
                    Made with ☕️,🍟, and ❤️ by <a href="https://www.blakewatson.com/">Blake Watson</a>.
                </p>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'App',
    created() {
        this.$store.dispatch('init');
    }
});
</script>

<style lang="sass">
    @import 'assets/app';
</style>
