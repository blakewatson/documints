<template>
    <div id="app">
        <nav class="navbar has-background-dark has-text-white" aria-label="Main Navigation">
            <div class="navbar-brand">
                <h1 class="site-title title is-marginless has-text-white">Docu<span class="has-text-primary">Mints</span></h1>
                <router-link to="/" class="navbar-item has-text-white">List</router-link>
                <router-link to="/detail" class="navbar-item has-text-white">Detail</router-link>
            </div>
        </nav>
        <router-view/>
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
