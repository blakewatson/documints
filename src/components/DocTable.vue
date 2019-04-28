<template>
    <div class="card">
        <div class="card-header has-background-primary">
            <h2 class="card-header-title is-size-4 has-text-white">All Documents</h2>
        </div>
        <div class="card-content">
            <table class="table is-fullwidth">
                <thead>
                    <tr class="is-size-7">
                        <th class="doctable-title-col">Title</th>
                        <th>Description</th>
                        <th>Tags</th>
                        <th>Last viewed</th>
                        <th>Expiration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="documents.length === 0">
                        <td colspan="5">No documents match your search.</td>
                    </tr>
                    <tr v-for="doc in documents" :key="doc.id" v-if="documents.length">
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

export default Vue.extend({
    name: 'DocTable',
    props: ['documents'],
});
</script>