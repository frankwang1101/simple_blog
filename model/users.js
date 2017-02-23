import {User} from '../lib/mongo'

module.exports = {
    create : (user) => {
        return User.create(user).exec();
    },
    getUserByName: name => {
        return User.findOne({name:name}).addCreateAt().exec();
    }
}