// Состояния разворачиваемых списков
let states = {
    openedCourses: false,
    openedAge: false,
    openedAddress: false,
    openedOrgForm1: false,
    openedOrgForm2: false
}

// Открытие-закрытие разворачиваемых списков
function toggleDropdown(page) {
    let state, dropdownButton, dropdownList
    switch (page) {
        case 'courses1':
            states.openedCourses = !states.openedCourses
            state = states.openedCourses
            dropdownButton = document.querySelector('#dropdownButton')
            dropdownList = document.querySelector('#dropdownList')
            break
        case 'courses2':
            states.openedAge = !states.openedAge
            state = states.openedAge
            dropdownButton = document.querySelector('#ageDropdownButton')
            dropdownList = document.querySelector('#ageDropdownList')
            break
        case 'courses3':
            states.openedAddress = !states.openedAddress
            state = states.openedAddress
            dropdownButton = document.querySelector('#addressDropdownButton')
            dropdownList = document.querySelector('#addressDropdownList')
            break
        case 'org1':
            states.openedOrgForm1 = !states.openedOrgForm1
            state = states.openedOrgForm1
            dropdownButton = document.querySelector('#org1DropdownButton')
            dropdownList = document.querySelector('#org1DropdownList')
            break
        case 'org2':
            states.openedOrgForm2 = !states.openedOrgForm2
            state = states.openedOrgForm2
            dropdownButton = document.querySelector('#org2DropdownButton')
            dropdownList = document.querySelector('#org2DropdownList')
            break
    }
    if (!state) {
        dropdownList.className = 'dropdown-list-closed'
        dropdownButton.className = 'dropdown-button'
    } else {
        dropdownList.className = 'dropdown-list'
        dropdownButton.className = 'dropdown-button rotated'
    }
}

// Выбор элемента из списка
function selectDropdownItem(index, value, page) {
    let textField
    switch (page) {
        case 'courses1':
            toggleDropdown('courses1')
            textField = document.querySelector('#dropdownTF')
            break
        case 'courses2':
            toggleDropdown('courses2')
            textField = document.querySelector('#ageDropdownTF')
            break
        case 'courses3':
            toggleDropdown('courses3')
            textField = document.querySelector('#addressDropdownTF')
            break
        case 'org1':
            toggleDropdown('org1')
            textField = document.querySelector('#org1TF')
            break
        case 'org2':
            toggleDropdown('org2')
            textField = document.querySelector('#org2TF')
            break
    }
    textField.value = value
    if (page === 'courses1') {
        let directionIcon = document.querySelector('.direction-icon')
        setTimeout(() => {
            console.log(directionIcons[index])
            directionIcon.setAttribute('src', directionIcons[index])
            directionIcon.classList.remove('hidden')
            document.querySelector('#dropdownTF').style.padding = '20px 30px 20px 75px'
        }, 10)
    }
}

// Индикатор на правой панели (если будет SPA)
function handlePanelIndicator() {
    let panelActions = document.querySelector('.panel-actions')
    let contentTitle = document.querySelector('.content-title').firstElementChild.innerHTML

    let selectedIndex

    let sectionNames = ['Курсы', 'Вебинары', 'Организация', 'Участники', 'Журнал']

    selectedIndex = sectionNames.findIndex(v => v == contentTitle)

    if (selectedIndex !== -1)
        panelActions.children[selectedIndex].classList.add('selected')
}

// Первая вызываемая функция
function firstResponder() {
    // handlePanelIndicator()
    if (document.querySelector('.Courses-main') !== null) {
        let firstCourseId = courses[0].id
        selectCourse(firstCourseId)
    }
    if (document.querySelector('#image-input') !== null) {
        document.querySelector('#image-input').addEventListener('change', imageHandler)
    }
    // if (document.querySelector('.Journal-main') != null) {
    //     presenceHandler(0)
    // }
}

window.onload = firstResponder