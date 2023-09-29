<template>
    <h1>Pokemon <span>#{{id}}</span></h1>
    <div v-if="pokemon">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
    </div>
</template>

<script>
export default {
    props: {
        id: {
            type:Number,
            required: true
        }
    },
    data(){
        return{ 
            pokemon: null

        }
    },
    created(){
        this.getPokemon()
        // const {id} = this.$route.params;
        // // this.id = id
        // console.log(id);
    },
    methods:{
        async getPokemon(){
            try {
                const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`).then(r => r.json())
                this.pokemon = pokemon;
            } catch (error) {
                this.$router.push('/')
            }
        }
    },
    watch:{
        id(){
            this.getPokemon();
        }
    }
}
</script>