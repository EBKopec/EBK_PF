import {extendObservable} from 'mobx';

/**
* User Store
*/

 class UserStore {
     constructor(){
         extendObservable(this, {
             loading: true,
             isLoggedIn: false,
             userName: ''

         })
     }
 }

 export default new UserStore();