async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

let allSenators = []
let simpleSenators = []
let republicans = []
let democrats = []
let independents = []

const theData = getAPIData('senators.json').then(data => {
    allSenators = data.results[0].members
    simpleSenators = makeSimpleMap(allSenators)
    republicans = filterSenators(simpleSenators, "R")
    democrats = filterSenators(simpleSenators, "D")
    independants = filterSenators(simpleSenators, "ID")
    console.log(sortSenatorsByAge(simpleSenators))
    populateDOM(simpleSenators)
})

function makeSimpleMap(allOfThem) {
    let results = allOfThem.map(senator => {
        return {
            id: senator.id,
            name: `${senator.first_name} ${senator.last_name}`,
            party: senator.party,
            date_of_birth: `${calculate_age(new Date(senator.date_of_birth))}`,
            gender: senator.gender,
            state_rank: senator.state_rank,
            total_votes: senator.total_votes
        }
    })
    return results
}

function filterSenators(simpleList, partyAffiliation) {
    return simpleList.filter(senator => senator.party === partyAffiliation)
}

const testArray = [5,10,15,20,25,30,35,40,45,50,30]

const testReduce = testArray.reduce((acc, num) => {
    return acc + num
}, 0)

function totalVotes(senatorList) {
    const results = senatorList.reduce((acc, senator) => {
        return acc + senator.total_votes
    }, 0)
    return results
}

function oldestSenator(senatorList) {
   return senatorLIst.reduce((oldest, senator) => {
        return (oldest.date_of_birth || 0) > senator.date_of_birth ? oldest : senator
    }, {})
}

function sortSenatorsByAge(senatorList) {
    return senatorList.sort((a, b) => {
        return a.date_of_birth - b.date_of_birth
    })
}

const container = document.querySelector('.container')

function populateDOM(senator_array) {
    senator_array.forEach(senator => {
        let card = document.createElement('div')
        card.setAttribute('class', 'card')
        let cardImage = document.createElement('div')
        cardImage.setAttribute('class', 'card-image')
        let figure = document.createElement('figure')
        figure.setAttribute('class', 'image')
        let figureImage = document.createElement('img')
        figureImage.src = `https://www.congress.gov/img/member/${senator.id.toLowerCase()}_200.jpg`
        figureImage.alt = 'Placeholder image'

        figure.appendChild(figureImage)
        cardImage.appendChild(figure)
        card.appendChild(cardImage)
        card.appendChild(cardContent(senator))
        container.appendChild(card)
    })
}

function cardContent(senator) {
    let cardContent = document.createElement('div')
    cardContent.setAttribute('class', 'card-content')
    let media = document.createElement('div')
    media.setAttribute('class', 'media')
    let mediaLeft = document.createElement('div')
    mediaLeft.setAttribute('class', 'media-left')
    let figure = document.createElement('figure')
    figure.setAttribute('class', 'image is-48x48')
    let img = document.createElement('img')
    if(senator.party === "R") {
        img.src = `Elephant.jpg`
    }
    if(senator.party === "D") {
        img.src = `Donkey.jpeg`
    }
    if(senator.party === "ID") {
        img.src = `https://bulma.io/images/placeholders/96x96.png`
    }
    img.alt = 'Placeholder image'
    let mediaContent = document.createElement('div')
    mediaContent.setAttribute('class', 'media-content')
    let titleP = document.createElement('p')
    titleP.setAttribute('class', 'title is-4')
    titleP.textContent = `${senator.name}`
    let subtitleP = document.createElement('p')
    subtitleP.setAttribute('class', 'subtitle is-6')
    subtitleP.textContent = `${senator.state_rank}`

    let contentDiv = document.createElement('div')
    contentDiv.setAttribute('class', 'content')
    contentDiv.textContent = `Lorem ipsum dolor sit amet, consecuter adipiscing`
    let contentBreak = document.createElement('br')
    let ageP = document.createElement('p')
    ageP.textContent = `${senator.date_of_birth}`

    mediaContent.appendChild(titleP)
    mediaContent.appendChild(subtitleP)
    figure.appendChild(img)
    mediaLeft.appendChild(figure)
    media.appendChild(mediaLeft)
    media.appendChild(mediaContent)

    contentDiv.appendChild(contentBreak)
    contentDiv.appendChild(ageP)
    cardContent.appendChild(media)
    cardContent.appendChild(contentDiv)
    return cardContent
}

function calculate_age(dob) {
    let diff_ms = Date.now() - dob.getTime();
    let age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

// let mainArea = document.querySelector('main')
// let mainButton = document.createElement('button')
// mainButton.textContent = 'Button'
// mainArea.appendChild(mainButton)
// mainButton.addEventListener('click', function() {
//     console.log(allSenators)
// })