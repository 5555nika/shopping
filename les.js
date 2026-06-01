let products = []

function getBtn () {
    let btn = document.createElement('button')
    btn.textContent = 'add'

    return btn
}
let btn = getBtn()

function getInp (placeholder, type) {
    let inp = document.createElement('input')
    inp.placeholder = placeholder
    inp.type = type

    return inp
}
let inpName = getInp('enter name...', 'text')
let inpCount = getInp('enter count...', 'number')
let inpPrice = getInp('enter price...', 'number')


function getTable() {
    let table = document.createElement('table')
    let thead = document.createElement('thead')
    let tbody = document.createElement('tbody')
    let tr = document.createElement('tr')
    let thName = document.createElement('th')
    thName.textContent = 'Name'
    let thCount = document.createElement('th')
    thCount.textContent = 'Count'
    let thPrice = document.createElement('th')
    thPrice.textContent = 'Price'
    let thDelete = document.createElement('th')
    thDelete.textContent = 'Actions'
    
    tr.append(thName, thCount, thPrice, thDelete)
    thead.append(tr)
    table.append(thead, tbody)
    document.body.append(table)
    
    return tbody

}

function getRow(product) {
    let row = document.createElement('tr')
    let tdName = document.createElement('td')
    tdName.textContent = product.name
    let tdCount = document.createElement('td')
    tdCount.textContent = product.count
    let tdPrice = document.createElement('td')
    tdPrice.textContent = product.price
    let tdDelete = document.createElement('td')
    let btnActions = document.createElement('button')
    btnActions.textContent = 'change'
    btnActions.onclick = () => {
        let nameVale = prompt('enter name', product.name)
        let countVale = prompt('enter count', product.count)
        let priceVale = prompt('enter price', product.price)
        product.name = nameVale
        product.count = countVale
        product.price = priceVale
        render(products)
    }

    tdDelete.append(btnActions)
    row.append(tdName, tdCount, tdPrice, tdDelete)
    return row
}

function render(products) {
    table.innerHTML = ''

    products.forEach(product => {
        let newRow = getRow(product)
        table.append(newRow)
    })

    if (products.length > 0) {
        let totalCount = products.reduce((sum, p) => sum + p.count, 0)
        let totalPrice = products.reduce((sum, p) => sum + (p.price * p.count), 0) // Общая стоимость = цена * количество

        let trTotal = document.createElement('tr')
        trTotal.style.fontWeight = 'bold'

        let tdTotalLabel = document.createElement('td')
        tdTotalLabel.textContent = 'Total:'

        let tdTotalCount = document.createElement('td')
        tdTotalCount.textContent = totalCount

        let tdTotalPrice = document.createElement('td')
        tdTotalPrice.textContent = totalPrice

        let tdEmpty = document.createElement('td')

        trTotal.append(tdTotalLabel, tdTotalCount, tdTotalPrice, tdEmpty)
        table.append(trTotal)
    }
}

btn.onclick = () => {
    let nameVal = inpName.value.trim()
    let countVal = inpCount.value.trim()
    let priceVal = inpPrice.value.trim()

    if (!nameVal || !countVal || !priceVal) return

    products.push({ name: nameVal,
                    count: +countVal,
                    price: +priceVal
                })
                    render(products)

    inpName.value = ''
    inpCount.value = ''
    inpPrice.value = ''

}

document.body.append(inpName, inpCount, inpPrice, btn)
let table = getTable()
