<template>
    <section class="section">
        <div class="container">
            <div class="level">
                <div class="level-left">
                    <div class="field">
                        <label for="search-input" class="label is-sr-only">Search</label>
                        <div class="control">
                            <input type="text" id="search-input" class="input is-primary" placeholder="Search..." v-model="search">
                        </div>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <a href="doc/new" class="button is-primary" @click.prevent="newDoc">New Document</a>
                    </div>
                </div>
            </div>
            <DocTable :documents="filteredDocuments" />
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

    data() {
        return {
            search: ''
        };
    },

    computed: {
        documents(): Documint[] {
            return this.$store.state.documents;
        },

        filteredDocuments(): Documint[] {
            const term = this.search.toLowerCase();

            // return return a filtered array of documents
            return this.documents.filter((document: Documint): boolean => {
                const searchableDoc: string = JSON.stringify(document).toLowerCase();
                return searchableDoc.includes(term);
            })
        }
    },

    methods: {
        newDoc() {
            this.$store.dispatch('newDocument').then((document: Documint) => {
                this.$router.push(`doc/${document.id}`);
            });
        },
    },

    components: {
        DocTable,
    }
});
</script>
