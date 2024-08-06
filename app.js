const url = "https://api.github.com/users/"; //API Endpoint
const form = document.querySelector("form");

//👇Function to Get User's GitHub Profile Data
const getUserProfile = async (event) => {
    event.preventDefault(); //To Prevent the Default Behaviour of the Form Element on Submit

    const username = document.querySelector("#username").value.trim(); //"Username" entered by the user on the Input field
    const invalidUserNameErr = document.querySelector(".invalid-username");
    const gitProfileCard = document.querySelector(".profile-card");
    try {
        let resp = await axios.get(url + username);
        invalidUserNameErr.classList.add("hidden"); //Hides the Invalid UserName Err from the WebPage
        gitProfileCard.classList.remove("hidden"); //Displays the Profile-Card, when the username is valid
        updateProfileCard(resp.data);
    }
    catch (err) {
        gitProfileCard.classList.add("hidden"); //Hides the Profile-Card, when the Username is Invalid
        invalidUserNameErr.classList.remove("hidden");
        invalidUserNameErr.innerHTML = `&#9888; ${err.response.data.message}. Kindly, Retry Again!`;
    }

    document.querySelector("#username").value = ""; //Makes the Input Field Empty
}

//👇Function to Update the GitHub Profile Card
const updateProfileCard = (userProfileData) => {
    const profileImg = document.querySelector(".profile-img");
    const displayName = document.querySelector(".display-name");
    const userName = document.querySelector(".user-name");
    const checkProfileBtn = document.querySelector("#checkProfileBtn");
    const userBio = document.querySelector("#userBio");
    const followersCount = document.querySelector("#followersCount");
    const followingCount = document.querySelector("#followingCount");
    const reposCount = document.querySelector("#reposCount");

    profileImg.src = userProfileData.avatar_url;
    displayName.textContent = userProfileData.name;
    userName.textContent = '@' + userProfileData.login;
    checkProfileBtn.href = userProfileData.html_url;
    userBio.textContent = userProfileData.bio === null ? "---" : userProfileData.bio;
    followersCount.textContent = userProfileData.followers;
    followingCount.textContent = userProfileData.following;
    reposCount.textContent = userProfileData.public_repos;
}

form.addEventListener("submit", getUserProfile);