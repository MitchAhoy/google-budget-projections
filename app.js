// User metrics
const userInput = {}
// Arr to hold campaign data
let outputData = []

// Local storage
// Check for exisiting local storage
getSavedCampaigns()


// Update metrics with input
document.querySelectorAll('.input-card').forEach(function (card) {
  card.addEventListener('input', function (e) {
    switch (e.path[0].id) {
      case 'campaign-name':
        userInput.campaignName = e.target.value
        break
      case 'clicks':
        userInput.clicks = parseInt(e.target.value)
        break
      case 'impressions':
        userInput.impressions = parseInt(e.target.value)
        break
      case 'cost':
        userInput.cost = parseFloat(e.target.value)
        break
      case 'conversions':
        userInput.conversions = parseFloat(e.target.value)
        break
      case 'is-lost-rank':
        userInput.isLostRank = parseFloat(e.target.value)
        break
      case 'is-lost-budget':
        userInput.isLostBudget = parseFloat(e.target.value)
        break
    }
  })
})

// Calculate totals
const calculate = () => {
  const metrics = {
    clickThroughRate: userInput.clicks / userInput.impressions,
    averageCPC: userInput.cost / userInput.clicks,
    costPerConversion: userInput.cost / userInput.conversions,
    conversionRate: userInput.conversions / userInput.clicks,
    impressionShare: (100 - userInput.isLostRank - userInput.isLostBudget) / 100,
  }

  // Impression share 
  const totalImpressionsEligible = Math.round(userInput.impressions / metrics.impressionShare)
  const potentialImpBudget = Math.round((userInput.isLostBudget / 100) * totalImpressionsEligible)
  const potentialImpRank = Math.round((userInput.isLostRank / 100) * totalImpressionsEligible)

  // Projections
  const projectedImpr = userInput.impressions + potentialImpBudget
  const projectedClicks = projectedImpr * metrics.clickThroughRate
  const projectedCost = projectedClicks * metrics.averageCPC
  const projectedConv = projectedClicks * metrics.conversionRate

  // Additional
  const additionalImpr = projectedImpr - userInput.impressions
  const additionalClicks = projectedClicks - userInput.clicks
  const additionalConv = projectedConv - userInput.conversions
  const additionalCost = projectedCost - userInput.cost
  const additionalCPA = additionalCost / additionalConv

  const id = uuidv4()

  function NewCampaign() {
    this.campaignName = userInput.campaignName
    this.clicks = userInput.clicks
    this.impressions = userInput.impressions
    this.clickThroughRate = metrics.clickThroughRate
    this.cost = userInput.cost
    this.averageCPC = metrics.averageCPC
    this.conversions = userInput.conversions
    this.costPerConversion = metrics.costPerConversion
    this.conversionRate = metrics.conversionRate
    this.isLostRank = userInput.isLostRank
    this.isLostBudget = userInput.isLostBudget
    this.impressionShare = metrics.impressionShare
    this.totalImpressionsEligible = totalImpressionsEligible
    this.potentialImpBudget = potentialImpBudget
    this.potentialImpRank = potentialImpRank
    this.projectedimpressions = projectedImpr
    this.projectedClicks = projectedClicks
    this.projectedConversions = projectedConv
    this.projectedCost = projectedCost
    this.additionalImpr = additionalImpr
    this.additionalClicks = additionalClicks
    this.additionalConversions = additionalConv
    this.additionalCost = additionalCost
    this.additionalCPA = additionalCPA
    this.id = id
  }

  // Push To Object 
  outputData.push(new NewCampaign)

  // Push to local storage
  saveCampaigns()
}

// Delete row button
const removeCampaign = function (id) {
  const index = outputData.findIndex(function (campaign) {
    return id === campaign.id
  })

  if (index > -1) {
    outputData.splice(index, 1)
  }



  localStorage.removeItem(`${id}`)

  loadTableData(outputData)
  saveCampaigns()
}

// Load table data on page load
loadTableData(outputData)

// Clear user input
const clearUserInput = () => {
  document.querySelector('form').reset()
}

// Form submission
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault()
  calculate()
  document.querySelector('form').reset()
  document.getElementById('tableData').innerHTML = ''
  tableVisability()
  loadTableData(outputData)
})