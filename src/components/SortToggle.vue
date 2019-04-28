<template>
    <th class="sort-toggle" @click="sortColumn">
        {{ text }}&nbsp;&nbsp;<i class="fas" v-if="sortBy === field" :class="iconClasses"></i>
    </th>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'SortToggle',

    props: ['text', 'field', 'sortBy', 'sort'],

    computed: {
        iconClasses(): object {
            return {
                'fa-chevron-up': this.sort === 'ASC',
                'fa-chevron-down': this.sort === 'DESC'
            };
        }
    },

    methods: {
        sortColumn() {
            this.$emit('sortcolumn', this.field);
        }
    }
})
</script>
