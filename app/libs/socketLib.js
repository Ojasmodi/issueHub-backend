
const socketio = require('socket.io')
const issueController = require('./../controllers/issueController')
const tokenLib = require("./tokenLib.js");

let setServer = (server) => {

    let io = socketio.listen(server)

    let myIO = io.of('')

    myIO.on('connection', (socket) => {

        console.log("on emitting verifying user");

        socket.emit('verifyUser', "");

        //code to verify user
        socket.on('set-user', (authToken) => {

            console.log("set-user called")
            tokenLib.verifyClaimWithoutSecret(authToken, (err, user) => {

                if (err) {
                    socket.emit('auth-error', { status: 500, error: true, errorMsg: "Plz provide data with authToken" })
                }
                else {

                    console.log("user is verified setting details")
                    let currentUser = user.data;
                    //setting socket userId
                    socket.userId = currentUser.userId;
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    console.log(`${fullName} is online`);

                    socket.room = 'issue'
                    socket.join(socket.room)
                }
            })

        })

        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            console.log("user is disconnected");
            console.log(socket.userId);
            socket.leave(socket.room)
            socket.emit('connection-lost', '');


        }) // end of on disconnect

        socket.on('add-assignee', (data) => {
            //console.log(data)
            issueController.addAssignee(data, (err, result) => {
                if (err) {
                    err.assignedById = data.assignedById;
                    myIO.in(socket.room).emit('new-assignee', err);
                }
                else {
                    myIO.in(socket.room).emit('new-assignee', result);
                }
            });
        }) // end of on add-assignee

        socket.on('delete-assignee', (data) => {
            //console.log(data)
            issueController.removeAssigneeOnIssue(data, (err, result) => {
                if (err) {
                    console.log(err)
                    err.assignedById = data.assignedById;
                    myIO.in(socket.room).emit('deleted-assignee', err);
                }
                else {
                    myIO.in(socket.room).emit('deleted-assignee', result);
                }
            });
        }) // end of on delete-assignee

        socket.on('add-comment', (data) => {
            //console.log(data)
            issueController.addCommentByIssueId(data, (err, result) => {
                if (err) {
                    console.log(err)
                    err.creatorId = data.userId;
                    myIO.in(socket.room).emit('new-comment', err);
                }
                else {
                    console.log("emitting new-comment event")
                    myIO.in(socket.room).emit('new-comment', result);
                }
            });
        })

        socket.on('delete-comment', (data) => {
            //console.log(data)
            issueController.deleteComment(data, (err, result) => {
                if (err) {
                    console.log(err)
                    err.creatorId = data.userId;
                    myIO.in(socket.room).emit('deleted-comment', err);
                }
                else {
                    console.log(result)
                    console.log("result is")
                    myIO.in(socket.room).emit('deleted-comment', result);
                }
            });
        })

        socket.on('add-watcher', (data) => {
            //console.log(data)
            issueController.addWatcherToIssue(data, (err, result) => {
                if (err) {
                    console.log(err)
                    err.creatorId = data.userId;
                    myIO.in(socket.room).emit('new-watcher', err);
                }
                else {
                    console.log(result)
                    result.details = data
                    console.log("emitting new-watcher event")
                    myIO.in(socket.room).emit('new-watcher', result);
                }
            });
        })

    });
}

module.exports = {
    setServer: setServer
}


