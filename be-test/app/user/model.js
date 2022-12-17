// import package `mongoose`
const mongoose = require('mongoose');
// ambil module `model` dan `Schema` dari package `mongoose`
const { model, Schema } = mongoose;
// import package `bcrypt untuk hash password`
const bcrypt = require('bcrypt');
// import package `mongoose-sequence untuk auto increment id`
const AutoIncrement = require('mongoose-sequence')(mongoose);

const HASH_ROUND = 10;

const userSchema = Schema({
    full_name: {
        type: String, 
        required: [true, 'Nama harus diisi'], 
        maxlength: [255, 'Panjang nama harus antara 3 - 255 karakter'],
        minlength: [3, 'Panjang nama harus antara 3 - 255 karakter']
    },
    customer_id: {
        type: Number
    }, 
    email: {
        type: String, 
        required: [true, 'Email harus diisi'], 
        maxlength: [255, 'Panjang email maksimal 255 karakter'],
    },
    password: {
        type: String, 
        required: [true, 'Password harus diisi'], 
        maxlength: [255, 'Panjang password maksimal 255 karakter'], 
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'maintener'],
        default: 'user'
    },
    token: [String]
}, {timestamps: true}); 

userSchema.path('email').validate(function(value){
    // email regular expression
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    // test email, hasilnya adalah `true` atau `false`
    // jika ternyata `true` maka validasi berhasil 
    // jika ternyata `false` maka validasi gagal
    return EMAIL_RE.test(value); 
}, attr => `${attr.value} harus merupakan email yang valid!`);

// userSchema.path('email').validate(async function(value){
//     try{
//         // lakukan pencarian ke _collection_ User berdasarkan `email`
//         const count = await this.model('User').count({email: value});
//         // kode ini mengindikasikan bahwa jika user ditemukan akan mengembalikan `false` jika tidak ditemukan mengembalikan `true`
//         return !count;
//     } catch(err) {
//         throw err
//     }
// }, attr => `${attr.value} sudah terdaftar`)

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next()
});

userSchema.plugin(AutoIncrement, {inc_field: 'customer_id'});

module.exports = model('User', userSchema);
