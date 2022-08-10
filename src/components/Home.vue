<template>
   <div class="container">
         <div class="card">
      <div class="card-header text-center">
          <h2>Member list page</h2>

      </div>

        <div class="col-md-3 offset-md-1">
            <label>Search by Last Name</label>
            <input class="form-control mr-sm-2" v-model="keyword" type="search" placeholder="Search" aria-label="Search">
        </div>
        <div class="col-md-2 offset-md-9"> 
          <router-link :to='{name:"AddMember"}' class="btn btn-outline-primary">Add New Member</router-link>
        </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">DS Division</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in members" :key="member.id">
                    <td>{{member.id}}</td>
                    <td>{{member.first_name}}</td>
                    <td>{{member.last_name}}</td>
                    <td>{{member.date_of_birth}}</td>
                    <td>{{member.division}}</td>
                    <td>
                        <div class="col-md-12">
                            
                            <router-link :to="{name: 'UpdateMember', params: { id: member.id }}" class="btn btn-outline-info btn-sm">Edit</router-link>
                            <button class="btn btn-outline-danger btn-sm" @click.prevent="deleteMember(member.id)">Delete</button>
                        </div>
                    </td>
                </tr>
          </tbody>
        </table>
      </div>

    </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Home',
    data(){
        return {
            members:[],
            keyword:''
        }
    },
            watch:{
            keyword(){
                this.searchData(this.keyword)
            }
        },
    created() {
        this.getMembers();
    },
    methods: {
        getMembers() {
            return new Promise((resolve, reject)=> {
            axios.get('http://127.0.0.1:8000/api/members-list')
            .then(res => {
                this.members = res.data.members
                resolve(res)
            }).catch(error => {
                reject(error)
            })
            })
        },
        deleteMember(id) {
            axios.delete(`http://127.0.0.1:8000/api/delete-member/${id}`)
            .then(res => {
                alert(res.data.message);
                this.getMembers();
            })
            .catch(error => {
                console.log(error)
            })
        },
            searchData(val){
                if(val.length >= 2){
                    axios.get('http://localhost:8000/api/search/'+val).then(res =>{
                    this.members = res.data.name
                    }).catch(error => {
                        console.log(error)
                    })
                }else(
                    this.getMembers()
                )


            }
    }

}
</script>
