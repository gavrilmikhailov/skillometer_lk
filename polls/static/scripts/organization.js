let searchModalHidden = true
let organizationView = document.querySelector('.Organization-main')

function toggleSearchModal() {
    let modal = document.getElementById('teachers-search-modal')
    if (searchModalHidden) {
        modal.classList.remove('hidden')
        let searchTF = document.getElementById('search-teacher-input')
        searchTF.value = ''
        searchTF.focus()
    }
    else modal.classList.add('hidden')
    searchModalHidden = !searchModalHidden
}

// Добавить адрес
function addressModal(action, sender) {
    let modal = document.querySelector('.address-modal')
    let cityField = document.getElementById('address-city-input')
    let streetField = document.getElementById('address-street-input')
    let houseField = document.getElementById('address-house-input')
    let officeField = document.getElementById('address-office-input')
    if (action === 'show') {
        cityField.focus()
        cityField.value = ''
        streetField.value = ''
        houseField.value = ''
        officeField.value = ''
        modal.classList.remove('hidden')
        setTimeout(() => {
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.25)'
            modal.firstElementChild.style.opacity = '1'
            modal.firstElementChild.style.transform = 'translateX(-50%) translateY(-50%)'
        }, 10)
        sideClickHandler(modal, 'add')
        document.addEventListener('keyup', enterKey = (event) => {
            if (event.keyCode === 13) addressModal('submit')
        })
        cityField.focus()
    }
    if (action === 'close') {
        modal.style.backgroundColor = 'transparent'
        modal.firstElementChild.style.opacity = '0'
        modal.firstElementChild.style.transform = 'translateX(-50%) translateY(-55%)'
        setTimeout(() => modal.classList.add('hidden'), 200)
        document.removeEventListener('keyup', enterKey)
        sideClickHandler(modal, 'remove')
    }
    if (action === 'submit') {
        let city = cityField.value
        let street = streetField.value
        let house = houseField.value
        let office = officeField.value
        if (city === '' || street === '' || house === '') {
            alert('Заполните обязательные поля')
            return
        }
        let newInput = document.createElement('input')
        newInput.readOnly = true
        let address = `${city}, ${street} ${house}`
        if (office !== '') address += `, ${office}`
        newInput.type = 'text'
        newInput.setAttribute('tag', 'address')
        newInput.value = address

        let inputWrapper = document.createElement('div')
        let deleteButton = document.createElement('button')
        let closeImage = document.createElement('img')
        closeImage.src = '/static/assets/close_x.svg'
        inputWrapper.className = 'input-wrapper'
        deleteButton.className = 'delete-button center'
        deleteButton.setAttribute('onclick', 'addressModal("delete", this)')

        deleteButton.append(closeImage)
        inputWrapper.append(newInput)
        inputWrapper.append(deleteButton)

        let inputsBlock = document.querySelector('.top-inputs-org')
        inputsBlock.insertBefore(inputWrapper, document.getElementById('new-address-block'))

        addressModal('close')
    }

    if (action === 'delete') {
        let parent = sender.closest('.input-wrapper')
        parent.classList.add('narrowed')
        setTimeout(() => parent.remove(), 300)
    }
}

// Добавить номер телефона
function phoneModal(action, sender) {
    let modal = document.querySelector('.phone-modal')
    let phoneNumber = document.getElementById('phone-number-input')
    let phonePerson = document.getElementById('phone-person-input')
    if (action === 'show') {
        phoneNumber.value = ''
        phonePerson.value = ''
        modal.classList.remove('hidden')
        setTimeout(() => {
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.25)'
            modal.firstElementChild.style.opacity = '1'
            modal.firstElementChild.style.transform = 'translateX(-50%) translateY(-40%)'
        }, 10)
        sideClickHandler(modal, 'add')
        document.addEventListener('keyup', enterKey = (event) => {
            if (event.keyCode === 13) phoneModal('submit')
        })
        phoneNumber.focus()
    }
    if (action === 'close') {
        setTimeout(() => modal.classList.add('hidden'), 200)
        modal.style.backgroundColor = 'transparent'
        modal.firstElementChild.style.opacity = '0'
        modal.firstElementChild.style.transform = 'translateX(-50%) translateY(-50%)'
        document.removeEventListener("keyup", enterKey)
        sideClickHandler(modal, 'remove')
    }
    if (action === 'submit') {
        let number = phoneNumber.value
        let person = phonePerson.value
        if (number === '') {
            alert('Заполните обязательные поля')
            return
        }
        let newInput = document.createElement('input')
        newInput.readOnly = true
        let fullInfo = `${number}`
        if (person !== '') fullInfo += ` – ${person}`
        newInput.type = 'text'
        newInput.setAttribute('tag', 'phone')
        newInput.value = fullInfo

        let inputWrapper = document.createElement('div')
        let deleteButton = document.createElement('button')
        let closeImage = document.createElement('img')
        closeImage.src = '/static/assets/close_x.svg'
        inputWrapper.className = 'input-wrapper'
        deleteButton.className = 'delete-button center'
        deleteButton.setAttribute('onclick', 'phoneModal("delete", this)')

        deleteButton.append(closeImage)
        inputWrapper.append(newInput)
        inputWrapper.append(deleteButton)

        let inputsBlock = document.querySelector('.top-inputs-org')
        inputsBlock.insertBefore(inputWrapper, document.getElementById('new-phone-block'))

        phoneModal('close')
    }
    if (action === 'delete') {
        let parent = sender.closest('.input-wrapper')
        parent.classList.add('narrowed')
        setTimeout(() => parent.remove(), 300)
    }
}

// Добавить сайт
function siteModal(action, sender) {
    let modal = document.querySelector('.site-modal')
    let siteAddress = document.getElementById('site-address-input')
    if (action === 'show') {
        siteAddress.value = ''
        modal.classList.remove('hidden')
        setTimeout(() => {
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.25)'
            modal.firstElementChild.style.opacity = '1'
            modal.firstElementChild.style.transform = 'translateX(-50%) translateY(-40%)'
        }, 10)
        sideClickHandler(modal, 'add')
        document.addEventListener('keyup', enterKey = (event) => {
            if (event.keyCode === 13) siteModal('submit')
        })
        siteAddress.focus()
    }
    if (action === 'close') {
        setTimeout(() => modal.classList.add('hidden'), 200)
        modal.style.backgroundColor = 'transparent'
        modal.firstElementChild.style.opacity = '0'
        modal.firstElementChild.style.transform = 'translateX(-50%) translateY(-50%)'
        document.removeEventListener('keyup', enterKey)
        sideClickHandler(modal, 'remove')
    }
    if (action === 'submit') {
        let address = siteAddress.value
        if (address === '') {
            alert('Заполните обязательные поля')
            return
        }
        let newInput = document.createElement('input')
        newInput.readOnly = true
        newInput.type = 'text'
        newInput.setAttribute('tag', 'site')
        newInput.value = `${address}`

        let inputWrapper = document.createElement('div')
        let deleteButton = document.createElement('button')
        let closeImage = document.createElement('img')
        closeImage.src = '/static/assets/close_x.svg'
        inputWrapper.className = 'input-wrapper'
        deleteButton.className = 'delete-button center'
        deleteButton.setAttribute('onclick', 'siteModal("delete", this)')

        deleteButton.append(closeImage)
        inputWrapper.append(newInput)
        inputWrapper.append(deleteButton)

        let inputsBlock = document.querySelector('.top-inputs-org')
        inputsBlock.insertBefore(inputWrapper, document.getElementById('new-site-block'))

        siteModal('close')
    }
    if (action === 'delete') {
        let parent = sender.closest('.input-wrapper')
        parent.classList.add('narrowed')
        setTimeout(() => parent.remove(), 300)
    }
}

// Добавить электронную почту
function mailModal(action, sender) {
    let modal = document.querySelector('.mail-modal')
    let mailAddress = document.getElementById('mail-address-input')
    if (action === 'show') {
        mailAddress.value = ''
        modal.classList.remove('hidden')
        setTimeout(() => {
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.25)'
            modal.firstElementChild.style.opacity = '1'
            modal.firstElementChild.style.transform = 'translateX(-50%) translateY(-40%)'
        }, 10)
        sideClickHandler(modal, 'add')
        document.addEventListener('keyup', enterKey = (event) => {
            if (event.keyCode === 13) mailModal('submit')
        })
        mailAddress.focus()
    }
    if (action === 'close') {
        setTimeout(() => modal.classList.add('hidden'), 200)
        modal.style.backgroundColor = 'transparent'
        modal.firstElementChild.style.opacity = '0'
        modal.firstElementChild.style.transform = 'translateX(-50%) translateY(-50%)'
        document.removeEventListener('keyup', enterKey)
        sideClickHandler(modal, 'remove')
    }
    if (action === 'submit') {
        let address = mailAddress.value
        if (address === '') {
            alert('Заполните обязательные поля')
            return
        }
        let newInput = document.createElement('input')
        newInput.readOnly = true
        newInput.type = 'text'
        newInput.setAttribute('tag', 'mail')
        newInput.value = `${address}`

        let inputWrapper = document.createElement('div')
        let deleteButton = document.createElement('button')
        let closeImage = document.createElement('img')
        closeImage.src = '/static/assets/close_x.svg'
        inputWrapper.className = 'input-wrapper'
        deleteButton.className = 'delete-button center'
        deleteButton.setAttribute('onclick', 'mailModal("delete", this)')

        deleteButton.append(closeImage)
        inputWrapper.append(newInput)
        inputWrapper.append(deleteButton)

        let inputsBlock = document.querySelector('.top-inputs-org')
        inputsBlock.insertBefore(inputWrapper, document.getElementById('new-mail-block'))

        mailModal('close')
    }
    if (action === 'delete') {
        let parent = sender.closest('.input-wrapper')
        parent.classList.add('narrowed')
        setTimeout(() => parent.remove(), 300)
    }
}

// Закрытие окон кликом за пределами окон
let addressModalListener = (event) => {
    let elements = document.elementsFromPoint(event.clientX, event.clientY)
    let result = elements.find(element => {
        return element.classList.contains('wrapper');
    })
    if (result === undefined) addressModal('close')
}
let phoneModalListener = (event) => {
    let elements = document.elementsFromPoint(event.clientX, event.clientY)
    let result = elements.find(element => {
        return (element.classList.contains('wrapper'));
    })
    if (result === undefined) phoneModal('close')
}
let siteModalListener = (event) => {
    let elements = document.elementsFromPoint(event.clientX, event.clientY)
    let result = elements.find(element => {
        return (element.classList.contains('wrapper'));
    })
    if (result === undefined) siteModal('close')
}
let mailModalListener = (event) => {
    let elements = document.elementsFromPoint(event.clientX, event.clientY)
    let result = elements.find(element => {
        return (element.classList.contains('wrapper'));
    })
    if (result === undefined) mailModal('close')
}
function sideClickHandler(target, action) {
    if (target.classList.contains('address-modal')) {
        if (action === 'add') document.addEventListener('mousedown', addressModalListener)
        if (action === 'remove') document.removeEventListener('mousedown', addressModalListener)
    }
    if (target.classList.contains('phone-modal')) {
        if (action === 'add') document.addEventListener('mousedown', phoneModalListener)
        if (action === 'remove') document.removeEventListener('mousedown', phoneModalListener)
    }
    if (target.classList.contains('site-modal')) {
        if (action === 'add') document.addEventListener('mousedown', siteModalListener)
        if (action === 'remove') document.removeEventListener('mousedown', siteModalListener)
    }
    if (target.classList.contains('mail-modal')) {
        if (action === 'add') document.addEventListener('mousedown', mailModalListener)
        if (action === 'remove') document.removeEventListener('mousedown', mailModalListener)
    }
}

// Сортировка списка преподавателей
function sortTeachersList(sender) {
    let grandParent = sender.closest('.teachers-block')
    let domList = grandParent.lastElementChild
    let array = Array.from(domList.children)
    array.sort((a, b) => {
        let name1 = a.lastElementChild.innerHTML
        let name2 = b.lastElementChild.innerHTML
        if (name1 > name2) return 1
        if (name2 > name1) return -1
        return 0
    })
    while (domList.hasChildNodes())
        domList.removeChild(domList.lastElementChild)
    array.forEach(teacher => domList.appendChild(teacher))
}

// Кнопка СОХРАНИТЬ
function submitForm() {
    let newData = {
        addresses: [],
        phones: [],
        sites: [],
        mails: []
    }
    let allFields = document.querySelectorAll('input')
    allFields.forEach(field => {
        switch (field.getAttribute('tag')) {
            case 'inn': newData.INN = field.value; break
            case 'full-name': newData.fullName = field.value; break
            case 'short-name': newData.shortName = field.value; break
            case 'org-form': newData.organizationForm = field.value; break
            case 'work-form': newData.workForm = field.value; break
            case 'chief': newData.chief = field.value; break
            case 'city': newData.city = field.value; break
            case 'street': newData.street = field.value; break
            case 'house': newData.house = field.value; break
            case 'cabinet': newData.cabinet = field.value; break
            case 'address': newData.addresses.push(field.value); break
            case 'phone': newData.phones.push(field.value); break
            case 'site': newData.sites.push(field.value); break
            case 'mail': newData.mails.push(field.value); break
            default: break
        }
    })

    console.log(newData)
}

// Кнопка ОТМЕНА
function cancelEditing() {
    window.history.back()
}

// Поиск преподавателя по тегам
let searchTags = []
function clearSearchTags() {
    searchTags = []
    updateSearchTags()
}
function updateSearchTags() {
    let section = document.querySelector('.tags-section')
    let newSection = document.createElement('div')
    newSection.className = 'tags-section'
    searchTags.forEach((name) => {
        let tag = document.createElement('div')
        tag.className = 'tag'
        tag.innerHTML = name
        newSection.appendChild(tag)
    })
    section.parentElement.replaceChild(newSection, section)

    let clearBtn = document.querySelector('#tags-clear-button')
    if (searchTags.length > 0) {
        clearBtn.classList.remove('hidden')
    } else {
        clearBtn.classList.add('hidden')
    }
}
function addSearchTag(sender) {
    let tag = sender.innerHTML
    searchTags = searchTags.filter(t => t != tag)
    searchTags.push(sender.innerHTML)
    updateSearchTags()
}

if (organizationView != null) {
    document.addEventListener('click', (event) => {
        if (!searchModalHidden) {
            let elements = document.elementsFromPoint(event.clientX, event.clientY)
            let result = elements.find(element => {
                return element.classList.contains('search-modal');
            })
            if (result === undefined) toggleSearchModal()
        }
    })
}