const searchInput = document.getElementById("searchInput")
const searchBody = document.getElementById("search-body")
const mainBody = document.getElementById("main-body")
const searchIcon = document.getElementById("searchIcon")
const closeIcon = document.getElementById("closeIcon")
const accountsContainer = document.getElementById("accounts")

searchBody.style.display = "none"

const handleCloseButton = () => {
    mainBody.classList.remove("displayNone")
    searchBody.classList.add("displayNone")
    searchBody.style.display = "none"
    searchIcon.classList.remove("displayNone")
    closeIcon.classList.add("displayNone")
    searchInput.value = '';
}

const searchHandler = () => {
    let accounts = []
    mainBody.classList.add("displayNone")
    searchBody.style.display = "block"
    searchIcon.classList.add("displayNone")
    closeIcon.classList.remove("displayNone")
    fetch("https://tva.staging.b2brain.com/search/autocomplete_org_all/")
        .then(data => data.json())
        .then(data => {
            accounts = data
        })
}

const searchItem = () => {
    const searchText = searchInput.value
    searchInput.value = '';
    const url = `https://tva.staging.b2brain.com/search/autocomplete_org_all/?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displaySearchResult(data)
            console.log(data)
        })
}


const displaySearchResult = accounts => {

    accounts.forEach(account => {
        // if (account.logo = "") {
        //     let logo = <div class="dynamic-company-logo">${account.company.slice(0, 1)}</div>
        // }
        // if (!account.logo == "") {
        //     let logo = account.logo
        // }
        // console.log(account)
        let accountData = document.createElement('div');
        accountData.innerHTML = `
            <div class="account">
                <div class="dynamic-company-logo">${account.company.slice(0, 1)}</div>
                <div class="account-detail">
                    <div>
                        <p class="company-name">${account.company}</p>
                        <p class="company-website">${account.website}</p>
                    </div>
                    <div>
                        <button onclick=console.log('${account.company}${account.slug}${Date.now()}') class="primary-button">Track</button>
                    </div>
                </div>
            </div>
            `;
        accountsContainer.appendChild(accountData);
    })
}

const handleTracking = (account) => {
    console.log(account.company)
}