<template>
    <header class="doc-header">
        <template v-if="!editMode">
            <h1 class="title">{{ document.name }}</h1>
            <button class="button is-small is-primary" @click="editMode = true">Edit Name</button>
        </template>

        <form v-if="editMode" @submit.prevent="save">
            <div class="field has-addons">
                <div class="control doc-name-input">
                    <input type="text" class="input is-medium" v-model="name">
                </div>
                <div class="control">
                    <button type="submit" class="button is-medium is-primary">Save</button>
                </div>
            </div>
        </form>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'DocName',

    props: ['document'],

    data() {
        return {
            editMode: false,
            name: ''
        }
    },

    methods: {
        save() {
            this.$store.commit('setName', {
                docId: this.document.id,
                name: this.name
            });

            this.editMode = false;
        }
    },

    created() {
        this.name = this.document.name;
    }
})
</script>
