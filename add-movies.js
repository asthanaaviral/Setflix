const username = localStorage.getItem("username");
const defaultGenre = localStorage.getItem("defaultGenre");
const userBatch = document.querySelector("#user-batch");

document.addEventListener('DOMContentLoaded', ()=>{
    userBatch.innerHTML = `<i class="fa-solid fa-circle-user fa-xl"></i>${username}`;

    // Generating form HTML
    document.querySelector("#movie-form").innerHTML = `
            <div class="form-row">
                <label for="movie-name">Enter Movie Name</label>
                <input type="text" id="movie-name" class="input-field" required>
            </div>
            <div class="form-row">
                <label for="category">Select Movie Genre</label>
                <select id="category" class="category input-field" required>
                    <option value="" disabled selected>Select Category</option>
                    <option value="Action">Action</option>
                    <option value="Animated">Animated</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Adult">Adult</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Crime">Crime</option>
                    <option value="Drama">Drama</option>
                    <option value="Romance">Romance</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Science Fiction">Sci-fi</option>
                </select>
            </div>
            <div class="form-row">
                <label for="watch-date">Enter Movie Watch Date</label>
                <input type="date" id="watch-date" class="input-field" required min="1950-01-01" max="2025-12-31">
            </div>
            <div class="form-row">
                <label for="movie-duration">Enter the Duration of Movie (in mins)</label>
                <input type="number" id="movie-duration" class="input-field" required>
            </div>
            <div class="form-row">
                <label for="user-rating">Give your Movie Rating (0-5)</label>
                <input type="number" id="user-rating" class="input-field" min="0" max="5" step="0.5" required>
            </div>  
            <button type="submit" class="form-button">Submit</button> `;

            if(defaultGenre) {
                const movieCategory = document.querySelector("#category");
                movieCategory.value = defaultGenre;
            }


            //Handle form submission
            const movieForm = document.querySelector("#movie-form");
            movieForm.addEventListener('submit', (e)=>{
                e.preventDefault();
                
                const movieName = document.querySelector("#movie-name").value;
                const movieGenre = document.querySelector("#category").value;
                const watchDate = document.querySelector("#watch-date").value;
                const duration = document.querySelector("#movie-duration").value;
                const rating = document.querySelector("#user-rating").value;

                let movieData = {
                    movieName: movieName,
                    movieGenre: movieGenre, 
                    watchDate: watchDate, 
                    movieDuration: duration, 
                    userRating: rating
                }

                let recordList = JSON.parse(localStorage.getItem("recordList")) || [];
                recordList.push(movieData);
                localStorage.setItem("recordList", JSON.stringify(recordList));

                resetForm();
            })
})

function resetForm() {
    document.querySelector("#movie-name").value = "";
    if(defaultGenre) {
        document.querySelector("#category").value = defaultGenre;
    } else {
        document.querySelector("#category").value = "";
    }
    document.querySelector("#watch-date").value = "";
    document.querySelector("#movie-duration").value = "";
    document.querySelector("#user-rating").value = "";
}