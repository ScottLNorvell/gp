var data;
$(function() {
  $('#perka-form').on('submit', function(e) {
    e.preventDefault();
    var jsonObj = formToJSON($(this));
    var selected_file = $('#resume').get(0).files[0];
    var r = new FileReader();
    r.onload = function(e) {
      var contents = e.target.result;
      var file64 = contents.split(',')[1];
      jsonObj.resume = file64;
      data = jsonObj;
      console.log(jsonObj);
    }
    r.readAsDataURL(selected_file);
  });
});

function formToJSON(form) {
  var a = form.serializeArray();
  var json = {};
  $.each(a, function() {
    var exists_in_json = json[this.name];
    if (!exists_in_json) {
      json[this.name] = this.value;
    } else if (typeof exists_in_json == "string") {
      json[this.name] = [exists_in_json, this.value]
    } else {
      json[this.name].push(this.value);
    }
    
  });
  return json; 
}