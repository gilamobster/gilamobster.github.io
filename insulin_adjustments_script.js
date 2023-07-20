document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("estimate-btn").addEventListener("click", estimateTotalDose);
  });
  
  function estimateTotalDose() {
    var insulin1 = parseFloat(document.getElementById("insulin-1").value);
    var insulin2 = parseFloat(document.getElementById("insulin-2").value);
    var insulin3 = parseFloat(document.getElementById("insulin-3").value);
    var insulin4 = parseFloat(document.getElementById("insulin-4").value);
    var insulin5 = parseFloat(document.getElementById("insulin-5").value);
  
    if (isNaN(insulin1) && isNaN(insulin2) && isNaN(insulin3) && isNaN(insulin4) && isNaN(insulin5)) {
      return; // All fields are empty, do nothing
    }
  
    var totalDose = insulin1 + insulin2 + insulin3 + insulin4 + insulin5;
    var basalDose = (totalDose * 0.5).toFixed(2);
    var prandialDose = (totalDose * 0.16).toFixed(2);
  
    displayDoseEstimation(totalDose, basalDose, prandialDose);
  }
  
  function displayDoseEstimation(totalDose, basalDose, prandialDose) {
    var totalEstimationElement = document.getElementById("total-estimation");
    var basalDoseElement = document.getElementById("basal-dose");
    var prandialDoseElement = document.getElementById("prandial-dose");
  
    totalEstimationElement.textContent = "New Total Daily Dose: " + totalDose.toFixed(2);
    basalDoseElement.textContent = "Basal Dose: " + basalDose;
    prandialDoseElement.textContent = "Prandial Dose: " + prandialDose;
  }
  
  // Set initial display to "block" for the output elements
  document.getElementById("total-estimation").style.display = "block";
  document.getElementById("basal-dose").style.display = "block";
  document.getElementById("prandial-dose").style.display = "block";
  