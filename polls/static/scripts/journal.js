
// Наблюдаемое занятие
let observedLessonIndex = 0

// Переключение между вкладками "ПРИСУТСТВОВАЛИ" и "НЕ ПРИСУТСТВОВАЛИ"
function presenceHandler(index) {
    let presence = document.querySelector('#tabs')
    let presence1 = document.querySelector('#presence-1')
    let presence2 = document.querySelector('#presence-2')
    let fragment1 = document.querySelector('#page-1')
    let fragment2 = document.querySelector('#page-2')
    let button1 = document.querySelector('#passButton')
    let button2 = document.querySelector('#passMissingButton')
    let selectionExists = false
    if (index === 0) {
        presence1.classList.add('active')
        presence2.classList.remove('active')
        fragment1.classList.remove('hidden')
        fragment2.classList.add('hidden')
        button2.classList.add('hidden')

        let cards = document.querySelectorAll('#page-1 .cards-wrapper .student-card')
        cards.forEach(card => {
            if (card.classList.contains('selected')) selectionExists = true
        })
        if (selectionExists) button1.classList.remove('hidden')
    }
    if (index === 1) {
        presence1.classList.remove('active')
        presence2.classList.add('active')
        fragment1.classList.add('hidden')
        fragment2.classList.remove('hidden')
        button1.classList.add('hidden')

        let cards = document.querySelectorAll('#page-2 .cards-wrapper .student-card')
        cards.forEach(card => {
            if (card.classList.contains('selected')) selectionExists = true
        })
        if (selectionExists) button2.classList.remove('hidden')
    }
    let searchTF = document.getElementById('journal-search')
    searchTF.value = ''
    journalSearchHandler(searchTF)
}

// Выбранные студенты на первой вкладке
let selectedStudents = []

// Выбор студента на первой вкладке
function selectStudent(id) {
    let cards = document.querySelectorAll('#page-1 .cards-wrapper .student-card')
    let element = document.getElementById(`${id}`)
    let selectionExists = false

    if (element !== null) {
        let img = element.firstElementChild.firstElementChild.firstElementChild
        if (element.classList.contains('selected')) {
            element.classList.remove('selected')
            img.classList.remove('selected-img')
            selectedStudents = selectedStudents.filter(value => value != id)
        } else {
            element.classList.add('selected')
            img.classList.add('selected-img')
            selectedStudents.push(id)
        }
    }
    let enrolButton = document.getElementById('passButton')
    cards.forEach(card => {
        if (card.classList.contains('selected')) selectionExists = true
    })
    if (selectionExists) {
        if (enrolButton.classList.contains('hidden')) enrolButton.classList.remove('hidden')
    } else {
        if (!enrolButton.classList.contains('hidden')) enrolButton.classList.add('hidden')
    }
}
// Выбор всех студентов на первой вкладке
function selectAllStudents() {
    let cards = document.querySelectorAll('#page-1 .cards-wrapper .student-card')
    let passButton = document.getElementById('passButton')
    let fullSelected = true
    cards.forEach(card => {
        if (!card.classList.contains('selected')) fullSelected = false
    })
    if (fullSelected) {
        cards.forEach(element => {
            let img = element.firstElementChild.firstElementChild.firstElementChild
            element.classList.remove('selected')
            img.classList.remove('selected-img')
        })
        selectedStudents = []
        passButton.classList.add('hidden')
    } else {
        cards.forEach(element => {
            let img = element.firstElementChild.firstElementChild.firstElementChild
            if (!element.classList.contains('selected')) {
                element.classList.add('selected')
                img.classList.add('selected-img')
                selectedStudents.push(element.id)
            }
        })
        passButton.classList.remove('hidden')
    }
}
// Сортировка студентов на первой вкладке
function sortStudentsBy(field) {
    let cards = document.getElementById('page-1').getElementsByClassName('student-card')
    let cardsArray = Array.from(cards)
    if (field === 'group') {
        cardsArray.sort((a, b) => {
            let group1 = a.children[1].innerHTML
            let group2 = b.children[1].innerHTML
            if (group1 > group2) return 1
            if (group1 < group2) return -1
            return 0
        })
    }
    if (field === 'score') {
        cardsArray.sort((a, b) => {
            let score1 = a.children[4].innerHTML
            let score2 = b.children[4].innerHTML
            if (score1 > score2) return -1
            if (score1 < score2) return 1
            return 0
        })
    }

    if (field === 'date') {
        cardsArray.sort((a, b) => {
            let date1 = a.children[6].innerHTML
            let date2 = b.children[6].innerHTML
            let time1 = a.children[5].innerHTML
            let time2 = b.children[5].innerHTML
            let dateParts = date1.split('.')
            let stringDate = `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${time1}+09:00`
            let parsedDate1 = Date.parse(stringDate)
            dateParts = date2.split('.')
            stringDate = `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${time2}+09:00`
            let parsedDate2 = Date.parse(stringDate)
            if (parsedDate1 > parsedDate2) return -1
            if (parsedDate1 < parsedDate2) return 1
            return 0
        })
    }
    if (field === 'time') {
        cardsArray.sort((a, b) => {
            let time1 = a.children[5].innerHTML
            let time2 = b.children[5].innerHTML
            if (time1 > time2) return -1
            if (time1 < time2) return 1
            return 0
        })
    }
    if (field === 'answers') {
        cardsArray.sort((a, b) => {
            let answer1 = a.children[2].innerHTML
            let answer2 = b.children[2].innerHTML
            if (answer1 > answer2) return -1
            if (answer1 < answer2) return 1
            return 0
        })
    }
    if (field === 'question') {
        cardsArray.sort((a, b) => {
            let answer1 = a.children[3].innerHTML
            let answer2 = b.children[3].innerHTML
            if (answer1 > answer2) return 1
            if (answer1 < answer2) return -1
            return 0
        })
    }

    let wrapper = document.querySelector('#page-1 .cards-wrapper')
    while (wrapper.hasChildNodes())
        wrapper.removeChild(wrapper.lastElementChild)
    cardsArray.forEach(newCard => wrapper.appendChild(newCard))
}


// Выбранные студенты на второй вкладке
let selectedMissingStudents = []

// Выбор студента на второй вкладке
function selectMissingStudent(id) {
    let cards = document.querySelectorAll('#page-2 .cards-wrapper .student-card')
    let element = document.getElementById(`${id}`)
    let selectionExists = false

    if (element !== null) {
        let img = element.firstElementChild.firstElementChild.firstElementChild
        if (element.classList.contains('selected')) {
            element.classList.remove('selected')
            img.classList.remove('selected-img')
            selectedMissingStudents = selectedMissingStudents.filter(value => value != id)
        } else {
            element.classList.add('selected')
            img.classList.add('selected-img')
            selectedMissingStudents.push(id)
        }
    }

    let passMissingButton = document.getElementById('passMissingButton')
    cards.forEach(card => {
        if (card.classList.contains('selected')) selectionExists = true
    })
    if (selectionExists) {
        if (passMissingButton.classList.contains('hidden')) passMissingButton.classList.remove('hidden')
    }
    else {
        if (!passMissingButton.classList.contains('hidden')) passMissingButton.classList.add('hidden')
    }
}
// Выбор всех студентов на второй вкладке
function selectAllMissingStudents() {
    let cards = document.querySelectorAll('#page-2 .cards-wrapper .student-card')
    let passMissingButton = document.getElementById('passMissingButton')
    let fullSelected = true
    cards.forEach(card => {
        if (!card.classList.contains('selected')) fullSelected = false
    })
    if (fullSelected) {
        cards.forEach(element => {
            let img = element.firstElementChild.firstElementChild.firstElementChild
            element.classList.remove('selected')
            img.classList.remove('selected-img')
        })
        selectedMissingStudents = []
        passMissingButton.classList.add('hidden')
    } else {
        cards.forEach(element => {
            let img = element.firstElementChild.firstElementChild.firstElementChild
            if (!element.classList.contains('selected')) {
                element.classList.add('selected')
                img.classList.add('selected-img')
                selectedMissingStudents.push(element.id)
            }
        })
        passMissingButton.classList.remove('hidden')
    }
}
// Сортировка студентов на второй вкладке
function sortMissingStudentsBy(field) {
    let cards = document.querySelectorAll('#page-2 .cards-wrapper .student-card')
    let cardsArray = Array.from(cards)
    if (field === 'group') {
        cardsArray.sort((a, b) => {
            let group1 = a.children[1].innerHTML
            let group2 = b.children[1].innerHTML
            if (group1 > group2) return 1
            if (group1 < group2) return -1
            return 0
        })
    }
    if (field === 'score') {
        cardsArray.sort((a, b) => {
            let score1 = a.children[4].innerHTML
            let score2 = b.children[4].innerHTML
            if (score1 > score2) return -1
            if (score1 < score2) return 1
            return 0
        })
    }
    if (field === 'date') {
        cardsArray.sort((a, b) => {
            let date1 = a.children[6].innerHTML
            let date2 = b.children[6].innerHTML
            let time1 = a.children[5].innerHTML
            let time2 = b.children[5].innerHTML
            let dateParts = date1.split('.')
            let stringDate = `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${time1}+09:00`
            let parsedDate1 = Date.parse(stringDate)
            dateParts = date2.split('.')
            stringDate = `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${time2}+09:00`
            let parsedDate2 = Date.parse(stringDate)
            if (parsedDate1 > parsedDate2) return -1
            if (parsedDate1 < parsedDate2) return 1
            return 0
        })
    }
    if (field === 'time') {
        cardsArray.sort((a, b) => {
            let time1 = a.children[5].innerHTML
            let time2 = b.children[5].innerHTML
            if (time1 > time2) return -1
            if (time1 < time2) return 1
            return 0
        })
    }
    if (field === 'answers') {
        cardsArray.sort((a, b) => {
            let answer1 = a.children[2].innerHTML
            let answer2 = b.children[2].innerHTML
            if (answer1 > answer2) return -1
            if (answer1 < answer2) return 1
            return 0
        })
    }
    if (field === 'question') {
        cardsArray.sort((a, b) => {
            let answer1 = a.children[3].innerHTML
            let answer2 = b.children[3].innerHTML
            if (answer1 > answer2) return 1
            if (answer1 < answer2) return -1
            return 0
        })
    }

    let wrapper = document.querySelector('#page-2 .cards-wrapper')
    while (wrapper.hasChildNodes())
        wrapper.removeChild(wrapper.lastElementChild)
    cardsArray.forEach(newCard => wrapper.appendChild(newCard))
}


// Раскрытие выпадающего списка ЗАНЯТИЙ
function chooseInJournal(action, name) {
    if (action.includes('toggle')) {
        let btn, list, input
        switch (action) {
            case 'toggle-lessons':
                btn = document.querySelector('.input-button.lesson')
                list = document.querySelector('.popup-list.lesson-choose')
                input = document.querySelector('#lesson-choose-input')
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
            case 'pick-lesson':
                input = document.querySelector('#lesson-choose-input')
                completion = 'toggle-lessons'
                observedLessonIndex = name
                switchLesson()
                break
            default: break
        }
        input.value = lessons[observedLessonIndex].title
        chooseInJournal(completion)
    }
}

// Выбор одного из ЗАНЯТИЙ
function switchLesson() {
    let lesson = lessons[observedLessonIndex]

    let duration = document.querySelector('.duration-button').lastElementChild
    let scoreBlock = document.querySelector('.passing-score')
    let courseName = document.querySelector('.course-name-block').firstElementChild
    let courseIcon = document.querySelector('.course-name-block').lastElementChild
    let numberOfTasks = document.querySelector('.number-of-questions')
    let totalStudents = document.querySelector('#total-students')
    let averageScore = document.querySelector('#average-score')
    let notPassed = document.querySelector('#not-passed-students')
    let turnedOut = document.querySelector('#turned-out-students')
    let passed = document.querySelector('#total-passed-students')
    let failed = document.querySelector('#total-failed-students')

    let presence1 = document.querySelector('#presence-1').firstElementChild
    let presence2 = document.querySelector('#presence-2').firstElementChild

    let cards1 = document.querySelector('#page-1 .cards-wrapper')
    let cards2 = document.querySelector('#page-2 .cards-wrapper')

    duration.innerHTML = lesson.duration || ''
    if (lesson.scores !== undefined)
        scoreBlock.innerHTML = `${lesson.scores.max} Баллов (проходной балл ${lesson.scores.passing})`
    if (lesson.course !== undefined) {
        courseName.innerHTML = `Курс: ${lesson.course.name}`
        let newIcon = directionIconGenerator(null, lesson.course.category)
        courseIcon.setAttribute('src', newIcon)
        courseIcon.setAttribute('onload', '')
        numberOfTasks.innerHTML = `${lesson.course.numberOfTasks} заданий`
    }
    totalStudents.innerHTML = lesson.total || '0'
    averageScore.innerHTML = lesson.averageScore || '0'
    notPassed.innerHTML = lesson.notPassed || '0'
    turnedOut.innerHTML = lesson.turnedOut || '0'
    passed.innerHTML = lesson.passed || '0'
    failed.innerHTML = lesson.failed || '0'
    presence1.innerHTML = `Присустствовали (${lesson.answers.length})`
    presence2.innerHTML = `Не присустствовали (${lesson.answersMissing.length})`

    while (cards1.hasChildNodes()) cards1.removeChild(cards1.lastChild)
    while (cards2.hasChildNodes()) cards2.removeChild(cards2.lastChild)

    lesson.answers.forEach(answer => {
        let newCard = createStudentCard(answer)
        cards1.appendChild(newCard)
    })
    lesson.answersMissing.forEach(answer => {
        let newCard = createMissingStudentCard(answer)
        cards2.appendChild(newCard)
    })
}

// Создание одного элемента из первой вкладки
function createStudentCard(answer) {
    let studentCard = document.createElement('div')
    studentCard.className = 'student-card'
    studentCard.id = answer.id
    let studentBlock = document.createElement('div')
    studentBlock.className = 'student-block'
    studentCard.setAttribute('onclick', `selectStudent('${answer.id}')`)
    let studentIcon = document.createElement('div')
    studentIcon.className = 'student-icon'
    let studentName = document.createElement('div')
    studentName.className = 'student-name'
    studentName.innerHTML = answer.name
    let img = document.createElement('img')
    img.setAttribute('src', answer.image)
    let group = document.createElement('div')
    group.innerHTML = answer.group
    let attempts = document.createElement('div')
    attempts.innerHTML = answer.attemptsNumber
    let taskNumber = document.createElement('div')
    taskNumber.innerHTML = '№' + answer.taskNumber

    let color = '#494949'
    let regexp = /[(]([0-9]*)[%][)]/
    let scorePercent = answer.score.match(regexp)[1]
    if (scorePercent >= 70) color = '#27AE60'
    else if (scorePercent >= 30) color = '#D1734A'
    else color = '#FF455D'
    let score = document.createElement('div')
    score.style.color = `${color}`
    score.innerHTML = answer.score
    let time = document.createElement('div')
    time.innerHTML = answer.time
    let date = document.createElement('div')
    date.innerHTML = answer.date
    let detailButton = document.createElement('button')
    detailButton.setAttribute('onclick', `showAnswerDetail('${answer.id}')`)
    let arrowRight = document.createElement('img')
    arrowRight.setAttribute('src', '/static/assets/arrow_right.svg')

    studentIcon.append(img)
    studentBlock.append(studentIcon, studentName)
    detailButton.append(arrowRight)
    studentCard.append(studentBlock, group, attempts, taskNumber, score, time, date, detailButton)
    return studentCard
}
// Создание одного элемента из второй вкладки
function createMissingStudentCard(answer) {
    let studentCard = document.createElement('div')
    studentCard.className = 'student-card'
    studentCard.id = answer.id
    let studentBlock = document.createElement('div')
    studentBlock.className = 'student-block'
    studentCard.setAttribute('onclick', `selectMissingStudent('${answer.id}')`)
    let studentIcon = document.createElement('div')
    studentIcon.className = 'student-icon'
    let studentName = document.createElement('div')
    studentName.className = 'student-name'
    studentName.innerHTML = answer.name
    let img = document.createElement('img')
    img.setAttribute('src', answer.image)
    let group = document.createElement('div')
    group.innerHTML = answer.group
    let attempts = document.createElement('div')
    attempts.innerHTML = answer.attemptsNumber
    let taskNumber = document.createElement('div')
    taskNumber.innerHTML = '№' + answer.taskNumber

    let color = '#494949'
    let regexp = /[(]([0-9]*)[%][)]/
    let scorePercent = answer.score.match(regexp)[1]
    if (scorePercent >= 70) color = '#27AE60'
    else if (scorePercent >= 30) color = '#D1734A'
    else color = '#FF455D'
    let score = document.createElement('div')
    score.style.color = `${color}`
    score.innerHTML = answer.score
    let time = document.createElement('div')
    time.innerHTML = answer.time
    let date = document.createElement('div')
    date.innerHTML = answer.date
    let detailButton = document.createElement('button')
    detailButton.setAttribute('onclick', `showAnswerDetail('${answer.id}')`)
    let arrowRight = document.createElement('img')
    arrowRight.setAttribute('src', '/static/assets/arrow_right.svg')

    studentIcon.append(img)
    studentBlock.append(studentIcon, studentName)
    detailButton.append(arrowRight)
    studentCard.append(studentBlock, group, attempts, taskNumber, score, time, date, detailButton)
    return studentCard
}


// Кнопка ОТМЕТИТЬ как СДАНО
function markAsPassed(category) {
    if (category === 'present') {
        let answersToMarkPassed = []
        let cards = document.querySelector('#page-1 .cards-wrapper').children
        for (let i = 0; i < cards.length; i++)
            if (cards[i].classList.contains('selected'))
                answersToMarkPassed.push(cards[i].id)

        let initialData = lessons[observedLessonIndex].answers
        initialData = initialData.filter(value => {
            let flag = true
            answersToMarkPassed.forEach(id => {
                if (value.id == id) {
                    flag = false
                }
            })
            return flag
        })
        lessons[observedLessonIndex].answers = initialData
        switchLesson()
        selectStudent(-1)
    }
    if (category === 'missing') {
        let answersMissingToMarkPassed = []
        let cards = document.querySelector('#page-2 .cards-wrapper').children
        for (let i = 0; i < cards.length; i++)
            if (cards[i].classList.contains('selected'))
                answersMissingToMarkPassed.push(cards[i].id)

        let initialData = lessons[observedLessonIndex].answersMissing
        initialData = initialData.filter(value => {
            let flag = true
            answersMissingToMarkPassed.forEach(id => {
                if (value.id == id) {
                    flag = false
                }
            })
            return flag
        })
        lessons[observedLessonIndex].answersMissing = initialData
        switchLesson()
        selectMissingStudent(-1)
    }


}

// Поиск по полю ввода
function journalSearchHandler(sender) {
    let cards = document.querySelector('#page-1 .cards-wrapper').children
    for (let i = 0; i < cards.length; i++) {
        let name = cards[i].getElementsByClassName('student-name')[0].innerHTML.toLowerCase()
        cards[i].style.display = 'grid'
        if (!(`${name}`.includes(sender.value.toLowerCase())))
            cards[i].style.display = 'none'
    }
    let cardsSecondPage = document.querySelector('#page-2 .cards-wrapper').children
    for (let i = 0; i < cardsSecondPage.length; i++) {
        let name = cardsSecondPage[i].getElementsByClassName('student-name')[0].innerHTML.toLowerCase()
        cardsSecondPage[i].style.display = 'grid'
        if (!(`${name}`.includes(sender.value.toLowerCase())))
            cardsSecondPage[i].style.display = 'none'
    }
}



// Отображение экрана ДЕТАЛИ
function showAnswerDetail(answerId) {

    let modal = document.querySelector('#answer-modal')
    if (modal.classList.contains('invisible')) {
        modal.classList.remove('invisible')
        modal.style.opacity = '1'
        buildDetailView(answerId)
        document.body.style.overflow = 'hidden'
        document.addEventListener('mousedown', tasksSideClickHandler)

        let subModal = modal.firstElementChild
        setTimeout(() => {
            subModal.style.transform = 'translateY(0px)'
            subModal.style.opacity = '1'
        }, 0)
    }
    else {
        modal.style.opacity = '0'
        setTimeout(() => {
            modal.classList.add('invisible')
        }, 200)
        document.body.style.overflow = 'auto'
        document.removeEventListener('mousedown', tasksSideClickHandler)

        let subModal = modal.firstElementChild
        subModal.style.transform = 'translateY(100vh)'
        subModal.style.opacity = '0'
    }
}

// Клик за пределами экрана ДЕТАЛИ
let tasksSideClickHandler = (event) => {
    let elements = document.elementsFromPoint(event.clientX, event.clientY)
    let result = elements.find(element => {
        return element.classList.contains('wrapper');
    })
    if (result === undefined) showAnswerDetail()
}

// Создание экрана ДЕТАЛИ
function buildDetailView(answerId) {
    let answersToJs = lessons[observedLessonIndex].answers
    let answersMissingToJs = lessons[observedLessonIndex].answersMissing
    let modal = document.querySelector('#answer-modal')
    let answer = answersToJs.filter(item => item.id == answerId)[0]

    if (answer === undefined)
        answer = answersMissingToJs.filter(item => item.id == answerId)[0]
    let studentMeta = document.createElement('div')
    studentMeta.className = 'student-meta'

    let profile = document.createElement('div')
    profile.className = 'profile'
    let img = document.createElement('img')
    img.src = answer.image
    let name = document.createElement('div')
    name.innerHTML = answer.name
    profile.append(img, name)

    let group = document.createElement('div')
    group.innerHTML = `Гр. ${answer.group}`
    let number = document.createElement('div')
    number.innerHTML = `Задание №${answer.taskNumber}`
    let time = document.createElement('div')
    time.innerHTML = `Время последнего ответа – ${answer.time}`
    let date = document.createElement('div')
    date.innerHTML = answer.date

    studentMeta.append(profile, group, number, time, date)

    let questionBody = document.createElement('div')
    questionBody.className = 'question-body'
    let title = document.createElement('div')
    title.className = 'title'
    title.innerHTML = `Задание №${answer.taskNumber}`
    let description = document.createElement('div')
    description.className = 'description'
    description.innerHTML = answer.description
    questionBody.append(title, description)

    let header = document.createElement('div')
    header.className = 'header'
    header.append(studentMeta, questionBody)

    let attempts = []
    answer.attempts.forEach((attempt, index) => {
        let correctClass = attempt.comment == null ? "" : "incorrect"
        if (attempt.isCorrect === undefined) correctClass = true
        // let markClass = attempt.mark === undefined ? "active" : ""
        let markClass = ""
        let card = document.createElement('div')
        card.className = `answer ${correctClass} ${markClass}`
        let wrapper = document.createElement('div')
        wrapper.className = 'wrapper'

        let answerBody = document.createElement('button')
        answerBody.className = 'answer-body'
        answerBody.setAttribute('onclick', 'handleEditorMode(this)')
        let secondTitle = document.createElement('div')
        secondTitle.innerHTML = `Ответ (${index + 1} попытка)`
        secondTitle.className = 'title'
        let secondDescription = document.createElement('div')
        secondDescription.innerHTML = attempt.body
        secondDescription.className = 'description'
        answerBody.append(secondTitle, secondDescription)

        let counter = document.createElement('div')
        counter.className = 'counter'
        let buttonSubtract = document.createElement('button')
        buttonSubtract.setAttribute('onclick', 'changeMark(this, -1)')
        buttonSubtract.innerHTML = '-'
        let buttonAdd = document.createElement('button')
        buttonAdd.setAttribute('onclick', 'changeMark(this, 1)')
        buttonAdd.innerHTML = '+'
        let sign = document.createElement('div')
        sign.className = 'sign'
        sign.innerHTML = attempt.mark === undefined ? '' : attempt.mark
        counter.append(buttonSubtract, sign, buttonAdd)

        wrapper.append(answerBody, counter)

        let labelIncorrect = document.createElement('div')
        labelIncorrect.className = 'label-incorrect'
        let image = document.createElement('img')
        image.setAttribute('src', '/static/assets/next_line_icon.svg')
        let incorrect = document.createElement('div')
        incorrect.innerHTML = attempt.comment
        labelIncorrect.append(image, incorrect)

        let textarea = document.createElement('textarea')
        textarea.className = 'commentary-tf'
        textarea.placeholder = 'Добавить комментарий'

        let sendButton = document.createElement('button')
        sendButton.className = 'send-button'
        sendButton.innerHTML = 'Отправить'
        sendButton.setAttribute('onclick', 'submitMark(this)')

        card.append(wrapper, labelIncorrect, textarea, sendButton)
        attempts.push(card)
    })
    let mainWrapper = document.createElement('div')
    mainWrapper.className = 'wrapper'
    mainWrapper.append(header)
    mainWrapper.append(...attempts)

    modal.replaceChild(mainWrapper, modal.lastElementChild)
}

// Редактируется попытка студента или нет
function handleEditorMode(sender) {
    let attemptBody = sender.closest('.answer')
    if (attemptBody.classList.contains('active')) {
        attemptBody.classList.remove('active')
    } else {
        attemptBody.classList.add('active')
    }
}

// Выставление балла (+ -)
function changeMark(sender, value) {
    let markTextField = sender.parentElement.children[1]
    let newValue = Number.parseInt(markTextField.innerHTML)
    if (isNaN(newValue)) {
        newValue = 1
        markTextField.innerHTML = newValue
        return
    }
    newValue += value
    markTextField.innerHTML = newValue
}

// Сохранить оценку и комментарий для ответа
function submitMark(sender) {
    let attemptBody = sender.closest('.answer')
    let teachersComment = sender.parentElement.getElementsByClassName('commentary-tf')[0].value
    let mark = sender.parentElement.getElementsByClassName('sign')[0].innerHTML

    /* Do something with data */

    attemptBody.classList.remove('active')
}


if (document.querySelector('.Journal-main') != null) {
    presenceHandler(0)
}