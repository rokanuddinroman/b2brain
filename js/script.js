const searchInput = document.getElementById("searchInput")
const searchBody = document.getElementById("search-body")
const mainBody = document.getElementById("main-body")
const searchIcon = document.getElementById("searchIcon")
const closeIcon = document.getElementById("closeIcon")
const accountsContainer = document.getElementById("accounts")
const trackButton = document.getElementById("trackButton")
const dropdownOne = document.getElementById("dropdown-menu-1")
const dropdownTwo = document.getElementById("dropdown-menu-2")

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
    // accountsContainer.innerHTML = []
    const url = `https://tva.staging.b2brain.com/search/autocomplete_org_all/?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displaySearchResult(data)
            // console.log(data)
        })
}


const displaySearchResult = accounts => {
    accounts.forEach(account => {
        let accountData = document.createElement('div');
        accountData.innerHTML = `
            <div class="account">
                <div class="dynamic-company-logo">${account.logo = " " ? account.company.slice(0, 1) : account.logo}</div>
                <div class="account-detail">
                    <div>
                        <p class="company-name">${account.company}</p>
                        <p class="company-website">${account.website}</p>
                    </div>
                    <div>
                        <button onclick=console.log('${JSON.stringify(account.company).split(" ").join("")},${String(account.slug)},tracked-at,${Date.now()}') class="primary-button">Track</button>
                    </div>
                </div>
            </div>
            `;
        accountsContainer.appendChild(accountData);
    })
}

const handleTracking = (account) => {
    console.log(JSON.stringify(account.company))
}


const dropdownFirst = () => {
    dropdownOne.classList.toggle("displayNone")
}
const dropdownSecond = () => {
    dropdownTwo.classList.toggle("displayNone")
}