const campaignId = location.hash.substr(1)
let outputData;
getSavedCampaigns()
const campaign = outputData.find(function (campaign) {
    return campaign.id === campaignId
})

// Create table heading
const campaignTitle = document.createElement('h1')
campaignTitle.setAttribute('id', 'campaign-title')
campaignTitle.innerText = campaign.campaignName
document.querySelector('.page-heading').appendChild(campaignTitle)

// Basic Metrics
const basicBody = document.getElementById('basicMetricsData')
let basicHtml = `
    <tr>
    <td>${campaign.clicks}</td>
    <td>${campaign.impressions}</td>
    <td>${(campaign.clickThroughRate * 100).toFixed(2)}%</td>
    <td>$${campaign.cost}</td>
    <td>$${campaign.averageCPC.toFixed(2)}</td>
    <td>${campaign.conversions}</td>
    <td>$${campaign.costPerConversion.toFixed(2)}</td>
    <td>${(campaign.conversionRate * 100).toFixed(2)}%</td>
    <td>${campaign.isLostRank.toFixed(2)}%</td>
    <td>${campaign.isLostBudget.toFixed(2)}%</td>
    <td>${(campaign.impressionShare * 100).toFixed(2)}%</td>
    </tr>`

basicBody.innerHTML = basicHtml

// Projected Metrics
const projectedBody = document.getElementById('projectedMetricsData')
let projectedHtml = `
    <tr>
    <td class="projection">${campaign.totalImpressionsEligible}</td>
    <td>${campaign.potentialImpBudget}</td>
    <td>${campaign.potentialImpRank}</td>
    <td>${campaign.projectedimpressions}</td>
    <td>${Math.floor(campaign.projectedClicks)}</td>
    <td>$${campaign.projectedCost.toFixed(2)}</td>
    <td>${campaign.projectedConversions.toFixed(2)}</td>
    </tr>`

projectedBody.innerHTML = projectedHtml

// Projected Metrics
const additionalMetricsData = document.getElementById('additionalMetricsData')
let additionalHtml = `
    <tr>
    <td>${campaign.additionalImpr}</td>
    <td>${Math.floor(campaign.additionalClicks)}</td>
    <td>$${campaign.additionalCost.toFixed(2)}</td>
    <td>${campaign.additionalConversions.toFixed(2)}</td>
    <td>$${campaign.additionalCPA.toFixed(2)}</td>
    </tr>`

additionalMetricsData.innerHTML = additionalHtml

