<template>
    <div class="level">
        <div class="level-left">
            <div class="level-item field">
                <label for="showPages" class="label is-marginless">Show:&nbsp;</label>
                <div class="select">
                    <select id="showPages" v-model.number="pagesToShow" @change="changeShow">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="level-right">
            <button class="button is-white" :disabled="page < 2" @click="prev">
                <i class="fas fa-chevron-left"></i>
            </button>
            <span class="page-number">{{ page }} of {{ total | nonZero }}</span>
            <button class="button is-white" :disabled="page >= total" @click="next">
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'PaginationControls',

    props: ['page', 'show', 'total'],

    data() {
        return {
            pagesToShow: 0
        }
    },

    methods: {
        next() {
            this.$emit('next');
        },

        prev() {
            this.$emit('prev');
        },

        changeShow() {
            this.$emit('show', this.pagesToShow);
        }
    },

    watch: {
        show(val: number) {
            this.pagesToShow = val;
        }
    },

    filters: {
        nonZero(num: number): number {
            return num ? num : 1;
        }
    },

    created() {
        this.pagesToShow = this.show;
    }
})
</script>
