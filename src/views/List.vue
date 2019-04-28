<template>
    <section class="section">
        <div class="container">
            <div class="level">
                <div class="level-left"></div>
                <div class="level-right">
                    <div class="level-item">
                        <a href="doc/new" class="button is-primary" @click.prevent="newDoc">New Document</a>
                    </div>
                </div>
            </div>
            <DocTable :documents="documents" />
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import DocTable from '@/components/DocTable.vue'; // @ is an alias to /src
import { Documint } from '../types';

export default Vue.extend({
    name: 'home',

    methods: {
        newDoc() {
            this.$store.dispatch('newDocument').then((document: Documint) => {
                this.$router.push(`doc/${document.id}`);
            });
        },
    },

    components: {
        DocTable,
    },

    computed: {
        ...mapState(['documents'])
    }
});
</script>
