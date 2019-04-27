<template>
    <div class="tags-widget box">
        <form @submit.prevent="addTag">
            <label for="tags-input" class="label">Tags</label>
            <div class="field has-addons">
                <div class="control">
                    <input class="input is-primary" v-model="tagInput" type="text" id="tags-input">
                </div>
                <div class="control">
                    <button class="button is-primary" @click="addTag">Add</button>
                </div>
            </div>
        </form>
        <div class="tags">
            <span v-for="tag in tags" class="tag is-dark" @click="deleteTag(tag)">
                {{ tag }}
                <button class="delete is-small"></button>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'TagsWidget',

    props: ['document'],

    data() {
        return {
            tags: Array<string>(),
            tagInput: ''
        };
    },

    methods: {
        addTag() {
            if(this.tagInput !== '') {
                this.tags.push(this.tagInput);
                this.tagInput = '';
                this.saveTags();
            }
        },

        deleteTag(tag: string) {
            this.tags = this.tags.filter((t: string) => t !== tag);
            this.saveTags();
        },

        saveTags() {
            this.$store.commit('setTags', {
                docId: this.document.id,
                tags: this.tags
            });
        }
    },

    mounted() {
        this.tags = [...this.document.tags];
    }
})
</script>
