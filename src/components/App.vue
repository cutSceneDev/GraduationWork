<template>
    <div class="app">

    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        getTestFromDb() {
            this.axios
        },
        getAccessFromDb(formData) {
            this.axios.post('http://localhost:3000/database/auth', {
                login: formData.login,
                password: formData.password
            })
            .then(function (response) {
                goAuth(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        postResultToDb() {

        },
        getUserFromComp(user) {

        },
        getResultFromComp(result) {

        }
    }
}
</script>
<style lang="scss">

</style>