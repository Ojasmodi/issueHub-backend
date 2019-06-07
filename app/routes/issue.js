
const issueController = require("./../../app/controllers/issueController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const multer = require('./../middlewares/ImageUploadMulter')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/issue`;


    app.post(`${baseUrl}/add`, auth.isAuthorized, multer, issueController.addIssue);
    /**
     * @api {post} /api/v1/issue/add Create Issue
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} title to be passed as a body parameter
     *  @apiParam {String} description to be passed as a body parameter
     *  @apiParam {String} iscreenshot to be passed as a body parameter
     *  @apiParam {String} status to be passed as a body parameter
     *  @apiParam {String} reportedBy to be passed as a body parameter
     *  @apiParam {String} reportedByUserId to be passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"Issue created",
            "status":200,
            "data": {
                     "createdOn": "2019-06-04T17:42:46.000Z",
                     "reportedByUserId": "SIpbjGUsh",
                     "reportedBy": "ojas modi",
                     "status": "In-progress",
                     "watchersList": [],
                     "screenshot": "link to image",
                     "assignedTo": [],
                     "description": "<p>A start of issue.</p>",
                     "title": "Image Issue created",
                     "issueId": "mbsGbDfrT"
                    }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    app.get(`${baseUrl}/getallAssignees/:id`, auth.isAuthorized, issueController.getAllAssigneeOnIssue);
    /**
     * @api {post} /api/v1/issue/getallAssignees/:id Get all Assignees on Issue
     * @apiVersion 1.0.0
     * @apiGroup Assignee
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"All assignees retrieved successfully",
            "status":200,
            "data":[{
                    assigneeId:"4tUFCsbKx"
                    issueId:"mbsGbDfrT"
                    assignedById:"SIpbjGUsh"
                    assignedToId:"pkWsDktY4"
                    assignedToName:"Golu Modi"
                    assignedOn:2019-06-04 18:42:49.000
                },]
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    app.get(`${baseUrl}/getallWatchers/:issueId`, auth.isAuthorized, issueController.getAllWatchers);
    /**
     * @api {get} /api/v1/issue/getallWatchers/:issueId Get All watchers on Issue
     * @apiVersion 1.0.0
     * @apiGroup Watchlist
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"All Watchers Found",
            "status":200,
            "data":[ {
                    "userId": "SIpbjGUsh",
                    "userName": "ojas modi",
                    "issueId": "mbsGbDfrT"
                },
                {
                    "userId": "pkWsDktY4",
                    "userName": "xyxz Modi",
                    "issueId": "mbsGbDfrT"
                },]
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    app.get(`${baseUrl}/getallComments/:issueId`, auth.isAuthorized, issueController.getAllCommentOnIssue);
    /**
     * @api {get} /api/v1/issue/getallComments/:issueId get all comments on Issue
     * @apiVersion 1.0.0
     * @apiGroup Comment
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"All comments retrieved successfully",
            "status":200,
            "data":[{
                        "commentId": "string",
                        "comment": "string",
                        "issueId": "string",
                        "creatorId": "string",
                        "creatorName": "string",
                        "createdOn": "Date"
                },]
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    app.get(`${baseUrl}/getIssue/:id`, auth.isAuthorized, issueController.getIssueById);
    /**
     * @api {get} /api/v1/issue/getIssue/:id Get Single Issue
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a URL Parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"Issue found successfully",
            "status":200,
            "data": {
                     "createdOn": "2019-06-04T17:42:46.000Z",
                     "reportedByUserId": "SIpbjGUsh",
                     "reportedBy": "ojas modi",
                     "status": "In-progress",
                     "watchersList": [
                         {
                          "userId": "SIpbjGUsh",
                          "userName": "ojas modi",
                          "issueId": "mbsGbDfrT"
                         },
                     ],
                     "screenshot": "link to image",
                     "assignedTo": [],
                     "description": "<p>A start of issue.</p>",
                     "title": "Image Issue created",
                     "issueId": "mbsGbDfrT"
                    }
        }
     @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
     */

    app.get(`${baseUrl}/all`, auth.isAuthorized, issueController.getAllIssues);
    /**
     * @api {get} /api/v1/issue/all Get All Issues
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "All Issues Found",
            "status": 200,
            "data": [{
                     "createdOn": "2019-06-04T17:42:46.000Z",
                     "reportedByUserId": "SIpbjGUsh",
                     "reportedBy": "ojas modi",
                     "status": "In-progress",
                     "watchersList": [
                         {
                          "userId": "SIpbjGUsh",
                          "userName": "ojas modi",
                          "issueId": "mbsGbDfrT"
                         },
                     ],
                     "screenshot": "link to image",
                     "assignedTo": [],
                     "description": "<p>A start of issue.</p>",
                     "title": "Image Issue created",
                     "issueId": "mbsGbDfrT"
                     },
                    ]
        }
         @apiErrorExample {json} Error-Response:
	   *
	   * {
	      "error": true,
	      "message": "Error Occured",
	      "status": 500/404,
	      "data": null
	     }
    */

    app.get(`${baseUrl}/issuesByUserId/:userId`, auth.isAuthorized, issueController.getAllIssuesByUserId);
    /**
     * @api {get} /api/v1/issue/issuesByUserId/:userId Get All Issues assigned to user
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} userId .
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"All Issue assigned to the user retrieved successfully",
            "status":200,
            "data": [{
                     "createdOn": "2019-06-04T17:42:46.000Z",
                     "reportedByUserId": "SIpbjGUsh",
                     "reportedBy": "ojas modi",
                     "status": "In-progress",
                     "watchersList": [
                         {
                          "userId": "SIpbjGUsh",
                          "userName": "ojas modi",
                          "issueId": "mbsGbDfrT"
                         },
                     ],
                     "screenshot": "link to image",
                     "assignedTo": [],
                     "description": "<p>A start of issue.</p>",
                     "title": "Image Issue created",
                     "issueId": "mbsGbDfrT"
                     },
                    ]
        }
       @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    app.put(`${baseUrl}/edit/:id`, auth.isAuthorized, multer, issueController.editIssueById);
    /**
     * @api {put} /api/v1/issue/edit/:id Edit Issue
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *  @apiParam {String} issueId to be passed as a URL parameter
     *  @apiParam {String} title to be passed as a body parameter
     *  @apiParam {String} description to be passed as a body parameter
     *  @apiParam {String} screenshot to be passed as a body parameter
     *  @apiParam {String} status to be passed as a body parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error":false,
            "message":"Issue updated successfully",
            "status":200,
            "data": null
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    app.post(`${baseUrl}/delete/:issueId`, auth.isAuthorized, issueController.deleteIssue);
    /**
     * @api {post} /api/v1/issue/delete/:issueId Delete Issue 
     * @apiVersion 1.0.0
     * @apiGroup Issue
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} issueId to be passed as URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Issue is removed successfully",
            "status": 200,
            "data": null
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error message",
	    "status": 500/404,
	    "data": null
	   }
    */
}