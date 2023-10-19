# taskmanagement
This is the assigment to create task management with authentication .

# How to Run Project
1.  Install NPM.
2.  For Development ==> npm run dev
3.  For Production ==> 
    1.  Create Build by running ==> npm run build
    2.  To Run the build project ==> npm run start

# How to test Project
1.  To test the project ==> npm run test

# Post Man Collections File is included in folder ==> postman_collectiosn_taskmanagment
To Properly Execute the Post man Apis You have to follow the given steps below.
Every Api has saved different response samples.

1.  Create Gloabl variable in post man name as 
    1.  token
    2.  taskId

2.  Hit Signup Api

3.  Hit Signin Api
    1.  This api will set the token value in global variable called token.
    2.  Put the script (given below) in Tests tab of Post Man so it set the global token variable.
        var jsonData = JSON.parse(responseBody);
        pm.globals.set("token", jsonData.token);

4.  Hit Create Task Api
    1.  This api will set the taskId value in global variable called taskId.
    2.  Put the script (given below) in Tests tab of Post Man so it set the global taskId variable.
        var jsonData = JSON.parse(responseBody);
        pm.globals.set("taskId", jsonData.task.id);

5.  Hit Update Task By Id Api

6.  Hit Delete Task By Id Api

7.  Hit Get Tasks Api

8.  Hit Get Tasks By Category Param Api

9.  Hit Get tasks by assignedTo Api