<template>
    <section class="doc section">
        <div class="container">
            <DocName :document="document" />

            <div class="columns">
                <div class="column is-two-thirds">
                    <Description :document="document" />
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
import DocName from '@/components/DocName.vue';
import Description from '@/components/Description.vue';
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
        DocName,
        Description,
        TagsWidget,
        AccessWidget
    }
})
</script>
