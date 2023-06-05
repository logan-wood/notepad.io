async function displayPoints() {
    try {
        const userID = await getUserID();
        const points= await updatePoints(userID)
    } catch (error) {
        console.log('Error:', error);
    }
}

const getUserID = async () => {
    try {
        const response = await fetch('http://localhost:1234/api/userID');
        const data = await response.json();
        const userID = data.userID; // Get the userID from the response
        return userID;
    } catch (error) {
        console.log('Error fetching userID:', error);
        throw error;
    }
};

function updatePoints(userID) {
    const url = 'http://localhost:8080/user/' + userID + '/points';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pointsDiv = document.getElementById('points');
            // console.log('Points: ' + data.points);
            pointsDiv.innerHTML = 'Points: ' + data.points;
            return data.points;
        })
        .catch(error => {
            console.log('Error fetching points:', error);
        });
}

// function removePoints(userID) {
//     // console.log('removePoints()');
//     const data = {
//         message: "subtract"
//     };
//
//     const url = 'http://localhost:8080/user/' + userID + '/points';
//     console.log(url)
//     fetch(url, {
//         method: "post",
//         body: JSON.stringify(data),
//         headers: {"Content-Type": "application/json",}
//     })
//     .then((response) => {
//         // console.log("response", response);
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//     })
//     .catch((error) => {
//         // console.error("There was an error sending the request:", error);
//     });
// }