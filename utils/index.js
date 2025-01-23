export default {
  ifequal: function(a, b, options) {
    if (a == b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },

  getFullNameFirstCharacter: function(firstName, lastName) {
    return firstName.charAt(0) + lastName.charAt(0);
  },

  formatDate(date) {
    return moment(data).format("DD MMM, YYYY");
}