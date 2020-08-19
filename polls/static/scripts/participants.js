
// Переключение между вкладками
function tabsHandler(index) {
    //let tabs = document.querySelector('#tabs')
    let tab1 = document.querySelector('#tab-1')
    let tab2 = document.querySelector('#tab-2')
    let tab3 = document.querySelector('#tab-3')
    let fragment1 = document.querySelector('#fragment-1')
    let fragment2 = document.querySelector('#fragment-2')
    let fragment3 = document.querySelector('#fragment-3')
    let button1 = document.querySelector('#enrolButton')
    let button2 = document.querySelector('#dismissButton')
    let groupButtons = [
        document.getElementById('createGroupButton'),
        document.getElementById('setCourseButton'),
        document.getElementById('deleteGroupButton')
    ]
    let selectionExists = false
    if (index === 0) {
        tab1.classList.add('active')
        tab2.classList.remove('active')
        tab3.classList.remove('active')
        fragment1.classList.remove('hidden')
        fragment2.classList.add('hidden')
        fragment3.classList.add('hidden')
        button2.classList.add('hidden')
        groupButtons.forEach(btn => btn.classList.add('hidden'))

        let cards = document.querySelectorAll('#fragment-1 .cards-wrapper .student-card')
        cards.forEach(card => {
            if (card.classList.contains('selected')) selectionExists = true
        })
        if (selectionExists) button1.classList.remove('hidden')

    }
    if (index === 1) {
        tab1.classList.remove('active')
        tab2.classList.add('active')
        tab3.classList.remove('active')
        fragment1.classList.add('hidden')
        fragment2.classList.remove('hidden')
        fragment3.classList.add('hidden')
        button1.classList.add('hidden')
        groupButtons.forEach(btn => btn.classList.add('hidden'))

        let cards = document.querySelectorAll('#fragment-2 .cards-wrapper .student-card')
        cards.forEach(card => {
            if (card.classList.contains('selected')) selectionExists = true
        })
        if (selectionExists) button2.classList.remove('hidden')

    }
    if (index === 2) {
        tab1.classList.remove('active')
        tab2.classList.remove('active')
        tab3.classList.add('active')
        fragment1.classList.add('hidden')
        fragment2.classList.add('hidden')
        fragment3.classList.remove('hidden')

        button1.classList.add('hidden')
        button2.classList.add('hidden')
        groupButtons.forEach(btn => btn.classList.remove('hidden'))
        setCourseColors()
    }
    let searchTF = document.getElementById('participants-search')
    searchTF.value = ''
    requestSearchHandler(searchTF)
}

// Выбранные элементы (вкладка №1)
let selectedRequests = []

// Выбрать элемент (вкладка №1)
function selectRequest(id) {
    let cards = document.querySelectorAll('#fragment-1 .cards-wrapper .student-card')
    let element = document.getElementById(`request-${id}`)
    let selectionExists = false

    let img = element.firstElementChild.firstElementChild.firstElementChild
    if (element.classList.contains('selected')) {
        element.classList.remove('selected')
        img.classList.remove('selected-img')
        selectedRequests = selectedRequests.filter(value => value != id)
    } else {
        element.classList.add('selected')
        img.classList.add('selected-img')
        selectedRequests.push(id)
    }
    let enrolButton = document.getElementById('enrolButton')
    cards.forEach(card => {
        if (card.classList.contains('selected')) selectionExists = true
    })
    if (selectionExists) {
        if (enrolButton.classList.contains('hidden')) enrolButton.classList.remove('hidden')
    } else {
        if (!enrolButton.classList.contains('hidden')) enrolButton.classList.add('hidden')
    }
}

// Сортировка элементов (вкладка №1)
function sortRequestsBy(field) {
    let cards = document.querySelectorAll('#fragment-1 .cards-wrapper .student-card')
    let cardsArray = Array.from(cards)
    if (field === 'city') {
        cardsArray.sort((a, b) => {
            let city1 = a.children[1].innerHTML
            let city2 = b.children[1].innerHTML
            if (city1 > city2) return 1
            if (city1 < city2) return -1
            return 0
        })
    }
    if (field === 'course') {
        cardsArray.sort((a, b) => {
            let course1 = a.children[2].innerHTML
            let course2 = b.children[2].innerHTML
            if (course1 > course2) return 1
            if (course1 < course2) return -1
            return 0
        })
    }
    if (field === 'date') {
        cardsArray.sort((a, b) => {
            let date1 = a.children[3].innerHTML
            let date2 = b.children[3].innerHTML
            let dateParts = date1.split('.')
            for (let i = 0; i < dateParts.length; i++)
                dateParts[i] = dateParts[i].length < 2 ? `0${dateParts[i]}` : dateParts[i]
            let stringDate = `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
            let parsedDate1 = Date.parse(stringDate)
            dateParts = date2.split('.')

            for (let i = 0; i < dateParts.length; i++)
                dateParts[i] = dateParts[i].length < 2 ? `0${dateParts[i]}` : dateParts[i]
            stringDate = `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
            let parsedDate2 = Date.parse(stringDate)
            if (parsedDate1 > parsedDate2) return -1
            if (parsedDate1 < parsedDate2) return 1
            return 0
        })
    }
    let wrapper = document.querySelector('#fragment-1 .cards-wrapper')
    cards.forEach(card => wrapper.removeChild(card))
    cardsArray.forEach(card => wrapper.appendChild(card))
}


// Выбранные элементы (вкладка №2)
let selectedAcceptedRequests = []

// Выбрать элемент (вкладка №2)
function selectAcceptedRequest(id) {
    let cards = document.querySelectorAll('#fragment-2 .cards-wrapper .student-card')
    let element = document.getElementById(`accept-${id}`)
    let selectionExists = false

    let img = element.firstElementChild.firstElementChild.firstElementChild
    if (element.classList.contains('selected')) {
        element.classList.remove('selected')
        img.classList.remove('selected-img')
        selectedAcceptedRequests = selectedAcceptedRequests.filter(value => value != id)
    } else {
        element.classList.add('selected')
        img.classList.add('selected-img')
        selectedAcceptedRequests.push(id)
    }

    let dismissButton = document.getElementById('dismissButton')
    cards.forEach(card => {
        if (card.classList.contains('selected')) selectionExists = true
    })
    if (selectionExists) {
        if (dismissButton.classList.contains('hidden')) dismissButton.classList.remove('hidden')
    } else {
        if (!dismissButton.classList.contains('hidden')) dismissButton.classList.add('hidden')
    }
}

// Сортировка элементов (вкладка №2)
function sortAcceptedRequestsBy(field) {
    let cards = document.querySelectorAll('#fragment-2 .cards-wrapper .student-card')
    let cardsArray = Array.from(cards)
    if (field === 'city') {
        cardsArray.sort((a, b) => {
            let city1 = a.children[1].innerHTML
            let city2 = b.children[1].innerHTML
            if (city1 > city2) return 1
            if (city1 < city2) return -1
            return 0
        })
    }
    if (field === 'course') {
        cardsArray.sort((a, b) => {
            let course1 = a.children[2].innerHTML
            let course2 = b.children[2].innerHTML
            if (course1 > course2) return 1
            if (course1 < course2) return -1
            return 0
        })
    }
    if (field === 'date') {
        cardsArray.sort((a, b) => {
            let date1 = a.children[4].innerHTML
            let date2 = b.children[4].innerHTML
            if (date1 > date2) return 1
            if (date1 < date2) return -1
            return 0
        })
    }
    if (field === 'group') {
        cardsArray.sort((a, b) => {
            let course1 = a.children[3].innerHTML
            let course2 = b.children[3].innerHTML
            if (course1 > course2) return 1
            if (course1 < course2) return -1
            return 0
        })
    }
    let wrapper = document.querySelector('#fragment-2 .cards-wrapper')
    cards.forEach(card => wrapper.removeChild(card))
    cardsArray.forEach(card => wrapper.appendChild(card))
}

// Выбранные элементы (вкладка №3)
let selectedGroups = []

// Выбрать элемент (вкладка №3)
function selectGroup(id) {
    let cards = document.querySelectorAll('#fragment-3 .cards-wrapper .student-card')
    let element = document.getElementById(`group-${id}`)
    let selectionExists = false

    let img = element.firstElementChild.firstElementChild.firstElementChild
    if (element.classList.contains('selected')) {
        element.classList.remove('selected')
        img.classList.remove('selected-img')
        selectedGroups = selectedGroups.filter(value => value != id)
    } else {
        element.classList.add('selected')
        img.classList.add('selected-img')
        selectedGroups.push(id)
    }

    let setCourseButton = document.getElementById('setCourseButton')
    let deleteGroupButton = document.getElementById('deleteGroupButton')
    cards.forEach(card => {
        if (card.classList.contains('selected')) selectionExists = true
    })
    if (selectionExists) {
        if (setCourseButton.classList.contains('group-button')) setCourseButton.classList.remove('group-button')
        if (deleteGroupButton.classList.contains('group-button')) deleteGroupButton.classList.remove('group-button')
    } else {
        if (!setCourseButton.classList.contains('group-button')) setCourseButton.classList.add('group-button')
        if (!deleteGroupButton.classList.contains('group-button')) deleteGroupButton.classList.add('group-button')
    }
}

// Сортировка элементов (вкладка №3)
function sortGroupsBy(field) {
    let cards = document.querySelectorAll('#fragment-3 .cards-wrapper .student-card')
    let cardsArray = Array.from(cards)
    if (field === 'city') {
        cardsArray.sort((a, b) => {
            let city1 = a.children[1].innerHTML
            let city2 = b.children[1].innerHTML
            if (city1 > city2) return 1
            if (city1 < city2) return -1
            return 0
        })
    }
    if (field === 'course') {
        cardsArray.sort((a, b) => {
            let course1 = a.children[2].innerHTML
            let course2 = b.children[2].innerHTML
            if (course1 > course2) return 1
            if (course1 < course2) return -1
            return 0
        })
    }
    if (field === 'date') {
        cardsArray.sort((a, b) => {
            let date1 = a.children[4].innerHTML
            let date2 = b.children[4].innerHTML
            if (date1 > date2) return 1
            if (date1 < date2) return -1
            return 0
        })
    }
    if (field === 'group') {
        cardsArray.sort((a, b) => {
            let course1 = a.children[3].innerHTML
            let course2 = b.children[3].innerHTML
            if (course1 > course2) return 1
            if (course1 < course2) return -1
            return 0
        })
    }
    let wrapper = document.querySelector('#fragment-2 .cards-wrapper')
    cards.forEach(card => wrapper.removeChild(card))
    cardsArray.forEach(card => wrapper.appendChild(card))
}


// Построить диаграмму "ПРИНЯТО ВХОДЯЩИХ ЗАЯВОК ЗА МЕСЯЦ"
function drawRequestsChart() {
    let ctx = document.querySelector('#participants-requests-chart').getContext('2d')
    const shift = -Math.PI / 2
    ctx.lineWidth = 10; // толщина линии
    let startAngle = 0

    if (chartData.requests === undefined) return
    let percentage = chartData.requests.accepted / chartData.requests.total * 100
    if (percentage == null) {
        ctx.beginPath()
        ctx.strokeStyle = '#f798a4'
        ctx.arc(50,50,45, shift, 0.0628 * 101 + shift,false);
        ctx.stroke();
        return
    }

    ctx.beginPath()
    ctx.strokeStyle = '#ffffff'
    ctx.arc(50,50,45, startAngle + shift, 0.0628 * percentage + startAngle + shift,false);
    ctx.stroke();
    startAngle = 0.0628 * percentage + startAngle
    percentage = 100 - percentage
    ctx.beginPath()
    ctx.strokeStyle = '#f798a4'
    ctx.arc(50,50,45, startAngle + shift, 0.0628 * percentage + startAngle + shift,false);
    ctx.stroke();
}

// Построить диаграмму "НАПРАВЛЕНИЯ ОБУЧЕНИЯ"
function drawDirectionsChart() {
    let ctx = document.getElementById('participants-directions-chart').getContext('2d')
    let shift = -Math.PI / 2
    ctx.lineWidth = 17; // толщина линии
    let startAngle = 0

    let colors = ['#FF455D', '#BB7CF5', '#05CDE1', '#FFD101']
    const dataArray = chartData.directions
    if (dataArray === undefined) return
    dataArray.forEach((item, index) => {
        let i = index
        while (i > 3) i -= 3
        item.color = colors[i]
    })
    if (dataArray.length === 0) {
        ctx.beginPath()
        ctx.strokeStyle = '#C4C4C4'
        ctx.arc(130,130,120, shift, 0.0628 * 101 + shift,false);
        ctx.stroke();
        return
    }

    const numberOfStudents = dataArray.map(value => value.value).reduce((prev, next) => prev + next, 0)
    const percentageValues = dataArray.map(value => value.value / (numberOfStudents / 100))

    for (let i = 0; i < percentageValues.length; i++) {
        ctx.beginPath()
        ctx.strokeStyle = dataArray[i].color
        ctx.arc(130,130,120, startAngle + shift, 0.06283 * percentageValues[i] + startAngle + shift,false);
        ctx.stroke();
        startAngle = 0.0628 * percentageValues[i] + startAngle

        let newItem = document.createElement('div')
        newItem.className = 'chart-item'
        let innerText = `${dataArray[i].name} ${percentageValues[i].toFixed(0)} %`
        newItem.innerHTML = `<div class="rect" style="background: ${dataArray[i].color}"></div><div class="name">${innerText}</div>`

        document.querySelector('.directions-card').appendChild(newItem)
    }
}


// Окно "ЗАЧИСЛИТЬ"
function enrolModalWindow(action, name) {
    let modalWindow = document.querySelector('.enrolModalWindow')
    let wrapper = modalWindow.firstElementChild
    if (action === 'show') {
        modalWindow.classList.remove('hidden')
        modalWindow.style.opacity = '1'
        setTimeout(() => {
            wrapper.style.opacity = '1'
            wrapper.style.transform = 'translateX(-50%) translateY(-50%)'
        },0)
    }
    if (action === 'cancel') {
        modalWindow.style.opacity = '0'
        setTimeout(() => {
            wrapper.style.opacity = '0'
            wrapper.style.transform = 'translateX(-50%) translateY(-55%)'
        },0)
        setTimeout(() => {
            modalWindow.classList.add('hidden')
        }, 300)
    }
    if (action.includes('toggle')) {
        let btn, list, input
        switch (action) {
            case 'toggle-courses':
                btn = document.querySelector('.input-button.course')
                list = document.querySelector('.popup-list.course-choose')
                input = document.querySelector('#course-choose-input')
                break
            case 'toggle-groups':
                btn = document.querySelector('.input-button.group')
                list = document.querySelector('.popup-list.group-choose')
                input = document.querySelector('#group-choose-input')
                break
            case 'toggle-teachers':
                btn = document.querySelector('.input-button.teacher')
                list = document.querySelector('.popup-list.teacher-choose')
                input = document.querySelector('#teacher-choose-input')
                break
            default:
                break
        }

        if (list.classList.contains('hidden')) {
            list.classList.remove('hidden')
            btn.classList.add('rotated')
            input.classList.add('opened')
        } else {
            list.classList.add('hidden')
            btn.classList.remove('rotated')
            input.classList.remove('opened')
        }
    }
    if (action.includes('pick')) {
        let input, completion
        switch (action) {
            case 'pick-course':
                input = document.querySelector('#course-choose-input')
                completion = 'toggle-courses'
                break
            case 'pick-group':
                input = document.querySelector('#group-choose-input')
                completion = 'toggle-groups'
                break
            case 'pick-teacher':
                input = document.querySelector('#teacher-choose-input')
                completion = 'toggle-teachers'
                break
            default: break
        }
        input.value = name
        enrolModalWindow(completion)
    }
    if (action === 'perform') {
        let course = document.querySelector('#course-choose-input').value
        let group = document.querySelector('#group-choose-input').value
        let teacher = document.querySelector('#teacher-choose-input').value

        if (validateEnrolValues(course, group, teacher)) {
            console.log(`Student IDs to enrol: ${selectedRequests}`)
            modalWindow.classList.add('hidden')
        } else {
            console.log('Enrol values are invalid')
        }
    }
}

// Валидация полей ввода при зачислении
function validateEnrolValues(course, group, teacher) {
    return !(course === '' || group === '' || teacher === '')
}

// Окно "ОТЧИСЛИТЬ"
function dismissModalWindow(action) {
    let modalWindow = document.querySelector('.dismissModalWindow')
    let wrapper = modalWindow.firstElementChild
    let title = document.querySelector('#delete-question')
    let titleEnding = selectedAcceptedRequests.length > 1 ? 'ов' : 'а'
    title.innerHTML = `Удалить (${selectedAcceptedRequests.length}) студент${titleEnding}?`
    if (action === 'show') {
        modalWindow.classList.remove('hidden')
        modalWindow.style.opacity = '1'
        setTimeout(() => {
            wrapper.style.opacity = '1'
            wrapper.style.transform = 'translateX(-50%) translateY(-50%)'
        },0)
        document.addEventListener("keyup", enterKey = (event) => {
            if (event.keyCode === 13) dismissModalWindow('perform')
        })
    }
    if (action === 'cancel') {
        setTimeout(() => {
            wrapper.style.opacity = '0'
            wrapper.style.transform = 'translateX(-50%) translateY(-55%)'
        },0)
        setTimeout(() => {
            modalWindow.classList.add('hidden')
        }, 300)
        document.removeEventListener("keyup", enterKey)
    }
    if (action === 'perform') {
        console.log(`Students to dismiss: ${selectedAcceptedRequests}`)
        document.removeEventListener("keyup", enterKey)
        dismissModalWindow('cancel')
    }
}

// Фильтр "ВЫБЕРИТЕ ДАТЫ"
function filterByDate() {
    let date1 = document.getElementById('filter-begin-date')
    let date2 = document.getElementById('filter-end-date')
    let date1Parsed = Date.parse(date1.value)
    let date2Parsed = Date.parse(date2.value)
    if (date2Parsed <= date1Parsed) {
        alert('End date is prior to begin date')
        return
    } else {
        let cardsPage1 = document.querySelector('#fragment-1 .cards-wrapper').children
        let cardsPage2 = document.querySelector('#fragment-2 .cards-wrapper').children
/*
        cardsArrayPage1 = cardsArrayPage1.filter((value) => {
            let dateParts = value.children[3].innerHTML.split('.')
            let stringDate = `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
            let date = new Date(stringDate)
            return (date1Parsed <= date && date <= date2Parsed)
        })
        cardsArrayPage2 = cardsArrayPage2.filter((value) => {
            let dateParts = value.children[3].innerHTML.split('.')
            let stringDate = `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
            let date = new Date(stringDate)
            return (date1Parsed <= date && date <= date2Parsed)
        })

 */

        for (let i = 0; i < cardsPage1.length; i++) {
            cardsPage1[i].style.display = 'grid'
            let dateParts = cardsPage1[i].children[3].innerHTML.split('.')
            let stringDate = `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
            let date = new Date(stringDate)
            if (date < date2Parsed && date > date1Parsed) {
                cardsPage1[i].style.display = 'grid'
            } else {
                cardsPage1[i].style.display = 'none'
            }
        }
        for (let i = 0; i < cardsPage2.length; i++) {
            cardsPage2[i].style.display = 'grid'
            let dateParts = cardsPage2[i].children[4].innerHTML.split('.')
            let stringDate = `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
            let date = new Date(stringDate)
            if (date < date2Parsed && date > date1Parsed) {
                cardsPage2[i].style.display = 'grid'
            } else {
                cardsPage2[i].style.display = 'none'
            }
        }
    }
    let button = date1.parentElement.lastElementChild
    button.setAttribute('onclick', 'revertFilterByDate()')
    button.innerHTML = 'Отменить'
}

// Отмена фильтра "ВЫБЕРИТЕ ДАТЫ"
function revertFilterByDate() {
    let cardsPage1 = document.querySelector('#fragment-1 .cards-wrapper').children
    let cardsPage2 = document.querySelector('#fragment-2 .cards-wrapper').children
    let date1 = document.getElementById('filter-begin-date')

    for (let i = 0; i < cardsPage1.length; i++)
        cardsPage1[i].style.display = 'grid'
    for (let i = 0; i < cardsPage2.length; i++)
        cardsPage2[i].style.display = 'grid'
    let button = date1.parentElement.lastElementChild
    button.setAttribute('onclick', 'filterByDate()')
    button.innerHTML = 'Фильтр'
}

// Поиск по имени (все вкладки)
function requestSearchHandler(sender) {
    let cards = document.querySelector('#fragment-1 .cards-wrapper').children
    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].getElementsByClassName('student-name')[0].innerHTML.toLowerCase()
        cards[i].style.display = 'grid'
        if (!(`${name}`.includes(sender.value.toLowerCase())))
            cards[i].style.display = 'none'
    }

    let cardsSecondPage = document.querySelector('#fragment-2 .cards-wrapper').children
    for (let i = 0; i < cardsSecondPage.length; i++) {
        let name = cardsSecondPage[i].getElementsByClassName('student-name')[0].innerHTML.toLowerCase()
        cardsSecondPage[i].style.display = 'grid'
        if (!(`${name}`.includes(sender.value.toLowerCase())))
            cardsSecondPage[i].style.display = 'none'
    }

    let cardsThirdPage = document.querySelector('#fragment-3 .cards-wrapper').children

    for (let i = 0; i < cardsThirdPage.length; i++) {
        let groupName = cardsThirdPage[i].getElementsByClassName('student-name')[0].innerHTML.toLowerCase()
        cardsThirdPage[i].style.display = 'grid'
        if (!`${groupName}`.includes(sender.value.toLowerCase()))
            cardsThirdPage[i].style.display = 'none'
    }
}

// Удаление курса для отдельной группы (разноцветные надписи с кнопками удаления)
function removeCourseForGroup(courseName, groupId, sender) {
    document.getElementById(groupId).classList.toggle('selected', true)

    let item = sender.closest('.course-colored')
    item.classList.toggle('faded', true)
    setTimeout(() => {
        item.remove()
    }, 200)

    console.log(`Название курса: ${courseName}, id группы: ${groupId}`)
}

// Удалить группу(ы)
function deleteGroup(action) {
    let modalWindow = document.querySelector('.deleteGroupModalWindow')
    let wrapper = modalWindow.firstElementChild
    let title = document.querySelector('#delete-group')
    title.innerHTML = selectedGroups.length > 1 ? `Удалить (${selectedGroups.length}) группы?` : 'Удалить группу?'
    if (action === 'show') {
        if (selectedGroups.length === 0) return
        modalWindow.classList.remove('hidden')
        modalWindow.style.opacity = '1'
        setTimeout(() => {
            wrapper.style.opacity = '1'
            wrapper.style.transform = 'translateX(-50%) translateY(-50%)'
        },10)
        document.addEventListener("keyup", enterKey = (event) => {
            if (event.keyCode === 13)
                deleteGroup('perform')
        })
    }
    if (action === 'cancel') {
        setTimeout(() => {
            wrapper.style.opacity = '0'
            wrapper.style.transform = 'translateX(-50%) translateY(-55%)'
        },10)
        setTimeout(() => {
            modalWindow.classList.add('hidden')
        }, 300)
        document.removeEventListener("keyup", enterKey)
    }
    if (action === 'perform') {

        console.log(`Groups to delete: ${selectedGroups}`)
        document.removeEventListener("keyup", enterKey)
        deleteGroup('cancel')
    }
}



// Выбранные курсы для назначения (кнопка "Назначить курс")
let courseIds = []

// Назначить курс (модальное окно)
function setCourse(action, sender) {
    let modalWindow = document.querySelector('.setCourseModalWindow')
    let wrapper = modalWindow.firstElementChild
    let title = document.querySelector('#delete-group')
    title.innerHTML = selectedGroups.length > 1 ? `Удалить (${selectedGroups.length}) группы?` : 'Удалить группу?'
    if (action === 'show') {
        document.addEventListener('mousedown', sideClicksHandler)
        if (selectedGroups.length === 0) return
        modalWindow.classList.remove('hidden')
        modalWindow.style.opacity = '1'
        setTimeout(() => {
            wrapper.style.opacity = '1'
            wrapper.style.transform = 'translateX(-50%) translateY(-50%)'
        },0)
        document.addEventListener("keyup", enterKey = (event) => {
            if (event.keyCode === 13) {
                setCourse('perform')
            }
        })
    }
    if (action === 'cancel') {
        document.removeEventListener('mousedown', sideClicksHandler)
        setTimeout(() => {
            wrapper.style.opacity = '0'
            wrapper.style.transform = 'translateX(-50%) translateY(-55%)'
        },0)
        setTimeout(() => {
            modalWindow.classList.add('hidden')
        }, 300)
        document.removeEventListener("keyup", enterKey)
    }
    if (action === 'select') {
        let parent = sender.closest('.courses-item')
        let courseId = parent.id.substring(14)
        if (sender.checked)
            courseIds.push(courseId)
        else
            courseIds.splice(courseIds.findIndex(id => id === courseId), 1)

        parent.classList.toggle('selected')
    }
    if (action === 'perform') {
        console.log(`Group to assign: ${courseIds}`)
        document.removeEventListener("keyup", enterKey)
        setCourse('cancel')
    }
}

// Создать группу (модальное окно)
function createGroup(action, name) {
    let modalWindow = document.querySelector('.createGroupModalWindow')
    let wrapper = modalWindow.firstElementChild
    let course = document.querySelector('#group-name-input')
    let group = document.querySelector('#group-city-input')
    if (action === 'show') {
        course.value = ''
        group.value = ''
        modalWindow.classList.remove('hidden')
        modalWindow.style.opacity = '1'
        setTimeout(() => {
            wrapper.style.opacity = '1'
            wrapper.style.transform = 'translateX(-50%) translateY(-50%)'
            course.focus()
        },0)
        document.addEventListener("keyup", enterKey = (event) => {
            if (event.keyCode === 13) {
                event.preventDefault()
                createGroup('perform')
            }
        })
    }
    if (action === 'cancel') {
        setTimeout(() => {
            wrapper.style.opacity = '0'
            wrapper.style.transform = 'translateX(-50%) translateY(-55%)'
        },0)
        setTimeout(() => {
            modalWindow.classList.add('hidden')
        }, 300)
        group.removeEventListener("keyup", enterKey)
    }
    if (action === 'perform') {
        console.log(course.value, group.value)
        document.removeEventListener("keyup", enterKey)
        createGroup('cancel')
    }
}

// Окно пользователя
function studentDetailPopup(sender, action, id) {
    let modal = document.querySelector('.profileView')

    if (action === 'show') {
        sender.closest('.student-card').click()
        let studentData = incomeRequests.find(item => item.id == id)
        if (studentData === undefined) {
            alert('Пользователь не найден')
            return
        }

        let profileImage = modal.getElementsByClassName('profile-image')[0]
        profileImage.src = studentData.image

        let studentName = modal.getElementsByClassName('student-name')[0]
        studentName.innerHTML = studentData.name

        let studentRank = modal.getElementsByClassName('rank')[0]
        studentRank.innerHTML = studentData.rank ?? ''

        let studentGroup = modal.getElementsByClassName('group')[0]
        studentGroup.innerHTML = studentData.group === undefined ? '' : `Группа ${studentData.group}`

        let studentAverageScore = modal.getElementsByClassName('average-score')[0]
        studentAverageScore.lastElementChild.innerHTML = studentData.averageScore ?? ''

        let progressBars = modal.getElementsByClassName('progress-bars')[0]

        if (studentData.progresses !== undefined)
            studentData.progresses.forEach(studentProgress => {

            let rowProgress = document.createElement('div')
            rowProgress.className = 'row-progress'

            let progressName = document.createElement('div')
            progressName.innerHTML = studentProgress.name ?? ''

            let columnProgress = document.createElement('div')
            columnProgress.className = 'column-progress'

            let progressAsText = document.createElement('div')
            if (studentProgress.now !== undefined && studentProgress.total !== undefined)
                progressAsText.innerHTML = `${studentProgress.now} из ${studentProgress.total}`

            let progressBarBackground = document.createElement('div')
            progressBarBackground.className = 'progress-bar-background'

            let progressBar = document.createElement('div')
            progressBar.className = 'progress-bar'
            let progressBarStyle = `background: #FF455D; width: ${studentProgress.now / studentProgress.total * 100}%`
            progressBar.setAttribute('style', progressBarStyle)

            progressBarBackground.appendChild(progressBar)
            columnProgress.append(progressAsText, progressBarBackground)

            rowProgress.append(progressName, columnProgress)

            progressBars.append(rowProgress)
        })

        modal.classList.remove('hidden')
    }

    if (action === 'close') {
        modal.querySelector('.student-name').innerHTML = '_________________'
        modal.querySelector('.profile-image').src = '/static/assets/student_icon.svg'
        modal.querySelector('.rank').innerHTML = '_______'
        modal.querySelector('.group').innerHTML = '_______'
        modal.querySelector('.average-score .name').innerHTML = '_'
        let bars = modal.querySelector('.progress-bars')
        while (bars.hasChildNodes()) bars.removeChild(bars.lastChild)
        modal.classList.add('hidden')
    }
}

// Установка цветов для названий курсов
function setCourseColors() {
    let titles = document.querySelectorAll('.course-title')
    let color = '#4F4F4F'
    titles.forEach(title => {
        switch (title.innerHTML) {
            case 'Программирование': color = '#BB7CF5'; break
            case 'Дизайн': color = '#FF455D'; break
            case 'Философия': color = '#FE9844'; break
            case 'История': color = '#05CDE1'; break
            case 'Психология': color = '#27AE60'; break
            default: break
        }
        title.style.color = color
    })
}


// Закрыть окно назначения курсов
let sideClicksHandler = (event) => {
    let elements = document.elementsFromPoint(event.clientX, event.clientY)
    let result = elements.find(element => {
        return element.classList.contains('YourCourses');
    })
    if (result === undefined) setCourse('cancel')
}


if (document.querySelector('.Participants-main') != null) {
    tabsHandler(0)
    setCourseColors()
    drawRequestsChart()
    drawDirectionsChart()
}