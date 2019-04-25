<template>
    <div class="section">
        <div class="container">
            <DocTable :documents="documents" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import DocTable from '@/components/DocTable.vue'; // @ is an alias to /src

export default Vue.extend({
    name: 'home',

    components: {
        DocTable,
    },

    computed: {
        ...mapState(['documents'])
    }
});
</script>
