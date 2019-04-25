<template>
    <div class="card">
        <div class="card-header has-background-primary">
            <h2 class="card-header-title is-size-4 has-text-white">All Documents</h2>
        </div>
        <div class="card-content">
            <table class="table is-fullwidth">
                <thead>
                    <tr class="is-size-7">
                        <th>Title</th>
                        <th>Description</th>
                        <th>Tags</th>
                        <th>Last viewed</th>
                        <th>Expiration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="doc in documents" :key="doc.id">
                        <td>{{ doc.name }}</td>
                        <td>{{ doc.description }}</td>
                        <td>
                            <span class="tag is-info" v-for="tag in doc.tags">{{ tag }}</span>
                        </td>
                        <td>{{ doc.lastViewed }}</td>
                        <td>{{ doc.expiration }}</td>
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