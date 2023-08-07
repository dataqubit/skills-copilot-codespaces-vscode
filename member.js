function skillsMember() {
  var skills = ['HTML', 'CSS', 'JS', 'React', 'Node'];
  var member = {
    name: 'Sara',
    age: 25,
    skills: skills,
    // Path: member.js
    showSkills: function () {
      var _this = this;

      this.skills.forEach(function (skill) {
        console.log(_this.name + ' knows ' + skill);
      });
    }
  };
  return member;
}