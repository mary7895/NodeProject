const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true
    , validate: {
      validator: function (val) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
      },
      message: () => `Invalid email address`
  } },
  role:{
    type:String,
    default:'UnRegistered User',
    enum:["UnRegistered User","Registered User"]
},
productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
},
orderId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Order"
},
sellerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Seller'
}

});
userSchema.pre('save', async function(next){
    let salt=await bcrypt.genSalt(10)
    let hashedPassword=await bcrypt.hash(this.password,salt)
    this.password=hashedPassword
next()
})
const userModel=mongoose.model('User',userSchema);
module.exports=userModel;