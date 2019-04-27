import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import { Documint, NewTags } from '@/types';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        documents: Array<Documint>()
    },
    getters: {
        getDocumentById(state): Function {
            return (id: number) => {
                return state.documents.find(document =>  {
                    return document.id === id;
                });
            }
        }
    },
    mutations: {
        addDocuments(state, payload: Documint[]): void {
            state.documents.push(...payload);
        },

        setTags(state, payload: NewTags): void {
            var indexOfDoc = state.documents.findIndex((document: Documint): boolean =>  {
                return document.id == payload.docId;
            });
            Vue.set(state.documents[indexOfDoc], 'tags', payload.tags);
        }
    },
    actions: {
        init(context) {
            return new Promise((resolve, reject) => {
                context.dispatch('fetchDocuments')
                    .then((documents: Documint[]) => {
                        context.commit('addDocuments', documents);
                        resolve();
                    });
            });
        },

        fetchDocuments(context) {
            return new Promise((resolve, reject) => {
                const fakeApiData: Documint[] = [{
                    "access": ["joe"],
                    "id": 1,
                    "name": "Phylurus milli",
                    "description": "Vestibulum rutrum rutrum neque.",
                    "icon": "<i class='fa fa-2x fa-file-powerpoint'></i>",
                    "expirationDate": "2018/06/15",
                    "lastViewed": "2017/11/24",
                    "tags":[]
                }, {
                    "access": ["mike"],
                    "id": 2,
                    "name": "Paraxerus cepapi",
                    "description": "Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
                    "icon": "<i class='fa fa-2x fa-file-word'></i>",
                    "expirationDate": "2018/03/20",
                    "lastViewed": "2018/03/21",
                    "tags":["luctus", "lorrem ipsum"]
                }];
                resolve(fakeApiData);
            });
        }
    }
})
