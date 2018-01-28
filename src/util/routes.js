import Overview from '../components/Overview.vue'
import MovieDetail from '../components/MovieDetail.vue'

export default [
    {path :'/' ,component:Overview,name:'home'},
    {path :'/movie/:id' ,component:MovieDetail, name:"movie"},
    {path :'*' ,redirect: { name:'home'}},
    
]