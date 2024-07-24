const dailyButton = document.getElementById("button-daily");
const weeklyButton = document.getElementById("button-weekly");
const monthlyButton = document.getElementById("button-monthly");
const cardsSection = document.getElementById("cards-section");

// Define the text to display for each time period
const timePeriods = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

dailyButton.addEventListener("click", updateActivity);
weeklyButton.addEventListener("click", updateActivity);
monthlyButton.addEventListener("click", updateActivity);

// Updates the activity cards based on the selected time period
function updateActivity(event) {
  const timeframe = event.target.dataset.timeframe;
  const previousText = timePeriods[timeframe];

  // Select all activity cards
  const activityCards = document.querySelectorAll(".card__activity");

  // Iterate over each card to update the displayed information
  activityCards.forEach((card) => {
    const current = card.querySelector(".card__activity-current");
    const previous = card.querySelector(".card__activity-previous");

    current.innerText = `${current.dataset[timeframe]}hrs`;
    previous.innerText = `${previousText} - ${previous.dataset[timeframe]}hrs`;
  });

  // Remove 'active' class from all buttons and add it to the clicked button
  document
    .querySelectorAll("button")
    .forEach((button) => button.classList.remove("active"));
  event.target.classList.add("active");
}

// Generates and inserts an activity card into the cards section
function generateCard(activity) {
  const cardHTML = `
    <article class="card card__activity" data-activity="${activity.title}">
        <div class="card__activity-top">
        </div>
        <div class="card__activity-bottom">
            <h3 class="card__activity-title">${activity.title}</h3>
            <button class="card__activity-ellipsis ellipsis"></button>
            <p class="card__activity-current" data-daily="${activity.timeframes.daily.current}" data-weekly="${activity.timeframes.weekly.current}" data-monthly="${activity.timeframes.monthly.current}">${activity.timeframes.weekly.current}hrs</p>
            <p class="card__activity-previous" data-daily="${activity.timeframes.daily.previous}" data-weekly="${activity.timeframes.weekly.previous}" data-monthly="${activity.timeframes.monthly.previous}">Last Week - ${activity.timeframes.weekly.previous}hrs</p>
        </div>
    </article>`;

  cardsSection.insertAdjacentHTML("beforeend", cardHTML);
}

// Fetches activity data from a JSON file
async function fetchData() {
  const url = "data.json";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.error("Oops! Something went wrong.");
      }
      return response.json();
    })
    .then((data) => {
      // Generate a card for each activity in the fetched data
      data.forEach(generateCard);
    });
}

fetchData();
