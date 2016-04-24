import Vue from 'vue';
import Vuex from 'vuex';
import menu from './modules/menu';
import category from './modules/category';
import imgblog from './modules/imgblog';
import createLogger from 'vuex/logger';

Vue.use(Vuex);
Vue.config.debug = true;
const debug = process.env.NODE_ENV !== 'production';
const allModules = [menu, category, imgblog];
const state = {};
const mutations = {};
allModules.forEach((module) => {
    Object.keys(module).forEach((key) => {
        if (key === 'state'){
        	Object.keys(module.state).forEach((k) => {
        		state[k]=module[key][k];
        	});
        }
        if (key === 'mutations'){
            if (!module || !module.mutations) return;
            Object.keys(module.mutations).forEach((name) => {
                const original = module.mutations[name];
                mutations[name] = function (applyState, ...args) {
                    original.apply(undefined, [applyState].concat(args));
                };
            });
        }
    });
});
export default new Vuex.Store({
    state,
    mutations,
    strict: debug,
    middlewares: debug ? [createLogger()] : []
});
