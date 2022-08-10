<template>
  <div class="container">
             <div class="card">
      <div class="card-header text-center">
          <h2>Update Member</h2>
      </div>
      <div class="card-body">
            <div class="alert alert-danger mt-4" v-if="errors.length">
                <ul class="mb-0">
                    <li v-for="(error, index) in errors" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>

            <form class="row g-3">

                <div class="col-md-4">
                    <label for="inputEmail4" class="form-label">First Name</label>
                    <input type="text" v-model="member.first_name" class="form-control" id="name">
                </div>

                <div class="col-md-4"></div>

                <div class="col-md-4">
                    <label for="inputState" class="form-label">DS Division</label>
                    <select id="inputState" v-model="member.division" class="form-select">
                    <option selected></option>
                    <option value="Colombo 1">Colombo 1</option>
                    <option value="Colombo 2">Colombo 2</option>
                    <option value="Colombo 3">Colombo 3</option>
                    </select>
                </div>
                 <div class="col-md-4">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="member.last_name" id="last_name" >
                </div>

                <div class="col-md-4"></div>
              
                <div class="col-md-4">
                    <input type="date" class="form-control" v-model="member.date_of_birth" id="dateofbirth" name="dateofbirth" >
                </div>
                <div class="col-12">
                    <div class="col-md-6">
                        <label for="exampleFormControlTextarea1">Summery</label>
                        <textarea class="form-control" v-model="member.summery" id="summery" rows="3"></textarea>
                    </div>
                </div>
                <div class="col">
                     <router-link :to='{name:"Home"}' class="btn btn-outline-secondary">Back</router-link>       
                    <button type="button" @click.prevent="updateMember" class="btn btn-outline-info">Update Member</button>
                    <button type="button" @click.prevent="clearForm" class="btn btn-outline-warning">Clear</button>  
                </div>
               
            </form>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    name: 'UpdateMember',
        data() {
            return {
                    member:{},
                    first_name:'',
                    last_name:'',
                    division:'',
                    date_of_birth:'',
                    summery:'',
                    id:'',
                    errors:[]
            }
        },
        mounted(){
            this.getMember();
        },
        methods: {
            getMember(){
              axios.get(`http://localhost:8000/api/select-member/${this.$route.params.id}`)
            .then((res) => {
                const {id ,first_name, last_name, summery, division, date_of_birth} = res.data.member
                this.member.id = id
                this.member.first_name = first_name
                this.member.last_name = last_name
                this.member.summery = summery
                this.member.division = division
                this.member.date_of_birth = date_of_birth
            }).catch(error => {
                console.log(error)
            });            
            },
            updateMember(){
                    this.errors = [];
                    if(!this.member.first_name){
                        this.errors.push("First Name is Required")
                    }

                    if(!this.member.last_name){
                        this.errors.push("Last Name is Required")
                    }

                    if(!this.member.summery){
                        this.errors.push("Summery is Required")
                    }

                    if(!this.member.division){
                        this.errors.push("Division is Required")
                    }
                    if(!this.member.date_of_birth){
                        this.errors.push("Date of Birth is Required")
                    }
                    if(!this.errors.length) {
                        axios.put(`http://127.0.0.1:8000/api/update-member/${this.member.id}`,{
                            first_name: this.member.first_name,
                            last_name: this.member.last_name,
                            division: this.member.division,
                            date_of_birth: this.member.date_of_birth,
                            summery: this.member.summery,
                        }).then(() => {
                            this.$router.push({
                                name: 'Home'
                        })
                        }).catch(error => {
                            alert(error);
                        })
                    }

            },
                clearForm() {
                    if(this.member.first_name != null){
                        this.member.first_name = '';
                    }
                    if(this.member.last_name != null){
                        this.member.last_name = '';
                    }
                    if(this.member.division != null){
                        this.member.division = '';
                    }
                    if(this.member.summery != null){
                        this.member.summery = '';
                    }
                    if(this.member.date_of_birth != null){
                        this.member.date_of_birth = '';
                    }
                }
        }
  }
</script>
