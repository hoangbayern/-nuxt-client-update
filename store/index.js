// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import { state as authState, mutations as authMutations, actions as authActions } from './auth';

Vue.use(Vuex);

export const state = () => ({

});

export const mutations = {
 
};

export const actions = {

};

export const modules = {
  auth: {
    state: authState,
    mutations: authMutations,
    actions: authActions,
  },
};
