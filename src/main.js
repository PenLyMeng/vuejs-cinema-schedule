import './style.scss'
import genres from './util/genres'
import Vue from 'vue'
import VueResource from 'vue-resource'
import moment from 'moment-timezone' 
import {checkFilter,setDay} from './util/bus'
import VueRouter from 'vue-router'
import Overview from './components/Overview.vue'
import routes from './util/routes'

import Tooltip from './util/tooltip'
Vue.use(Tooltip)



moment.tz.setDefault('UTC')
Object.defineProperty(Vue.prototype,'$moment',{get(){return this.$root.moment}})

const bus = new Vue()
Object.defineProperty(Vue.prototype,'$bus',{get(){return this.$root.bus}}) 


Vue.use(VueRouter)

Vue.use(VueResource)

const router = new VueRouter({ routes })


new Vue({
    el:'#app', 
    data:{
        genre:[],
        time:[],
        movies:[],
        moment,
        day:moment()._d,
        bus
    },
   

    created(){
        this.$http.get('/api').then(function(res){
            this.movies = res.body  
        },function(c){
            return res
        })

        this.$bus.$on('check-filter',checkFilter.bind(this))
        this.$bus.$on('set-day',setDay.bind(this) )
    },
   router:router
}); 

 

 
