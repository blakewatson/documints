import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import {
    Documint,
    NewName,
    NewDescription,
    NewExpiration,
    NewTags,
    NewAccess
} from '@/types';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        documents: Array<Documint>(),
        people: ['everyone', 'joe', 'mike', 'samantha']
    },
    getters: {
        getDocumentById(state): Function {
            return (id: number) => {
                return state.documents.find(document =>  {
                    return document.id === id;
                });
            }
        },

        uniqueId(state): number {
            return state.documents.reduce((highest: number, document: Documint): number => {
                if(highest > document.id) return highest;
                return document.id + 1;
            }, 0);
        }
    },
    mutations: {
        addDocuments(state, payload: Documint[]): void {
            state.documents.push(...payload);
        },

        setName(state, payload: NewName): void {
            var indexOfDoc = state.documents.findIndex((document: Documint): boolean =>  {
                return document.id == payload.docId;
            });
            Vue.set(state.documents[indexOfDoc], 'name', payload.name);
        },

        setDescription(state, payload: NewDescription): void {
            var indexOfDoc = state.documents.findIndex((document: Documint): boolean =>  {
                return document.id == payload.docId;
            });
            Vue.set(state.documents[indexOfDoc], 'description', payload.description);
        },

        setExpiration(state, payload: NewExpiration): void {
            var indexOfDoc = state.documents.findIndex((document: Documint): boolean =>  {
                return document.id == payload.docId;
            });
            Vue.set(state.documents[indexOfDoc], 'expirationDate', payload.expiration);
        },

        setTags(state, payload: NewTags): void {
            var indexOfDoc = state.documents.findIndex((document: Documint): boolean =>  {
                return document.id == payload.docId;
            });
            Vue.set(state.documents[indexOfDoc], 'tags', payload.tags);
        },

        setAccess(state, payload: NewAccess): void {
            var indexOfDoc = state.documents.findIndex((document: Documint): boolean =>  {
                return document.id == payload.docId;
            });
            Vue.set(state.documents[indexOfDoc], 'access', payload.access);
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

        newDocument(context) {
            return new Promise((resolve, reject) => {
                // get unique id
                const id: number = context.getters.uniqueId;
                // create new document
                const doc: Documint = {
                    'access': [],
                    'id': id,
                    'name': 'Untitled',
                    'description': '',
                    'icon': "<i class='fa fa-2x fa-file-word'></i>",
                    'expirationDate': '',
                    'lastViewed': '',
                    'tags': []
                };
                // add document to store
                context.commit('addDocuments', [doc]);
                resolve(doc);
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
