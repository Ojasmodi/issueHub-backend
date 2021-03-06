define({ "api": [
  {
    "type": "get",
    "url": "/api/v1/issue/getallAssignees/:id",
    "title": "Get all Assignees on Issue",
    "version": "1.0.0",
    "group": "Assignee",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"All assignees retrieved successfully\",\n           \"status\":200,\n           \"data\":[{\n                   assigneeId:\"4tUFCsbKx\"\n                   issueId:\"mbsGbDfrT\"\n                   assignedById:\"SIpbjGUsh\"\n                   assignedToId:\"pkWsDktY4\"\n                   assignedToName:\"Golu Modi\"\n                   assignedOn:2019-06-04 18:42:49.000\n               },]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/issue.js",
    "groupTitle": "Assignee",
    "name": "GetApiV1IssueGetallassigneesId"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/getallComments/:issueId",
    "title": "get all comments on Issue",
    "version": "1.0.0",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"All comments retrieved successfully\",\n           \"status\":200,\n           \"data\":[{\n                       \"commentId\": \"string\",\n                       \"comment\": \"string\",\n                       \"issueId\": \"string\",\n                       \"creatorId\": \"string\",\n                       \"creatorName\": \"string\",\n                       \"createdOn\": \"Date\"\n               },]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/issue.js",
    "groupTitle": "Comment",
    "name": "GetApiV1IssueGetallcommentsIssueid"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/all",
    "title": "Get All Issues",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"All Issues Found\",\n           \"status\": 200,\n           \"data\": [{\n                    \"createdOn\": \"2019-06-04T17:42:46.000Z\",\n                    \"reportedByUserId\": \"SIpbjGUsh\",\n                    \"reportedBy\": \"ojas modi\",\n                    \"status\": \"In-progress\",\n                    \"watchersList\": [\n                        {\n                         \"userId\": \"SIpbjGUsh\",\n                         \"userName\": \"ojas modi\",\n                         \"issueId\": \"mbsGbDfrT\"\n                        },\n                    ],\n                    \"screenshot\": \"link to image\",\n                    \"assignedTo\": [],\n                    \"description\": \"<p>A start of issue.</p>\",\n                    \"title\": \"Image Issue created\",\n                    \"issueId\": \"mbsGbDfrT\"\n                    },\n                   ]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t      \"error\": true,\n\t      \"message\": \"Error Occured\",\n\t      \"status\": 500/404,\n\t      \"data\": null\n\t     }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiV1IssueAll"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/getIssue/:id",
    "title": "Get Single Issue",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a URL Parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"Issue found successfully\",\n           \"status\":200,\n           \"data\": {\n                    \"createdOn\": \"2019-06-04T17:42:46.000Z\",\n                    \"reportedByUserId\": \"SIpbjGUsh\",\n                    \"reportedBy\": \"ojas modi\",\n                    \"status\": \"In-progress\",\n                    \"watchersList\": [\n                        {\n                         \"userId\": \"SIpbjGUsh\",\n                         \"userName\": \"ojas modi\",\n                         \"issueId\": \"mbsGbDfrT\"\n                        },\n                    ],\n                    \"screenshot\": \"link to image\",\n                    \"assignedTo\": [],\n                    \"description\": \"<p>A start of issue.</p>\",\n                    \"title\": \"Image Issue created\",\n                    \"issueId\": \"mbsGbDfrT\"\n                   }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiV1IssueGetissueId"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/issuesByUserId/:userId",
    "title": "Get All Issues assigned to user",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"All Issue assigned to the user retrieved successfully\",\n           \"status\":200,\n           \"data\": [{\n                    \"createdOn\": \"2019-06-04T17:42:46.000Z\",\n                    \"reportedByUserId\": \"SIpbjGUsh\",\n                    \"reportedBy\": \"ojas modi\",\n                    \"status\": \"In-progress\",\n                    \"watchersList\": [\n                        {\n                         \"userId\": \"SIpbjGUsh\",\n                         \"userName\": \"ojas modi\",\n                         \"issueId\": \"mbsGbDfrT\"\n                        },\n                    ],\n                    \"screenshot\": \"link to image\",\n                    \"assignedTo\": [],\n                    \"description\": \"<p>A start of issue.</p>\",\n                    \"title\": \"Image Issue created\",\n                    \"issueId\": \"mbsGbDfrT\"\n                    },\n                   ]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/issue.js",
    "groupTitle": "Issue",
    "name": "GetApiV1IssueIssuesbyuseridUserid"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/add",
    "title": "Create Issue",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "iscreenshot",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reportedBy",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "reportedByUserId",
            "description": "<p>to be passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"Issue created\",\n           \"status\":200,\n           \"data\": {\n                    \"createdOn\": \"2019-06-04T17:42:46.000Z\",\n                    \"reportedByUserId\": \"SIpbjGUsh\",\n                    \"reportedBy\": \"ojas modi\",\n                    \"status\": \"In-progress\",\n                    \"watchersList\": [],\n                    \"screenshot\": \"link to image\",\n                    \"assignedTo\": [],\n                    \"description\": \"<p>A start of issue.</p>\",\n                    \"title\": \"Image Issue created\",\n                    \"issueId\": \"mbsGbDfrT\"\n                   }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/issue.js",
    "groupTitle": "Issue",
    "name": "PostApiV1IssueAdd"
  },
  {
    "type": "post",
    "url": "/api/v1/issue/delete/:issueId",
    "title": "Delete Issue",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Issue is removed successfully\",\n           \"status\": 200,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error message\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/issue.js",
    "groupTitle": "Issue",
    "name": "PostApiV1IssueDeleteIssueid"
  },
  {
    "type": "put",
    "url": "/api/v1/issue/edit/:id",
    "title": "Edit Issue",
    "version": "1.0.0",
    "group": "Issue",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a URL parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "screenshot",
            "description": "<p>to be passed as a body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>to be passed as a body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"Issue updated successfully\",\n           \"status\":200,\n           \"data\": null\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/issue.js",
    "groupTitle": "Issue",
    "name": "PutApiV1IssueEditId"
  },
  {
    "type": "get",
    "url": "/api/v1/users/view/all",
    "title": "Retrieve All User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"All User Details Found\",\n           \"status\": 200,\n           \"data\": [{\n                   \"createdOn\": \"2019-05-27T08:32:32.000Z\",\n                   \"mobileNumber\": 0,\n                   \"email\": \"ojasmodi88@gmail.com\",\n                   \"password\": \"$2b$10$FfOzzEwPgtWG5otdEHFAaewHeV9j6Xl7LNGcz4QyJr2HoMqcG04iO\",\n                   \"lastName\": \"modi\",\n                   \"firstName\": \"ojas\",\n                   \"userId\": \"SIpbjGUsh\"\n               }]\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User",
    "name": "GetApiV1UsersViewAll"
  },
  {
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "login User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Login successful\",\n           \"status\": 200,\n           \"data\": {\n               \"authToken\": \"string\",\n               \"userId\": \"string\",\n               \"userDetails\": {\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"lastName\": \"string\",\n                   \"fullName\": \"firstName lastName\",\n                   \"email\": \"string\",\n                   \"mobileNumber\": \"number\"\n               }\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersLogin"
  },
  {
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "Logout User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"Logged Out Successfully\",\n           \"status\": 200,\n           \"data\": \"null\"\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersLogout"
  },
  {
    "type": "post",
    "url": "/api/v1/users/resetpass",
    "title": "Reset password",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\": false,\n           \"message\": \"A new password has been sent to your registered mailId.\",\n           \"status\": 200,\n           \"data\": null\n           }\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersResetpass"
  },
  {
    "type": "post",
    "url": "/api/v1/users/signGoogle",
    "title": "Login with Google",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \"error\": false,\n       \"message\": \"Login successful\",\n       \"status\": 200,\n       \"data\": {\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"lastName\": \"tring\",\n                   \"email\": \"string\",\n                   \"mobileNumber\": \"number\"\n               }\n           }\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/400,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersSigngoogle"
  },
  {
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "SignUp User",
    "version": "1.0.0",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobileNo",
            "description": "<p>body parameter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>body parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n       \"error\": false,\n       \"message\": \"User created\",\n       \"status\": 200,\n       \"data\": {\n                   \"userId\": \"string\",\n                   \"firstName\": \"string\",\n                   \"lastName\": \"tring\",\n                   \"email\": \"string\",\n                   \"mobileNumber\": \"number\"\n               }\n           }\n       }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User",
    "name": "PostApiV1UsersSignup"
  },
  {
    "type": "get",
    "url": "/api/v1/issue/getallWatchers/:issueId",
    "title": "Get All watchers on Issue",
    "version": "1.0.0",
    "group": "Watchlist",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>The token for authentication.(Send authToken as query parameter, body parameter or as a header)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "issueId",
            "description": "<p>to be passed as a URL parameter</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n           \"error\":false,\n           \"message\":\"All Watchers Found\",\n           \"status\":200,\n           \"data\":[ {\n                   \"userId\": \"SIpbjGUsh\",\n                   \"userName\": \"ojas modi\",\n                   \"issueId\": \"mbsGbDfrT\"\n               },\n               {\n                   \"userId\": \"pkWsDktY4\",\n                   \"userName\": \"xyxz Modi\",\n                   \"issueId\": \"mbsGbDfrT\"\n               },]\n       }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n\t    \"error\": true,\n\t    \"message\": \"Error Occured\",\n\t    \"status\": 500/404,\n\t    \"data\": null\n\t   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/issue.js",
    "groupTitle": "Watchlist",
    "name": "GetApiV1IssueGetallwatchersIssueid"
  }
] });
