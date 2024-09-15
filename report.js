const username = localStorage.getItem("username");
const userBatch = document.querySelector("#user-batch");


/*function displayWatchTime(recordList, selectedGenre){
    let totalTime = 0;
    for(let i=0; i<recordList.length; i++){
        if(recordList[i].movieGenre === selectedGenre){
            totalTime += Number(recordList[i].movieDuration);
        }
    }
    document.querySelector("#total-watch-time").textContent = totalTime;
}*/
function displayWatchTime(recordList, selectedGenre) {
    const totalTime = recordList
        .filter(record => record.movieGenre === selectedGenre)
        .map(record => Number(record.movieDuration))
        .reduce((total, duration) => total + duration, 0);

    document.querySelector("#total-watch-time").textContent = totalTime;
}


/*function displayAverageRating(recordList, selectedGenre) {
    let totalRating = 0;
    count = 0;
    for(let i=0; i<recordList.length; i++) {
        if(recordList[i].movieGenre === selectedGenre) {
            totalRating += Number(recordList[i].userRating);
            count++;
        }
    }
    document.querySelector("#average-rating").textContent = count!=0? totalRating/count : 0;
}*/
function displayAverageRating(recordList, selectedGenre) {
    const filteredRecords = recordList
    .filter(record=>record.movieGenre === selectedGenre)
    
    const totalRating = filteredRecords
    .map(record=>Number(record.userRating))
    .reduce((total, rating)=> total+rating, 0);

    const averageRating = filteredRecords.length!==0? totalRating/filteredRecords.length: 0;

    document.querySelector("#average-rating").textContent = averageRating;
}



function displayMovieList(recordList, selectedGenre) {
    const tableBody = document.querySelector("#table-body");

    const filteredList = recordList
    .filter(record=>record.movieGenre === selectedGenre);

    document.querySelector(".movie-list-container p").textContent = `List of ${selectedGenre} Movies Watched`

    document.querySelector("#table-head").innerHTML = `
        <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Watch Date</th>
            <th>Duration</th>
            <th>Rating</th>
        </tr>
    `
    tableBody.innerHTML = "";
    filteredList.forEach((movie, idx)=> {
        const tableData = document.createElement("tr");
        tableData.innerHTML = `
            <td>${idx+1}</td>
            <td>${movie.movieName}</td>
            <td>${movie.watchDate}</td>
            <td>${movie.movieDuration}</td>
            <td>${movie.userRating}</td>
        `
        tableBody.appendChild(tableData);
    })
}



document.addEventListener('DOMContentLoaded', ()=>{
    userBatch.innerHTML = `<i class="fa-solid fa-circle-user fa-xl"></i>${username}`;

    let recordList = JSON.parse(localStorage.getItem("recordList")) || [];

    const categoryInput = document.querySelector("#select-category");
    let selectedGenre = "";
    categoryInput.addEventListener('change', ()=>{
        selectedGenre = categoryInput.value;
        displayWatchTime(recordList, selectedGenre);
        displayAverageRating(recordList, selectedGenre);
        displayMovieList(recordList, selectedGenre);
    })
})