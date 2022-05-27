import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    userHandler:"adarsh1997",
    fullName:"Adarsh Balika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:"Aspiring FrontEnd Developer",
    website:"https://adarshbalika.netlify.app/",
    profileUrl:"https://res.cloudinary.com/preetha/image/upload/v1652684006/connect/girlpic2_nxes45.jpg",
    following: [
      { _id: uuid(), fullName: "Preetha Srinivasan", username: "preetha" },
      { _id: uuid(), fullName: "swetha Srinivasan", username: "swetha" },
    ],
    followers: [
      { _id: uuid(), fullName: "Preetha Srinivasan", username: "preetha" },
    ],
  },
  
  {
    _id: uuid(),
    firstName: "Preetha",
    lastName: "Srinivasan",
    username: "preetha",
    password: "chitra",
    fullName:"Preetha Srinivasan",
    userHandler:"preetha2000",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:"learning FrontEnd @neogcamp",
    website:"https://homepreetha.netlify.app/",
    profileUrl:"https://res.cloudinary.com/preetha/image/upload/v1652684031/connect/girlpic3_sl9tmn.jpg",
    following: [
      { _id: uuid(), fullName: "Adarsh Balika", username: "adarshbalika" },
      { _id: uuid(), fullName: "Swetha Srinivasan", username: "swetha" },
    ],
    followers: [
      { _id: uuid(), fullName: "Swetha Srinivasan", username: "swetha" },
    ],

  },
  
  {
    _id: uuid(),
    firstName: "Tanay",
    lastName: "Pratap",
    username: "tanaypratap",
    password: "tanay123",
    fullName:"Tanay Pratap",
    userHandler:"tanay@2",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:"Fixing Education",
    website:"https://twitter.com/invactHQ",
    profileUrl:"https://res.cloudinary.com/preetha/image/upload/v1652684039/connect/girlpic5_dpyova.jpg",
    following: [
      { _id: uuid(), fullName: "Adarsh Balika", username: "adarshbalika" },
      { _id: uuid(), fullName: "Swetha Srinivasan", username: "swetha" },
    ],
    followers: [
      { _id: uuid(), fullName: "Swetha Srinivasan", username: "swetha" },
    ],
  },
  
  {
    _id: uuid(),
    firstName: "Srinithi",
    lastName: "Sridharan",
    username: "srinithi",
    userHandler:"srinithi@20",
    password: "srinithi123",
    fullName:"Srinithi Sridharan",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:"system Engineer@cognizant",
    
    profileUrl:"https://res.cloudinary.com/preetha/image/upload/v1652684041/connect/girlpic6_sey5om.jpg",
    following: [
      { _id: uuid(), fullName: "Adarsh Balika", username: "adarshbalika" },
      { _id: uuid(), fullName: "Swetha Srinivasan", username: "swetha" },
    ],
    followers: [
      { _id: uuid(), fullName: "Swetha Srinivasan", username: "swetha" },
    ],
  },
  {
    _id: uuid(),
    firstName: "Swetha",
    lastName: "Srinivasan",
    username: "swetha",
    userHandler:"swetha@10",
    password: "sweths123",
    fullName:"Swetha Srinivasan",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:"system Engineer@TCS",
    
    profileUrl:"https://res.cloudinary.com/preetha/image/upload/v1652684041/connect/girlpic6_sey5om.jpg",
    following: [
      { _id: uuid(), fullName: "Adarsh Balika", username: "adarshbalika" },
      { _id: uuid(), fullName: "Preetha Srinivasan", username: "preetha" },
    ],
    followers: [
      { _id: uuid(), fullName: "Preetha Srinivasan", username: "preetha" },
    ],
  },
  

];
