const mongoose = require('mongoose');
const userConfirmCompte = mongoose.Schema({
    userId:String,
});
userConfirmCompte.pre('save', function (next) {
    const objet = this;
    if (!objet.isNew) {
      return next();
    }
    mongoose.models.Objet.findOneAndUpdate(
      {},
      { $inc: { counter: 1 } },
      { new: true, upsert: true },
      function (error, counter) {
        if (error) {
          return next(error);
        }
        objet.uniqueId = counter.counter;
        next();
      }
    );
  });
module.exports = mongoose.model('ConfirmCompte',userConfirmCompte);