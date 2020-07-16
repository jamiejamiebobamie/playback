const Session = require('../models/session');
const Comment = require('../models/comment');

module.exports = function(app) {
    // CREATE
        app.post("/comment/new", (req, res) => {
            if (req.user) {
                message = req.body.content != ""
                if (message) {
                    var newComment = new Comment();
                    newComment.authorName = req.user.username
                    newComment.author = req.user._id;
                    newComment.content = req.body.content;
                    newComment.timeStamp = Math.random(); // placeholder
                    newComment.save()
                    .then( user => { res.redirect('/'); } )
                    .catch( err => { console.log(err.message); } );
                }
            } else {
                return res.status(401); // UNAUTHORIZED
            }
        });
    // READ -- INDEX
    // just for proof of concept to show that it works.
    app.get('/', (req, res) => {
        if (req.user) {
            Comment
            .find() // finds all Comment documents in the collection in the database
            .lean() // turns the mongoose object(s) into JSON
            .then( comments => { res.render( 'index', {comments: comments, user: req.user});}) // passes the JSON object(s) as the variable 'comments'
            .catch( err => { console.log(err.message); })
        } else {
            res.redirect('/login');
        }
    })
    // UPDATE. do we want users to be able to EDIT their past comments?
    // DELETE. do we want users to be able to DELETE their past comments?
};
