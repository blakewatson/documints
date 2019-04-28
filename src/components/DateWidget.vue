<template>
    <div class="date-widget box">
        <div class="field">
            <label for="#expiration-input" class="label">Expiration Date</label>
            <div class="control">
                <input
                    type="text"
                    id="expiration-input"
                    class="input is-primary"
                    :class="{ 'is-danger': error }"
                    v-model="date"
                    @input="validate">
                <p v-if="error" class="is-size-7 has-text-danger">{{ error }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'DateWidget',

    props: ['document'],

    data() {
        return {
            date: '',
            error: '',
            timer: 0
        };
    },

    methods: {
        validate() {
            clearTimeout(this.timer);

            setTimeout(() => {
                if(! this.date.match(/\d\d\d\d\/\d\d\/\d\d/g)) {
                    this.error = 'Date must follow format YYYY/MM/DD.';
                } else {
                    this.save();
                    this.error = '';
                }
            }, 1500);
        },

        save() {
            this.$store.commit('setExpiration', {
                docId: this.document.id,
                expiration: this.date
            });
        }
    },

    created() {
        this.date = this.document.expirationDate;
    }
})
</script>
