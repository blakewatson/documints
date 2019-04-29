import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import {
    Documint,
    NewName,
    NewDescription,
    NewExpiration,
    NewTags,
    NewAccess,
    Uuid
} from '@/types';
import fakeApiData from '@/data';

Vue.use(Vuex);

function padNum(num: number, places: number = 2): string {
    let numStr: string = num.toString();
    if(numStr.length >= places) return numStr;
    for(let i = 0; numStr.length < places; i++) {
        numStr = `0${numStr}`;
    }
    return numStr;
}

function getIndexOfDocById(documents: Documint[], id: Uuid): number {
    return documents.findIndex((document: Documint): boolean =>  {
        return document.id == id;
    });
}

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
            const indexOfDoc: number = getIndexOfDocById(state.documents, payload.docId);
            Vue.set(state.documents[indexOfDoc], 'name', payload.name);
        },

        setDescription(state, payload: NewDescription): void {
            const indexOfDoc: number = getIndexOfDocById(state.documents, payload.docId);
            Vue.set(state.documents[indexOfDoc], 'description', payload.description);
        },

        setExpiration(state, payload: NewExpiration): void {
            const indexOfDoc: number = getIndexOfDocById(state.documents, payload.docId);
            Vue.set(state.documents[indexOfDoc], 'expirationDate', payload.expiration);
        },

        setTags(state, payload: NewTags): void {
            const indexOfDoc: number = getIndexOfDocById(state.documents, payload.docId);
            Vue.set(state.documents[indexOfDoc], 'tags', payload.tags);
        },

        setAccess(state, payload: NewAccess): void {
            const indexOfDoc: number = getIndexOfDocById(state.documents, payload.docId);
            Vue.set(state.documents[indexOfDoc], 'access', payload.access);
        },

        resetLastViewed(state, payload: { docId: number }): void {
            const indexOfDoc: number = getIndexOfDocById(state.documents, payload.docId);
            const now: Date = new Date(Date.now());
            const lastViewed: string = `${now.getFullYear()}/${padNum(now.getMonth())}/${padNum(now.getDate())}`;
            Vue.set(state.documents[indexOfDoc], 'lastViewed', lastViewed);
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
                resolve(fakeApiData);
            });
        }
    }
})
