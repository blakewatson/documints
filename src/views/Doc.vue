<template>
    <section class="doc section">
        <div class="container">
            <h1 class="title">{{ document.name }}</h1>

            <div class="columns">
                <div class="column is-two-thirds">
                    <div class="field">
                        <div class="control">
                            <textarea class="doc-description textarea is-primary" v-model="description"></textarea>
                        </div>
                    </div>
                </div>

                <div class="column is-one-third">
                    <TagsWidget :document="document" />
                    <AccessWidget :document="document" />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import TagsWidget from '@/components/TagsWidget.vue';
import AccessWidget from '@/components/AccessWidget.vue';
import { Documint } from '@/types';

export default Vue.extend({
    name: 'Doc',

    data() {
        return {
            description: ''
        };
    },

    computed: {
        document(): Documint {
            return this.$store.getters.getDocumentById(parseInt(this.$route.params.id));
        }
    },

    components: {
        TagsWidget,
        AccessWidget
    },

    mounted() {
        this.description = this.document.description;
    }
})
</script>
