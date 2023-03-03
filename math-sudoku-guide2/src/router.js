import Vue from 'vue'
import Router from 'vue-router'
const Index =() => import('./template/' + process.env.PROJECT_NAME + '/src/index.vue');
import {Editor,Preview} from 'xtemplate-editor';
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            component: Index
        },
        {
            path: '/edit',
            component: Editor,
        },
        {
            path: '/preview',
            component: Preview,
        }
    ]
})
