<template>
    <div class="access-widget box">
        <div class="field">
            <label for="manage-tags" class="label">Access</label>
            <button class="button is-primary" id="manage-tags" @click="active = true">Manage Access</button>
            <div class="access-tags tags">
                <span class="tag is-dark" v-for="person in usersWithAccess">
                    {{ person }}
                    <button class="delete is-small" @click="toggleAccess(person)"></button>
                </span>
            </div>
        </div>
        <div class="modal" :class="{ 'is-active': active }">
            <div class="modal-background" @click="active = false"></div>
            <div class="modal-content">
                <div class="box">
                    <p class="title is-5">Currently sharing with:</p>
                    <div class="access-list field">
                        <label v-for="person in people" class="checkbox is-block has-text-weight-bold">
                            <input type="checkbox" :checked="peopleMap[person]" @click="toggleAccess(person)">
                            {{ person }}
                        </label>
                    </div>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="active = false"></button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { AccessMap } from '@/types';

export default Vue.extend({
    name: 'AccessWidget',

    props: ['document'],

    data(): {
        active: boolean,
        peopleMap: AccessMap
    } {
        return {
            active: false,
            peopleMap: {}
        };
    },

    computed: {
        people(): string[] {
            return this.$store.state.people;
        },

        usersWithAccess(): string[] {
            return this.people.filter((person: string): boolean => {
                return this.peopleMap[person] === true;
            });
        }
    },

    methods: {
        toggleAccess(person: string) {
            // Why didn’t either of these force usersWithAccess to re-eval?
            // demo: https://codepen.io/blakewatson/pen/GLeRmB?editors=1011

            //this.peopleMap[person] = !this.peopleMap[person];
            //Vue.set(this.peopleMap, person, !this.peopleMap[person]);

            // workaround: replace the whole object
            let map = { ...this.peopleMap };
            map[person] = !map[person];
            this.peopleMap = map;
            this.save();
        },

        save() {
            this.$store.commit('setAccess', {
                docId: this.document.id,
                access: [...this.usersWithAccess]
            });
        }
    },

    created() {
        this.people.forEach((person: string): void => {
            var hasAccess: boolean = this.document.access.includes(person);
            this.peopleMap[person] = hasAccess;
        });
    }
});
/* {
    joe: false,
    mike: true
} */
</script>