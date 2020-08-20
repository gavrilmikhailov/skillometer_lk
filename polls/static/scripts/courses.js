// Наблюдаемый курс
let observedCourseIndex = 0

// Для перетасовки карт на < (1600х900)
function screenMediaHandler() {
    // arrange cards on screen resize

    let geographyCard = document.querySelector('.GeographyCard')
    let groupsCard = document.querySelector('.GroupsCourseCard')
    let periodCourseCard = document.querySelector('.PeriodCourseCard')
    let smallScreenQuery = window.matchMedia('(max-width: 1900px)')

    if (geographyCard != null) {
        if (smallScreenQuery.matches) {
            document.querySelector('.CardsBlock .column-right').appendChild(geographyCard)
            document.querySelector('.CardsBlock .column-right').insertBefore(groupsCard, periodCourseCard)
        } else {
            document.querySelector('.CardsBlock .column-left').appendChild(geographyCard)
            document.querySelector('.CardsBlock .column-left').insertBefore(groupsCard, geographyCard)
        }
    }

    // sticks left panel to the bottom of html
    // resizePanel()
}

// Если панель будет не фиксированной
function resizePanel() {
    document.querySelector('.panel').style.minHeight = '89vh'
    document.querySelector('.panel').style.height = `${document.querySelector('.content-window').scrollHeight}px`
}

// Выбор курса на правой панели
function selectCourse(courseId) {
    let course = courses.find((item, index) => {
        observedCourseIndex = index
        return item.id == courseId
    })

    let infoCardItems = document.querySelector('.InfoCourseCard').lastElementChild.children
    for (let i = 0; i < infoCardItems.length; i++) {
        let text = ""
        switch (i) {
            case 0: text = course.info.mainTag; break
            case 1: text = course.info.secondaryTag; break
            case 2: text = course.info.ageGroup; break
            case 3: text = course.info.category; break
            case 4: text = course.info.educationFormat; break
            case 5: text = course.info.trialLesson; break
            case 6: text = course.info.description; break
            case 7: text = course.info.address; break
            default: break
        }
        infoCardItems[i].innerHTML = text
    }

    let scheduleCard = document.querySelector('.ScheduleCourseCard').lastElementChild
    while(scheduleCard.firstElementChild.classList.contains('date-time'))
        scheduleCard.removeChild(scheduleCard.firstElementChild)
    let lastChild = scheduleCard.lastElementChild
    for (let i = 0; i < course.schedule.length; i++) {
        let newLesson = document.createElement('div')
        newLesson.className = 'date-time'
        newLesson.innerHTML = `<b>${course.schedule[i].date}</b> ${course.schedule[i].address}`
        scheduleCard.insertBefore(newLesson, lastChild)
    }

    let periodCard = document.querySelector('.PeriodCourseCard .content .date')
    periodCard.innerHTML = `с ${course.educationPeriod.start} по ${course.educationPeriod.end}`

    let requestsCard = document.querySelector('.RequestsCourseCard .content .date')
    requestsCard.innerHTML = course.requests

    let paymentsCard = document.querySelector('.PaymentCourseCard .content .date')
    paymentsCard.innerHTML = (course.charts.payments.paid / course.charts.payments.total * 100).toFixed(0) + '%'

    let groupsCard = document.querySelector('.GroupsCourseCard')
    let signs = groupsCard.getElementsByClassName('sign')
    let titles = groupsCard.getElementsByClassName('date')
    let descriptions = groupsCard.getElementsByClassName('label')
    signs[0].innerHTML = course.groupsCapacity
    signs[1].innerHTML = course.places.occupied
    titles[0].innerHTML = course.numberOfGroups
    titles[1].innerHTML = course.places.available
    descriptions[0].innerHTML = `Группы (по ${course.groupsCapacity} чел)`

    drawCharts()
    updateYourCourses()

    function drawCharts() {
        drawGeographyChart(course.charts.geography)
        drawPaymentsChart(course.charts.payments)
        drawNumberOfGroupsChart(course.charts.groups)
        drawVacantsChart(course.charts.vacants)
        drawPopularityChart(course.charts.popularity)
    }

    let courseNames = document.querySelector('.YourCourses').children
    for (let i = 0; i < courseNames.length; i++)
        courseNames[i].classList.remove('selected')
    courseNames[observedCourseIndex + 1].classList.add('selected')
    let changeRef = document.getElementById('course-edit-ref')
    changeRef.setAttribute('href', `/quests_edit/${course.id}`)
}

// Обновление списка курсов на правой панели
function updateYourCourses() {
    let yourCoursesBlock = document.querySelector('.YourCourses')
    while (yourCoursesBlock.lastElementChild.classList.contains('courses-item'))
        yourCoursesBlock.removeChild(yourCoursesBlock.lastElementChild)

    courses.forEach(course => {
        let courseItem = document.createElement('div')
        courseItem.classList.add('courses-item')

        let courseName = document.createElement('button')
        courseName.className = `course-name ${course.visible ? "" : "course-hidden"}`
        courseName.innerHTML = course.name
        courseName.setAttribute('onclick', `selectCourse('${course.id}')`)

        let controls = document.createElement('div')
        controls.className = 'controls'

        let starsBlock = document.createElement('div')
        starsBlock.className = 'stars-block'

        let courseCheckbox = document.createElement('input')
        courseCheckbox.type = 'checkbox'
        courseCheckbox.className = 'course-checkbox'
        courseCheckbox.checked = course.visible
        courseCheckbox.id = `checkbox-for-${course.id}`
        courseCheckbox.name = `checkbox-for-${course.id}`
        courseCheckbox.setAttribute('onclick', `changeCourseVisibility('${course.id}', this)`)

        for (let i = 0; i < 5; i++) {
            let star = document.createElement('div')
            let starImage = document.createElement('img')
            starImage.setAttribute('src', '/static/assets/star_icon_black.svg')
            star.append(starImage)
            if (i < course.rating)
                star.className = 'active-star'
            starsBlock.append(star)
        }

        courseItem.setAttribute('category', course.info.category)

        controls.append(starsBlock, courseCheckbox)
        courseItem.append(courseName, controls)
        yourCoursesBlock.appendChild(courseItem)
    })
}

// Окно удаления курса
function deleteModal(action, sender) {
    let modal = document.querySelector('.delete-modal')
    if (action === 'show') {
        modal.classList.remove('hidden')
    }
    if (action === 'close') {
        modal.classList.add('hidden')
    }
    if (action === 'submit') {
        let id = courses[observedCourseIndex].id
        courses = courses.filter(item => item.id != id)
        deleteModal('close')
        if (courses[0] !== undefined) {
            selectCourse(courses[0].id)
        } else {
            console.log('Empty courses')
            // Go to empty page
        }
    }
}

// Скролл категорий (карточки наверху)
function scrollCategories(dir) {
    let wrapper = document.querySelector('#slider')
    let smallScreenQuery = window.matchMedia('(max-width: 1900px)')
    let shiftValue
    if (smallScreenQuery.matches) {
        shiftValue = 365 + 30
    } else {
        shiftValue = 315 + 35
    }
    let partial = 1
    if (dir === 'right'){
        for (let i = 0; i < shiftValue; i++)
            setTimeout(() => {
                wrapper.scrollLeft += partial
            }, i / 4)
    console.log('scrolling-right', shiftValue)}
    if (dir === 'left') {
        for (let i = 0; i < shiftValue; i++)
            setTimeout(() => {
                wrapper.scrollLeft -= partial
            }, i / 4)
    console.log('scrolling-left', shiftValue)}
}

// Сортировка списка курсов на правой панели (стрелка вниз)
function sortYourCourses() {
    let yourCoursesBlock = document.querySelector('.YourCourses')
    let yourCoursesChildren = yourCoursesBlock.getElementsByClassName('courses-item')
    let htmlCollectionAsArray = Array.from(yourCoursesChildren)
    htmlCollectionAsArray.sort((a,b) => {
        let name1 = a.firstElementChild.innerHTML
        let name2 = b.firstElementChild.innerHTML
        if (name1 > name2) return 1
        if (name1 < name2) return -1
        return 0
    })
    while (yourCoursesBlock.lastElementChild.classList.contains('courses-item'))
        yourCoursesBlock.removeChild(yourCoursesBlock.lastElementChild)

    htmlCollectionAsArray.forEach(item => yourCoursesBlock.appendChild(item))
}

// Сортировка списка курсов по отдельным направлениям (клик по карточке)
function sortCoursesByDirection(category) {
    let yourCoursesBlock = document.querySelector('.YourCourses')
    let yourCoursesChildren = yourCoursesBlock.children

    for (let i = 1; i < yourCoursesChildren.length; i++) {
        let cat = yourCoursesChildren[i].getAttribute('category')
        if (yourCoursesChildren[i].getAttribute('category') !== category)
            yourCoursesChildren[i].style.display = 'none'
    }

    let label = document.getElementById('current-filter')
    label.innerHTML = category

    let sortBtn = document.getElementById('courses-sort-btn')
    let filterBtn = document.getElementById('courses-filter-btn')
    if (!sortBtn.classList.contains('hidden')) sortBtn.classList.add('hidden')
    if (filterBtn.classList.contains('hidden')) filterBtn.classList.remove('hidden')
}

// Отменить сортировку по направлениям
function cancelCoursesFilter() {
    let yourCoursesBlock = document.querySelector('.YourCourses')
    let yourCoursesChildren = yourCoursesBlock.children

    for (let i = 0; i < yourCoursesChildren.length; i++)
        yourCoursesChildren[i].style.display = 'flex'

    let label = document.getElementById('current-filter')
    label.innerHTML = 'Все'

    let sortBtn = document.getElementById('courses-sort-btn')
    let filterBtn = document.getElementById('courses-filter-btn')
    if (sortBtn.classList.contains('hidden')) sortBtn.classList.remove('hidden')
    if (!filterBtn.classList.contains('hidden')) filterBtn.classList.add('hidden')
}

// Выключить курс
function changeCourseVisibility(courseId, sender) {

    let label = sender.closest('.courses-item').firstElementChild
    label.className = `course-name ${sender.checked ? "" : "course-hidden"}`
}

// Перетасовка карт
window.onresize = screenMediaHandler
screenMediaHandler()

// Диаграмма ГЕОГРАФИЯ (Охват учащихся)
function drawGeographyChart(dataArray) {
    let ctx = document.querySelector('#geographyChart').getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    let shift = -Math.PI / 2
    ctx.lineWidth = 17; // толщина линии
    let startAngle = 0


    if (dataArray === null || dataArray === undefined) return
    let colors = ['#FF455D', '#BB7CF5', '#05CDE1', '#FFD101']
    dataArray.forEach((item, index) => {
        let i = index
        while (i > 3) i -= 3
        item.color = colors[i]
    })
    if (dataArray.length === 0) {
        ctx.beginPath()
        ctx.strokeStyle = '#C4C4C4'
        ctx.arc(100,100,90, shift, 0.0628 * 101 + shift,false);
        ctx.stroke();
        return
    }

    const numberOfStudents = dataArray.map(value => value.value).reduce((prev, next) => prev + next, 0)
    const percentageValues = dataArray.map(value => value.value / (numberOfStudents / 100))

    let dataWrapper = document.querySelector('.GeographyCard .chart-data')
    while (dataWrapper.lastElementChild.classList.contains('chart-item'))
        dataWrapper.removeChild(dataWrapper.lastElementChild)

    for (let i = 0; i < percentageValues.length; i++) {
        ctx.beginPath()
        ctx.strokeStyle = dataArray[i].color
        ctx.arc(100,100,90, startAngle + shift, 0.0628 * percentageValues[i] + startAngle + shift,false);
        ctx.stroke();
        startAngle = 0.0628 * percentageValues[i] + startAngle

        let newItem = document.createElement('div')
        newItem.className = 'chart-item'
        let innerText = `${dataArray[i].name} ${percentageValues[i].toFixed(0)} %`
        newItem.innerHTML = `<div class="rect" style="background: ${dataArray[i].color}"></div><div class="name">${innerText}</div>`

        dataWrapper.appendChild(newItem)
    }
}

// Диаграмма ОПЛАТИЛИ (25% Оплатили)
function drawPaymentsChart(payments) {
    let ctx = document.querySelector('#paymentsChart').getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const shift = -Math.PI / 2
    ctx.lineWidth = 6; // толщина линии
    let startAngle = 0

    let percentage = payments.paid / payments.total * 100
    if (percentage == null) {
        ctx.beginPath()
        ctx.strokeStyle = '#C4C4C4'
        ctx.arc(25,25,22, shift, 0.0628 * 101 + shift,false);
        ctx.stroke();
        return
    }

    ctx.beginPath()
    ctx.strokeStyle = '#FF455D'
    ctx.arc(25,25,22, startAngle + shift, 0.0628 * percentage + startAngle + shift,false);
    ctx.stroke();
    startAngle = 0.0628 * percentage + startAngle
    percentage = 100 - percentage
    ctx.beginPath()
    ctx.strokeStyle = '#C4C4C4'
    ctx.arc(25,25,22, startAngle + shift, 0.0628 * percentage + startAngle + shift,false);
    ctx.stroke();
}

// Диаграмма ГРУППЫ (4 группы (по 15 чел))
function drawNumberOfGroupsChart(value) {
    let ctx = document.querySelector('#numberOfGroupsChart').getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const shift = -Math.PI / 2
    ctx.lineWidth = 6; // толщина линии
    let startAngle = 0

    if (value == null) {
        ctx.beginPath()
        ctx.strokeStyle = '#C4C4C4'
        ctx.arc(25,25,22, shift, 0.0628 * 101 + shift,false);
        ctx.stroke();
        return
    }

    ctx.beginPath()
    ctx.strokeStyle = '#FF455D'
    ctx.arc(25,25,22, startAngle + shift, 0.0628 * value + startAngle + shift,false);
    ctx.stroke();
    startAngle = 0.0628 * value + startAngle
    value = 100 - value
    ctx.beginPath()
    ctx.strokeStyle = '#C4C4C4'
    ctx.arc(25,25,22, startAngle + shift, 0.0628 * value + startAngle + shift,false);
    ctx.stroke();
}

// Диаграмма СВОБОДНЫХ МЕСТ (13 Свободных мест)
function drawVacantsChart(vacants) {
    let ctx = document.querySelector('#vacantsChart').getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const shift = -Math.PI / 2
    ctx.lineWidth = 6; // толщина линии
    let startAngle = 0

    if (vacants == null) {
        ctx.beginPath()
        ctx.strokeStyle = '#C4C4C4'
        ctx.arc(25,25,22, shift, 0.0628 * 101 + shift,false);
        ctx.stroke();
        return
    }

    let value = vacants.occupied / (vacants.total / 100)
    ctx.beginPath()
    ctx.strokeStyle = '#FF455D'
    ctx.arc(25,25,22, startAngle + shift, 0.0628 * value + startAngle + shift,false);
    ctx.stroke();
    startAngle = 0.0628 * value + startAngle
    value = 100 - value
    ctx.beginPath()
    ctx.strokeStyle = '#C4C4C4'
    ctx.arc(25,25,22, startAngle + shift, 0.0628 * value + startAngle + shift,false);
    ctx.stroke();
}

// Диаграмма ПОПУЛЯРНОСТЬ КУРСА (охват учащихся по месяцам)
function drawPopularityChart(values) {
    let chartContainer = document.querySelector('#temporaryID')

    for (let i = 0; i < 12; i++) {
        let child = chartContainer.children[i + 1]
        let ctx = child.firstElementChild.getContext('2d')
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.lineWidth = 10

        let total, paidPercent, requestedPercent
        if (values[i] == null) {
            total = 1
            paidPercent = 0
            requestedPercent = 0
        } else {
            total = values[i].total
            paidPercent = values[i].paid / total * 100
            requestedPercent = values[i].requested / total * 100
        }

        // let posY = 100 - values[i].paid
        ctx.beginPath()
        ctx.moveTo(5, 100)
        ctx.strokeStyle = '#FF455D'
        ctx.lineTo(5, (100 - paidPercent))
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(5, (100 - paidPercent))
        ctx.strokeStyle = '#9E9E9E'
        ctx.lineTo(5, (100 - requestedPercent))
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(5, (100 - requestedPercent))
        ctx.strokeStyle = '#D9D9D9'
        ctx.lineTo(5, 0)
        ctx.stroke()
    }

}