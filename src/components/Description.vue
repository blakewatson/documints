<template>
    <div class="field">
        <div class="control">
            <textarea class="doc-description textarea is-primary" v-model="description" @keyup="saveDescription"></textarea>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'Description',

    props: ['document'],

    data() {
        return {
            description: '',
            timer: 0
        };
    },

    methods: {
        saveDescription() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.$store.commit('saveDescription', {
                    docId: this.document.id,
                    description: this.description
                });
            }, 1000);
        }
    },

    mounted() {
        this.description = this.document.description;
    }
})
</script>
