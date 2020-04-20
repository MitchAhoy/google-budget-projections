// Look at local storage for past campaigns
const getSavedCampaigns = () => {
  let campaignsJSON = localStorage.getItem('campaigns')
  if (campaignsJSON !== null) {
    outputData = JSON.parse(campaignsJSON)
  }
}

// Update local storage
const saveCampaigns = function () {
  localStorage.setItem('campaigns', JSON.stringify(outputData))
}

// Table visability
const tableVisability = () => {
  if (outputData.length === 0) {
    document.querySelector('#table').style.display = 'none'
  } else {
    document.querySelector('#table').style.display = 'table'
  }
}

// Load table data - app page
function loadTableData(outputData) {
  const tableBody = document.getElementById('tableData')
  let dataHtml = ''

  outputData.forEach(function (i) {
    dataHtml += `
      <tr>
        <td>${i.campaignName}</td>
        <td>${Math.floor(i.additionalClicks)}</td>
        <td>${(i.additionalConversions).toFixed(2)}</td>
        <td>$${(i.additionalCost).toFixed(2)}</td>
        <td><a class="view-more" href="/campaign-metrics.html#${i.id}">View More</a></td>
        <td><img class="delete-btn" id="${i.id}" onclick="removeCampaign('${i.id}')" src="/img/delete.svg" alt=""></td>
      </tr>`
  })
  tableBody.innerHTML = dataHtml
  tableVisability()
}


