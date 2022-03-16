const { v4 } = require("uuid");

module.exports.db = [
    {
        username: "Jo",
        password: "123",
        nickname: "Jojo",
        avatar: "https://image.shutterstock.com/image-vector/avatar-man-icon-symbol-simple-260nw-1701935266.jpg",
        followers: ["Johana"],
        tweets: [
            {
                id: v4(),
                author: "Jo",
                text: "Hello this is my first tweet!",
                published: new Date(),
                likes: ["Johana", "Michal"],
                comments: [{
                    username: "Jenny",
                    text: "How , so smart!",
                    published: new Date()
                }
            ]
            },
            {
                id: v4(),
                author: "Jo",
                text: "Hello this is my second tweet!",
                published: new Date(),
                likes: ["Jenny"],
                comments: [{
                    username: "Johana",
                    text: "intresting!",
                    published: new Date()
                }]
            }
        ]
    },
    {
        username: "Johana",
        password: "123",
        nickname: "Johana",
        avatar: "https://image.shutterstock.com/image-vector/avatar-man-icon-symbol-simple-260nw-1701935266.jpg",
        followers: ["Jo"],
        tweets: [
            {
                id: v4(),
                author:"Johana",
                text: "Hello everybody!",
                published: new Date(),
                likes: ["Jo"],
                comments: [{
                    username: "Jenny",
                    text: "How , so smart!",
                    published: new Date()
                }
            ]
            },
            {
                id: v4(),
                author:"Johana",
                text: "Hello everbody again!",
                published: new Date(),
                likes: ["Jenny"],
                comments: [{
                    username: "Jo",
                    text: "intresting!",
                    published: new Date()
                }]
            }
        ]
    },
    {
        username: "Jenny",
        password: "123",
        nickname: "Jen",
        avatar: "https://image.shutterstock.com/image-vector/avatar-man-icon-symbol-simple-260nw-1701935266.jpg",
        followers: [],
        tweets: []
    }
]