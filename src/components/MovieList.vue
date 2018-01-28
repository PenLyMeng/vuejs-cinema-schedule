
<template>
    <div id="movie-list">
        <div v-if='filteredMovies.length'>
             <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie">

                <div class="movie-sessions">

                    <div v-for="session in filteredSession(movie.sessions)" class='session-time-wrapper tooltip-wrapper'  v-tooltip="{seats:session.seats}">
                        <div class="session-time">
                            {{ formatSessionTime(movie.time)}}
                        </div>

                    </div>

                </div>

             </movie-item>
        
      
        </div>
        
        <div v-else-if="movies.length" class="no-results">
            {{noResults}}
        </div>
        <div v-else-if="movies.length" class="no-results">
            Loading...!
        </div>
        
    </div>
</template>


<script>
    import genres from '../util/genres'
    import times from '../util/times'
    import MovieItem from './MovieItem.vue'

    export default {
        components: {
            MovieItem,
        },
        props: ['genre', 'time', 'movies','day'],
        methods: {
             formatSessionTime(sessionTime){
                return this.$moment(sessionTime).format('h:mm A') 
            }, 
            moviePassesGenreFilter(movie) {
                if (!this.genre.length) {
                    return true
                } else {
                    //return this.genre.find(genre => movie.movie.Genre === genre)
                   let genres = movie.movie.Genre.split(', ');
                   var matched = true
                   this.genre.forEach(genre => {
                       if(genres.indexOf(genre) === -1){
                            matched = false
                       }
                   })

                   return matched
                }
            },
        
        sessionPassesTimeFilter(session) {
               if(!this.$moment(session.time).isSame(this.day,'day')){
                    return false
               }else if(this.time.length === 0 || this.time.length === 2){
                    return true
               }else if(this.time[0] === times.BEFORE_6PM){
                   return this.$moment(session.time).hour() < 18
               }else{
                    return this.$moment(session.time).hour() >= 18
               }
        },

          filteredSession(sessions){
                return sessions.filter(this.sessionPassesTimeFilter )
            },

        },
        computed: { 
            
                filteredMovies() {
                return this.movies.filter(this.moviePassesGenreFilter)
                                  .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter))
            },
            noResults(){
                    let times = this.time.join(', ')
                    let genre = this.genre.join(', ')
                    
                    return  `No result for ${times} ${times.length&& genre.length?', ':''} ${genre}.` 
            }
        },
    }
    
</script>