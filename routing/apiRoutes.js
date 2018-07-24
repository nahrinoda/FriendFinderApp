var friendData = require('../app/data/friends.js');

module.exports = function (app) {

    // `apiRoutes.js` file should contain two routes:
    // GET route with the url`/api/friends`. This will be used to display a JSON of all possible friends.
    app.get('./api/data/friends', function (req, res) {
        // Display friends data in json format
        res.json(friendData);
    });

    app.post('./api/data/friends', function (req, res) {
        var userInput = req.body;
        var newFriendPoints = userInput.scores;
        var sameName = '';
        var samePicture = '';
        var friendGap = 5000;

        // Loop through friends list
        for (var i = 0; i < friendData.length; i++) {
            // Check gap in points to compare friends in list
            var gap = 0;
            for (var j = 0; j < newFriendPoints.length; j++) {
                gap += (Math.abs(parseInt(friendData[i].scores[j]) - parseInt(userInput.scores[j])));
            }

            // If difference in score is low, then a match is found
            if (gap < friendGap) {
                console.log('Found your friend = ' + gap);
                console.log('Friend name = ' + friendData[i].name);
                console.log('Friend image = ' + friendData[i].photo);

                // Create new friend
                friendGap = gap;
                sameName = friendData[i].name;
                samePicture = friendData[i].photo;
            }
        }

        // Add new user
        friendData.push(userInput);
        // Sending object sameName and samePicture to backend
        // Sending response back to survey.html
        res.json({ sameName: sameName, samePicture: samePicture });
    });

};