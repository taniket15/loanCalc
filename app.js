// UI Variables
const amount = document.querySelector("#amount");
const interest = document.querySelector("#interest");
const years = document.querySelector("#years");
const monthlyPayment = document.querySelector("#monthly-payment");
const totalPayment = document.querySelector("#total-payment");
const totalInterest = document.querySelector("#total-interest");
const form = document.querySelector("#loan-form");
const results = document.querySelector("#results");
const loader = document.querySelector("#loading");

// Form event listener
form.addEventListener("submit", function(e){
    // Hide results
    results.style.display = "none";
    // Show loader
    loader.style.display = "block";

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Results
function calculateResults(){
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly  = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        
        // Show results
        results.style.display = "block";
        // Hide loader
        loader.style.display = "none";
    }else{
        showError("Invalid Numbers!");
    }
}

// Show Error Message
function showError(error){
    // Hide results
    results.style.display = "none";
    // Hide loader
    loader.style.display = "none";

    const card = document.querySelector(".card");
    const errorDiv = document.createElement("div");

    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, form);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector(".alert").remove();
}