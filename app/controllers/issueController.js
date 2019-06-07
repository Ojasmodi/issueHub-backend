const mongoose = require('mongoose');
const IssueModel = mongoose.model('Issue')
const AssignModel = mongoose.model('Assignee')
const CommentModel = mongoose.model('Comment')
const shortid = require('shortid');
const time = require('../libs/timeLib');
const response = require('../libs/responseLib')
const logger = require('../libs/loggerLib');
const check = require('../libs/checkLib')

let addIssue = (req, res) => {

    const url = "http://localhost:3000"

    let issue = new IssueModel({
        issueId: shortid.generate(),
        title: req.body.title,
        description: req.body.description,
        reportedBy: req.body.reportedBy,
        reportedByUserId: req.body.reportedByUserId,
        status: req.body.status,
        createdOn: time.now(),
        screenshot: url + "/issueUploads/" + req.file.filename,
    })

    issue.save((err, newissue) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'issueController:addIssue ', 10)
            let apiResponse = response.generate(true, 'Failed to add new Issue', 500, null)
            res.send(apiResponse)
        }
        else {
            newissue = newissue.toObject();
            delete newissue['_id'];
            delete newissue['__v'];
            let apiResponse = response.generate(false, 'Issue created', 200, newissue)
            res.send(apiResponse)
        }
    })
}
// end of add issue method

let getIssueById = (req, res) => {

    let issueId = req.params.id;

    let verifyId = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(issueId)) {
                logger.error("No issue id found", "IssueController: getIssueById", 10);
                let apiResponse = response.generate(true, "No issue id found", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    } // end of verifyId

    let findIssue = () => {
        return new Promise((resolve, reject) => {
            IssueModel.findOne({ issueId: issueId })
                .select('-__v -_id').lean()
                .exec((err, result) => {
                    if (err) {
                        logger.error(err, 'IssueController: getIssueById:- findIssue', 10);
                        let apiResponse = response.generate(true, 'Failed To Find Issue Details', 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.error('No Issue Found', 'IssueController: getIssueById:-findIssue', 20);
                        let apiResponse = response.generate(true, 'No Issue Found', 404, null);
                        reject(apiResponse);
                    } else {
                        logger.info('Issue Found', 'IssueController: getIssueById: findIssue()', 30);
                        resolve(result);
                    }
                });
        });
    } // end of findIssue


    verifyId(req, res)
        .then(findIssue)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Issue found successfully", 200, resolve);
            res.send(apiResponse);
        }).catch((err) => {
            res.send(err);
        });
}
//end of get issue by id

let getAllIssues = (req, res) => {

    IssueModel.find().sort({ createdOn: -1 }).select('-_id -__v').lean().exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Issue Controller: getAllIssue', 10)
            let apiResponse = response.generate(true, 'Failed To find Issue details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Issue Found', 'Issue Controller: getAllIssues')
            let apiResponse = response.generate(true, 'No Issue Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'All Issues Found', 200, result)
            res.send(apiResponse)
        }
    });
}
// end of get all issues

let editIssueById = (req, res) => {

    let issueId = req.params.id;
    let options = req.body;

    let verifyInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(issueId)) {
                logger.error("Empty issueId string", "IssueController: editIssueById: verifyInput()", 20);
                let apiResponse = response.generate(true, "Empty userId string, couldn't locate user", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    }// end of verify input

    let findIssue = () => {
        return new Promise((resolve, reject) => {
            IssueModel.findOne({ 'issueId': issueId }).select('-_id -__v').lean().exec((err, result) => {
                if (err) {
                    logger.error(`Error occurred: ${err}`, "IssueController: editIssueById: findIssue()", 10);
                    let apiResponse = response.generate(true, "Couldn't locate issue", 500, null);
                    reject(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.error(`Cannot find Issue`, "IssueController: editIssueById: findIssue()", 20);
                    let apiResponse = response.generate(true, "Couldn't locate Issue", 404, null);
                    reject(apiResponse);
                } else {
                    logger.info(`Found issue`, "IssueController: editIssueById: findIssue()", 30);
                    resolve(result);
                }
            });
        });
    }// end of find issue

    let updateIssue = () => {

        if (req.file) {
            const url = "http://localhost:3000"
            path = url + "/issueUploads/" + req.file.filename,
                options.screenshot = path;
        }

        return new Promise((resolve, reject) => {
            IssueModel.update({ 'issueId': issueId }, options).exec((err, result) => {

                if (err) {
                    logger.error(`Error occurred: ${err}`, "IssueController: editIssueById: updateIssue()", 10);
                    let apiResponse = response.generate(true, "failed to update user", 500, null);
                    reject(apiResponse);
                } else if (result.n > 0) {
                    logger.info(`Issue updated successfully`, "IssueController: editIssueById: updateIssue()", 20);
                    resolve(result);
                } else {
                    logger.error("No new data found to update", "IssueController: editIssueById: updateIssue()", 30);
                    let apiResponse = response.generate(true, "No new data found to update", 404, null);
                    reject(apiResponse);
                }
            });
        });
    } // end of update issue


    verifyInput(req, res)
        .then(findIssue)
        .then(updateIssue)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Issue updated successfully", 200, null);
            res.send(apiResponse);
        }).catch((err) => {
            res.send(err);
        });

}
// end of edit Issue details

let addCommentByIssueId = (data, cb) => {

    let issueId = data.issueId;
    let creatorId = data.userId;
    let creatorName = data.fullName;

    let issueExists = () => {
        return new Promise((resolve, reject) => {
            IssueModel.findOne({ issueId: issueId })
                .select('-_id -__v').lean().exec((err, result) => {
                    if (err) {
                        logger.error(`Error occurred while searching for issue: ${err}`, "IssueController: addCommentByIssueId: issueExists()", 10);
                        let apiResponse = response.generate(true, "Error occurred while searching for the issue", 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.error("Couldn't find the issue to comment", "IssueController: addCommentByIssueId: issueExists()", 20);
                        let apiResponse = response.generate(true, "Unable to find the issue to comment on it", 404, null);
                        reject(apiResponse);
                    } else {
                        resolve(data);
                    }
                });
        });

    }// end of issue exists


    let createComment = () => {

        let newComment = new CommentModel({
            commentId: shortid.generate(),
            comment: data.comment,
            issueId: issueId,
            creatorId: creatorId,
            creatorName: creatorName,
            createdOn: time.now()
        });

        return new Promise((resolve, reject) => {
            newComment.save((err, result) => {
                if (err) {
                    logger.error(`Error occurred while creating comment: ${err}`, "IssueController: addCommentByIssueId: createComment()", 10);
                    let apiResponse = response.generate(true, "Unable to add comment", 500, null);
                    reject(apiResponse);
                } else {
                    logger.info("Comment created successfully", "IssueController: addCommentByIssueId: createComment()", 30);
                    let resultObj = newComment.toObject();
                    delete resultObj.__v;
                    delete resultObj._id;
                    resolve(resultObj);
                }
            });
        });
    }// end of createComment

    issueExists(data)
        .then(createComment)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Comment added successfully", 200, resolve);
            //res.send(apiResponse);
            cb(null, apiResponse)
        }).catch((err) => {
            //res.send(err);
            cb(err, null)
        })

}
//end of add comment method

let getAllCommentOnIssue = (req, res) => {
    let issueId = req.params.issueId;

    let verifyInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(issueId)) {
                logger.error("Empty issueId string", "IssueController: getAllCommentOnIssue: verifyInput", 10);
                let apiResponse = response.generate(true, "Empty issueId string, couldn't locate issue", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    }// end of verify input

    let findComments = () => {
        return new Promise((resolve, reject) => {
            CommentModel.find({ 'issueId': issueId })
                .select('-_id -__v').lean().exec((err, result) => {
                    if (err) {
                        logger.error(`${err}`, "IssueController: getAllCommentOnIssue: findComments", 10);
                        let apiResponse = response.generate(true, "Unable to retrieve comments", 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.error("No comments found for the Issue", "IssueController: getAllCommentOnIssue: findComments()", 20);
                        let apiResponse = response.generate(true, "No comments found for the Issue", 404, null);
                        reject(apiResponse);
                    } else {
                        logger.info("All comments retrivied successfully", "IssueController: getAllCommentOnIssue: findComments()", 30);
                        resolve(result);
                    }
                });
        });
    }// end of find comments

    verifyInput(req, res)
        .then(findComments)
        .then((resolve) => {
            let apiResponse = response.generate(false, "All comments retrieved successfully", 200, resolve);
            res.send(apiResponse);
        }).catch((err) => {
            res.send(err);
        });

}


let deleteComment = (data, cb) => {
    //let userId = data.userId;
    //console.log(data)
    let commentId = data.commentId;
    let issueId = data.issueId;

    let verifyInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(commentId)) {
                logger.error("Empty commentId string", "IssueController: deleteComment: verifyInput", 10);
                let apiResponse = response.generate(true, "Empty commentId string, couldn't locate comment", 500, null);
                reject(apiResponse);
            } else {
                resolve(data);
            }
        });
    }// end of verify input

    let issueExists = () => {
        return new Promise((resolve, reject) => {
            IssueModel.findOne({ issueId: issueId })
                .select('-_id -__v').lean().exec((err, result) => {
                    if (err) {
                        logger.error(`Error occurred while searching for issue: ${err}`, "IssueController: addComment: issueExists()", 10);
                        let apiResponse = response.generate(true, "Error occurred while searching for the issue", 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.error("Couldn't find the issue to delete", "IssueController: addComment: issueExists", 20);
                        let apiResponse = response.generate(true, "Unable to find the issue to comment on it", 404, null);
                        reject(apiResponse);
                    } else {
                        //issueDetails = result
                        resolve(data);
                    }
                });
        });

    }// end of issue exists

    let removeComment = () => {
        return new Promise((resolve, reject) => {
            CommentModel.findOneAndRemove({ commentId: commentId })
                .exec((err, result) => {
                    if (err) {
                        logger.error(`Error occurred while deleting comment: ${err}`, "IssueController: removeComment", 10);
                        let apiResponse = response.generate(true, "Error occurred while deleting comment", 500, null);
                        reject(apiResponse);
                    } else if (!check.isEmpty(result)) {
                        logger.info("Successfully deleted comment", "IssueController: removeComment", 30);
                        resolve(result);
                    } else {
                        logger.error("Invalid comment id", "IssueController: removeComment", 20);
                        let apiResponse = response.generate(true, "Unable to delete comment, check the comment id", 404, null);
                        reject(apiResponse);
                    }
                });
        });
    }// end of removeComment

    verifyInput(data)
        .then(issueExists)
        .then(removeComment)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Successfully deleted comment", 200, resolve);
            cb(null, apiResponse)
        }).catch((err) => {
            cb(err, null)
        });

}

let getAllIssuesByUserId = (req, res) => {

    let userId = req.params.userId;
    let allIssueIds = [];

    let getIssueIds = (req, res) => {
        return new Promise((resolve, reject) => {
            AssignModel.find({ assignedToId: userId }).lean().select('issueId -_id')
                .exec((err, result) => {
                    if (err) {
                        logger.error(`${err}`, "IssueController: getAllIssuesByUserId: getIssueIds()", 10);
                        let apiResponse = response.generate(true, "Server error, failed to retrieve assigned issues", 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.error("No Issues yet assigned to user", "IssueController: getAllIssuesByUserId: getIssueIds()", 20);
                        let apiResponse = response.generate(true, "No Issues yet assigned to you", 404, 'Nodata');
                        reject(apiResponse);
                    } else {
                        for (x of result) {
                            allIssueIds.push(x.issueId);
                        }
                        console.log(result)
                        resolve(allIssueIds);
                    }
                })
        })
    } //end of getIssueIds

    let getAllIssues = (issueIds) => {
        return new Promise((resolve, reject) => {
            IssueModel.find({ issueId: issueIds }).lean().select('-_id -__v')
                .exec((err, result) => {
                    if (err) {
                        logger.error(`${err}`, "IssueController: getAllIssuesByUserId: getAllIssues()", 10);
                        let apiResponse = response.generate(true, "Server error, failed to retrieve assigned issues", 500, null);
                        reject(apiResponse);
                    } else {
                        resolve(result);
                    }
                })

        })
    }//end of getAllIssues

    getIssueIds(req, res)
        .then(getAllIssues)
        .then((resolve) => {
            let apiResponse = response.generate(false, "All Issue assigned to the user retrieved successfully", 200, resolve);
            res.send(apiResponse);
        }).catch((err) => {
            res.send(err);
        })


}

let addWatcherToIssue = (data, cb) => {

    verifyIfExists = () => {
        return new Promise((resolve, reject) => {
            IssueModel.find({ issueId: data.issueId }).lean()
                .exec((err, result) => {
                    if (err) {
                        logger.error(`${err}`, "IssueController: addWatcherToIssue: verifyifExists()", 10);
                        let apiResonse = response.generate(true, "Couldn't verify if user is already to watch list", 500, null);
                        reject(apiResonse);
                    }
                    else if (check.isEmpty(result)) {
                        logger.error("No issue exists", "IssueController: addWatcherToIssue: verifyifExists()", 20);
                        let apiResonse = response.generate(true, "Issue not exist anymore.", 304, null);
                        reject(apiResonse);
                    } else {
                        resolve(data)
                    }
                })
        });
    }

    addWatcher = () => {
        return new Promise((resolve, reject) => {
            IssueModel.update({ issueId: data.issueId }, { $push: { watchersList: data } }, (err, result) => {
                if (err) {
                    logger.error(`${err}`, "IssueController: addWatcherToIssue: addToWatcher()", 10);
                    let apiResponse = response.generate(true, "Unable to add you to watch list", 500, null);
                    reject(apiResponse)
                }
                else {
                    logger.info("successfully added to watch list", "IssueController: addWatcherToIssue:addToWatcher()", 20);
                    resolve(data)
                }
            })
        })
    }


    verifyIfExists(data)
        .then(addWatcher)
        .then((resolve) => {
            let apiResponse = response.generate(false, "You were successfully added to watch list for this issue", 200, resolve);
            cb(null, apiResponse);
        }).catch((err) => {
            cb(err, null);
        });

}
// end of add watcher to issue

let getAllWatchers = (req, res) => {

    //console.log(req)
    IssueModel.findOne({ issueId: req.params.issueId }).select('watchersList').lean().exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'Issue Controller: getAllWatchers', 10)
            let apiResponse = response.generate(true, 'Failed To find watchers details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {

            logger.info('No Watchers Found', 'Issue Controller: getAllWatchers')
            let apiResponse = response.generate(true, 'No watchers Found', 404, null)
            res.send(apiResponse)
        } else {
            //console.log(result)
            let apiResponse = response.generate(false, 'All Watchers Found', 200, result)
            res.send(apiResponse)
        }
    });
}
// end of get all issues

let deleteIssue = (req, res) => {

    let issueId = req.params.issueId;

    let deleteIssue = () => {
        return new Promise((resolve, reject) => {
            IssueModel.findOneAndRemove({ 'issueId': issueId })
                .exec((err, result1) => {
                    if (err) {
                        logger.error(`${err}`, "IssueController: deleteIssue", 10);
                        let apiResponse = response.generate(true, "Couldn't delete the issue", 500, null);
                        reject(apiResponse);
                    } else if (!check.isEmpty(result1)) {
                        //console.log(result1)
                        logger.info("Issue removed successfully", "IssueController:deleteIssue", 30);
                        resolve(result1);

                    } else {
                        logger.error(`Couldn't found the issue while deleting it`, "IssueController:deleteIssue", 20);
                        let apiResponse = response.generate(true, "Couldn't delete the issue, invalid Id or already removed.", 404, null);
                        reject(apiResponse);
                    }
                });
        });
    }// end of remove issue

    let removeAssigneesOnIssue = (result1) => {
        return new Promise((resolve, reject) => {
            AssignModel.deleteMany({ issueId: issueId })
                .exec((err, result) => {
                    if (err) {
                        logger.error(`${err}`, "IssueController: deleteIssue: removeAssigneesOnIssue()", 10);
                        let apiResponse = response.generate(true, "Couldn't remove assignees on issue", 500, null);
                        reject(apiResponse);
                    } else {
                        logger.error(`Couldn't found any assignee on issue`, "IssueController: deleteIssue: removeAssigneesOnIssue()", 30);
                        resolve(result1);
                    }
                })
        })
    }//end of remove assignee on issue


    let removeCommentsOnIssue = (result1) => {
        return new Promise((resolve, reject) => {
            CommentModel.deleteMany({ issueId: issueId })
                .exec((err, result) => {
                    if (err) {
                        logger.error(`${err}`, "IssueController: deleteIssue: removeCommentsOnIssue()", 10);
                        let apiResponse = response.generate(true, "Couldn't remove watchers on the issue", 500, null);
                        reject(apiResponse);
                    } else {
                        logger.error(`Couldn't found any comment on issue`, "IssueController:deleteIssue: removeCommentsOnIssue()", 20);

                        resolve(result1);
                    }
                })
        })
    }

    deleteIssue(req, res)
        .then(removeAssigneesOnIssue)
        .then(removeCommentsOnIssue)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Issue is removed successfully.", 200, null);
            console.log(apiResponse);
            res.send(apiResponse);
        }).catch((err) => {
            res.send(err);
        });

}
// end of remove issue

let addAssignee = (data, cb) => {
    let issueId = data.issueId;
    let assignerId = data.assignedById;
    let assignedToName = data.assignedToName;
    let assignedToId = data.assignedToId;

    let checkIfExists = () => {
        return new Promise((resolve, reject) => {
            AssignModel.find({ issueId: issueId, assignedToId: assignedToId })
                .exec((err, result) => {
                    if (err) {
                        logger.error(`${err}`, "IssueController: addAssignee(): checkIfExists()", 10);
                        let apiResonse = response.generate(true, "Couldn't add user to assignee for the issue, server error", 500, null);
                        reject(apiResonse);
                    } else if (check.isEmpty(result)) {
                        resolve(data);
                    } else {
                        logger.error(`User already present in assignee list for the issue`, "IssueController: addAssignee(): checkIfExists()", 20);
                        let apiResponse = response.generate(true, "User already present in assignee list for the issue", 300, null);
                        reject(apiResponse);
                    }
                })
        })

    }

    let createAssignee = () => {
        let newAssignee = new AssignModel({
            assigneeId: shortid.generate(),
            issueId: issueId,
            assignedById: assignerId,
            assignedToId: assignedToId,
            assignedToName: assignedToName,
            assignedOn: time.now()
        });

        return new Promise((resolve, reject) => {
            newAssignee.save((err, result) => {
                if (err) {
                    logger.error(`${err}`, "IssueController: addAssignee(): createAssignee()", 10);
                    let apiResonse = response.generate(true, "Unable to assign an assignee", 500, null);
                    reject(apiResonse);
                } else {
                    logger.info("new Assignee created successfully", "IssueController: addAssignee(): createAssignee()", 30);
                    resolve(result);
                }
            });
        })
    }

    checkIfExists(data)
        .then(createAssignee)
        .then((resolve) => {
            let apiResponse = response.generate(false, "New assignee created successfully", 200, resolve);
            cb(null, apiResponse);
        }).catch((err) => {
            cb(err, null)
        });

}

let getAllAssigneeOnIssue = (req, res) => {
    let issueId = req.params.id;

    let verifyInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(issueId)) {
                logger.error("Empty issueId string", "IssueController: getAllAssigneeOnIssue(): verifyInput()", 10);
                let apiResponse = response.generate(true, "Empty issueId string, couldn't locate issue", 500, null);
                reject(apiResponse);
            } else {
                resolve(req);
            }
        });
    }// end of verify input

    let findAssignee = () => {
        return new Promise((resolve, reject) => {
            AssignModel.find({ issueId: issueId }).select('-__v -_id').lean()
                .exec((err, result) => {
                    if (err) {
                        logger.error(`${err}`, "IssueController: getAllAssigneeOnIssue: findAssignee()", 10);
                        let apiResponse = response.generate(true, "Unable to get assignees on the issue, server error", 500, null);
                        reject(apiResponse);
                    } else if (check.isEmpty(result)) {
                        logger.error("No assignee found for the Issue", "IssueController: getAllAssigneeOnIssue: findAssignee()", 20);
                        let apiResponse = response.generate(true, "No comments found for the Issue", 404, null);
                        reject(apiResponse);
                    } else {
                        logger.info("All assignees retrivied successfully", "IssueController: getAllAssigneeOnIssue: findAssignee()", "successful");
                        resolve(result);
                    }
                })
        });
    }

    verifyInput(req, res)
        .then(findAssignee)
        .then((resolve) => {
            let apiResonse = response.generate(false, "All assignees retrieved successfully", 200, resolve);
            res.send(apiResonse);
        }).catch((err) => {
            res.send(err);
        });

}

let removeAssigneeOnIssue = (data, cb) => {
    let assigneeId = data;

    let verifyInput = () => {
        return new Promise((resolve, reject) => {
            if (check.isEmpty(assigneeId)) {
                logger.error("Empty commentId string", "IssueController: removeAssigneeOnIssue(): verifyInput()", 10);
                let apiResponse = response.generate(true, "Empty assignId string, couldn't locate assignee", 500, null);
                reject(apiResponse);
            } else {
                resolve(data);
            }
        });
    }// end of verify input

    let removeAssignee = () => {
        return new Promise((resolve, reject) => {
            AssignModel.findOneAndRemove({ assigneeId: assigneeId }).exec((err, result) => {
                if (err) {
                    logger.error(`${err}`, "IssueController: removeAssigneeOnIssue: removeAssignee()", 10);
                    let apiResponse = response.generate(true, "There was an error so we coukdn't remove the assignee", 500, null);
                    reject(apiResponse);
                } else if (!check.isEmpty(result)) {
                    logger.info("Successfully removed assignee", "IssueController: removeAssigneeOnIssue: removeAssignee()", 30);
                    resolve(result);
                } else {
                    logger.error("Invalid assign id", "IssueController: removeAssigneeOnIssue(): removeAssignee()", 20);
                    let apiResponse = response.generate(true, "Unable to remove assignee, check the assign id", 404, null);
                    reject(apiResponse);
                }
            })
        });
    }

    verifyInput(data)
        .then(removeAssignee)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Successfully removed assignee from the issue", 200, resolve);
            cb(null, apiResponse);
        }).catch((err) => {
            cb(err, null)
        })

}

module.exports = {
    addIssue: addIssue,
    getAllIssues: getAllIssues,
    editIssueById: editIssueById,
    getIssueById: getIssueById,
    deleteIssue: deleteIssue,
    addCommentByIssueId: addCommentByIssueId,
    getAllCommentOnIssue: getAllCommentOnIssue,
    deleteComment: deleteComment,
    addWatcherToIssue: addWatcherToIssue,
    addAssignee: addAssignee,
    getAllAssigneeOnIssue: getAllAssigneeOnIssue,
    removeAssigneeOnIssue: removeAssigneeOnIssue,
    getAllWatchers: getAllWatchers,
    getAllIssuesByUserId: getAllIssuesByUserId
}