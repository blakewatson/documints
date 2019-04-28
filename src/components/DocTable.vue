<template>
    <div class="card">
        <div class="card-header has-background-primary">
            <h2 class="card-header-title is-size-4 has-text-white">All Documents</h2>
        </div>
        <div class="card-content">
            <table class="table is-fullwidth">
                <thead>
                    <tr class="is-size-7">
                        <SortToggle text="ID" field="id" :sortBy="sortBy" :sort="sort" @sortcolumn="sortColumn" />
                        <SortToggle class="doctable-title-col" text="Title" field="name" :sortBy="sortBy" :sort="sort" @sortcolumn="sortColumn" />
                        <SortToggle text="Description" field="description" :sortBy="sortBy" :sort="sort" @sortcolumn="sortColumn" />
                        <th>Tags</th>
                        <SortToggle text="Last viewed" field="lastViewed" :sortBy="sortBy" :sort="sort" @sortcolumn="sortColumn" />
                        <SortToggle text="Expiration" field="expirationDate" :sortBy="sortBy" :sort="sort" @sortcolumn="sortColumn" />
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="documents.length === 0">
                        <td colspan="5">No documents match your search.</td>
                    </tr>
                    <tr v-for="doc in sortedDocuments" :key="doc.id" v-if="documents.length">
                        <td>{{ doc.id }}</td>
                        <td><router-link :to="{ name: 'doc', params: { id: doc.id } }">{{ doc.name }}</router-link></td>
                        <td>{{ doc.description }}</td>
                        <td>
                            <div class="tags">
                                <span class="tag is-dark" v-for="tag in doc.tags">{{ tag }}</span>
                            </div>
                        </td>
                        <td>{{ doc.lastViewed }}</td>
                        <td>{{ doc.expirationDate }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SortToggle from '@/components/SortToggle.vue';
import { Documint } from '../types';

export default Vue.extend({
    name: 'DocTable',
    props: ['documents'],
    data() {
        return {
            sortBy: 'id',
            sort: 'ASC'
        }
    },
    computed: {
        sortedDocuments(): Documint[] {
            let sortedDocs: Documint[] = [...this.documents];
            sortedDocs.sort((a: Documint, b: Documint): number => {
                if(
                    this.sortBy === 'id' ||
                    this.sortBy === 'name' ||
                    this.sortBy === 'description' ||
                    this.sortBy === 'lastViewed' ||
                    this.sortBy === 'expirationDate'
                ) {
                    if(a[this.sortBy] < b[this.sortBy]) return -1;
                    if(a[this.sortBy] > b[this.sortBy]) return 1;
                }
                return 0;
            });
            if(this.sort === 'DESC') {
                sortedDocs.reverse();
            }
            return sortedDocs;
        }
    },
    methods: {
        sortColumn(field: string) {
            if(this.sortBy === field) {
                this.toggleSortOrder();
            } else {
                this.sortBy = field;
                this.sort = 'ASC';
            }
        },

        toggleSortOrder() {
            if(this.sort === 'ASC') {
                this.sort = 'DESC';
            } else {
                this.sort = 'ASC';
            }
        }
    },
    components: {
        SortToggle
    }
});
</script>