import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    fullName:"Adarsh Balika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments:[]
  },
  {
    _id: uuid(),
    content:
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "preetha",
    createdAt:"2022-04-21",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        comment: "nice work",
        username: "preetha",
        fullName: "Preetha Srninvasan",
        profileAvatar:
          "https://res.cloudinary.com/preetha/image/upload/v1652684031/connect/girlpic3_sl9tmn.jpg",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      }
    ]
  },
  {
    _id: uuid(),
    content:
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    likes: {
      likeCount: 2,
      likedBy: [
        {
          _id: uuid(),
          fullName: "Preetha Srinivasan",
          username: "preetha",
          profileAvatar:
            "https://res.cloudinary.com/preetha/image/upload/v1652684031/connect/girlpic3_sl9tmn.jpg",
        },
        {
          _id: uuid(),
          fullName: "Srinithi Sridharan",
          username: "srinithi",
          profileAvatar:
            "https://res.cloudinary.com/preetha/image/upload/v1652684041/connect/girlpic6_sey5om.jpg",
        },
      ],
      dislikedBy: [],
    },
    username: "swetha",
    fullName:"Swetha Srinivasan",
    createdAt: "2021-05-23",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        comment: "good morning",
        username: "adarshbalika",
        fullName: "Adarsh Balika",
        profileAvatar:
          "https://res.cloudinary.com/preetha/image/upload/v1652684006/connect/girlpic2_nxes45.jpg",
        createdAt: formatDate(),
        updatedAt: formatDate(),
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      }]
  },
  {
    _id: uuid(),
    content:
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "tanay",
    fullName:"Tanay Pratap",
    createdAt: "2020-07-16",
    updatedAt: formatDate(),
    comments:[]
  },
  {
    _id: uuid(),
    content:
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "srinithi",
    fullName:"Srinithi Sridharan",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        comment: "hey there...",
        username: "tanay",
        fullName: "Tanay Pratap",
        profileAvatar:
          "https://res.cloudinary.com/preetha/image/upload/v1652684039/connect/girlpic5_dpyova.jpg",
        createdAt: "2022-01-17",
        updatedAt: formatDate(),
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      }]
  },
  {
    _id: uuid(),
    content:
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    fullName:"Adarsh Balika",
    createdAt: "2022-03-09",
    updatedAt: formatDate(),
    comments:[]
  },
  {
    _id: uuid(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "preetha",
    createdAt:"2021-04-21",
    updatedAt: formatDate(),
    comments: [
      {
        _id: uuid(),
        comment: "nice work",
        username: "preetha",
        fullName: "Preetha Srninvasan",
        profileAvatar:
          "https://res.cloudinary.com/preetha/image/upload/v1652684031/connect/girlpic3_sl9tmn.jpg",
        createdAt: "2021-09-10",
        updatedAt: formatDate(),
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      }
    ]
  },
];
