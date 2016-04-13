import { Meteor } from 'meteor/meteor';

import '../imports/api/books'
import '../imports/api/bookRequests'

Meteor.startup(() => {
    Meteor.publish('usersData', function() {
        if(this.userId) {
            return Meteor.users.find({_id: this.userId}, 
                    {fields: 'profile'})
        } else {
            return this.ready()
        }
    })
    
    Meteor.users.deny({
        update() {
            return true
        }
    })
});
