document.addEventListener("DOMContentLoaded", function() {
    // First Tool: Insulin Calculator
    document.getElementById("calculate-btn").addEventListener("click", calculateInsulin);
  
    // Second Tool: Insulin Estimation
    document.getElementById("estimate-btn").addEventListener("click", estimateInsulin);
  });
  
  // First Tool: Insulin Calculator
  function calculateInsulin() {
    var weightInKg = parseFloat(document.getElementById("weight-kg").value);
    var weightInLbs = parseFloat(document.getElementById("weight-lbs").value);
    
    if (isNaN(weightInKg) && isNaN(weightInLbs)) {
      return; // Both fields are empty, do nothing
    }
    
    if (!isNaN(weightInLbs)) {
      weightInKg = convertToKg(weightInLbs);
      document.getElementById("weight-kg").value = weightInKg;
    } else if (!isNaN(weightInKg)) {
      weightInLbs = convertToLbs(weightInKg);
      document.getElementById("weight-lbs").value = weightInLbs;
    }
    
    var riskFactor = parseFloat(document.getElementById("risk-factor").value);
    var estimatedDose = weightInKg * riskFactor;
  
    // Round the estimated dose to two decimal places
    estimatedDose = Math.round(estimatedDose * 100) / 100;
  
    displayResult(estimatedDose);
  }
  
  // Second Tool: Insulin Estimation
  function estimateInsulin() {
    var scheduledInsulin = parseFloat(document.getElementById("scheduled-insulin").value);
    var correctionalDoses = [];
    for (var i = 1; i <= 4; i++) {
      var dose = parseFloat(document.getElementById("correctional-dose-" + i).value);
      if (!isNaN(dose)) {
        correctionalDoses.push(dose);
      }
    }
  
    if (isNaN(scheduledInsulin) && correctionalDoses.length === 0) {
      return; // All fields are empty, do nothing
    }
  
    var totalInsulinYesterday = scheduledInsulin + correctionalDoses.reduce((acc, dose) => acc + dose, 0);
  
    displayInsulinEstimation(totalInsulinYesterday);
  }
  
  function displayResult(estimatedDose) {
    // First Tool: Insulin Calculator
    var totalDoseElement = document.getElementById("total-dose");
    var basalBolusElement = document.getElementById("basal-bolus");
    var adjustmentElement = document.getElementById("adjustment");
  
    var basalDose = (estimatedDose * 0.5).toFixed(2);
    var prandialDose = (estimatedDose * 0.5/3).toFixed(2);
  
    totalDoseElement.textContent = "Estimated Total Daily Dose of Insulin: " + estimatedDose + " units";
    basalBolusElement.innerHTML = "Basal: " + basalDose + " units | Prandial: " + prandialDose + " units";
  
    var intensityScale = getIntensityScale(estimatedDose);
    adjustmentElement.textContent = "Correctional as needed QID using appropriate intensity scale";
  
    totalDoseElement.style.fontSize = "16px";
    basalBolusElement.style.fontSize = "14px";
    adjustmentElement.style.fontSize = "14px";
  }
  
  function displayInsulinEstimation(totalInsulinYesterday) {
    // Second Tool: Insulin Estimation
    var totalEstimationElement = document.getElementById("total-estimation");
    var basalEstimationElement = document.getElementById("basal-estimation");
    var prandialEstimationElement = document.getElementById("prandial-estimation");
  
    var estimatedDose = totalInsulinYesterday.toFixed(2);
    var basalDose = (estimatedDose * 0.5).toFixed(2);
    var prandialDose = (estimatedDose * 0.16).toFixed(2);
  
    totalEstimationElement.textContent = "Estimated Total Daily Dose of Insulin: " + estimatedDose + " units";
    basalEstimationElement.innerHTML = "Basal: " + basalDose + " units";
    prandialEstimationElement.innerHTML = "Prandial: " + prandialDose + " units";
  
    totalEstimationElement.style.fontSize = "16px";
    basalEstimationElement.style.fontSize = "14px";
    prandialEstimationElement.style.fontSize = "14px";
  }
  
  function convertToLbs(weightInKg) {
    // 1 kg = 2.20462 lbs
    var weightInLbs = weightInKg * 2.20462;
    return weightInLbs.toFixed(2);
  }
  
  function convertToKg(weightInLbs) {
    // 1 lb = 0.453592 kg
    var weightInKg = weightInLbs * 0.453592;
    return weightInKg.toFixed(2);
  }
  
  function getIntensityScale(estimatedDose) {
    if (estimatedDose < 30) {
      return 0.05;
    } else if (estimatedDose < 60) {
      return 0.10;
    } else if (estimatedDose < 80) {
      return 0.15;
    } else {
      return 0.20;
    }
  }
  