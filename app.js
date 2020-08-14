var tblTasks = document.getElementById('tbl_tasks_list');
var databaseRef = firebase.database().ref('tasks/');
var rowIndex = 1;

databaseRef.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
 var childKey = childSnapshot.key;
 var childData = childSnapshot.val();
 
 var row = tblTasks.insertRow(rowIndex);
 var cellId = row.insertCell(0);
 var cellName = row.insertCell(1);
 cellId.appendChild(document.createTextNode(childKey));
 cellName.appendChild(document.createTextNode(childData.task_name));
 
 rowIndex = rowIndex + 1;
  });
});
 
function save_task(){
 var task_name = document.getElementById('task_name').value;

 var tid = firebase.database().ref().child('tasks').push().key;
 
 var data = {
  task_id: tid,
  task_name: task_name
 }
 
 var updates = {};
 updates['/tasks/' + tid] = data;
 firebase.database().ref().update(updates);
 
 alert('The task is added successfully!');
 reload_page();
}

function update_task(){
 var task_name = document.getElementById('task_name').value;
 var task_id = document.getElementById('task_id').value;

 var data = {
  task_id: task_id,
  task_name: task_name
 }
 
 var updates = {};
 updates['/tasks/' + task_id] = data;
 firebase.database().ref().update(updates);
 alert('The task is updated successfully!');
 reload_page();
}

function delete_task(){
 var task_id = document.getElementById('task_id').value;
 firebase.database().ref().child('/tasks/' + task_id).remove();
 alert('The task is deleted successfully!');
 reload_page();
}

function delete_all_tasks() {
firebase.database().ref('tasks').remove()
alert('All data is deleted successfully!');
reload_page();
}


function reload_page(){
 window.location.reload();
}