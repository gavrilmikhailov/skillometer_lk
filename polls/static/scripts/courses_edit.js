// Кнопка ДАЛЕЕ, сохранить изменения
function submitNewCourse() {
    let body = {
        direction: document.getElementById('dropdownTF').value,
        tag: document.getElementById('tagTF').value,
        name: document.getElementById('nameTF').value,
        age_group: document.getElementById('ageDropdownTF').value,
        age: document.getElementById('ageTF').value,
        description: document.getElementById('descriptionTF').innerHTML,
        begin_date: document.getElementById('begin-date').value,
        end_date: document.getElementById('end-date').value,
        address: document.getElementById('addressDropdownTF').value
    }
    let url = 'https://'

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    }).then(
        response => console.log(response)
    )
}

// Нажатие по невидимой кнопке "Выберите файл"
function openFileInput() {
    let input = document.querySelector('#image-input')
    input.click()
}

// Загрузка изображения курса
function imageHandler(event) {
    let input = document.querySelector('#image-input')
    let file = input.files[0]
    let size = returnFileSize(file.size)
    let image = document.getElementById('selected-image')
    image.src = URL.createObjectURL(file)
    image.classList.remove('hidden')
    document.querySelector('.img-name').innerHTML = file.name + '   ' + size
}

// Вычисление размера изображения
function returnFileSize(number) {
    if(number < 1024) {
        return number + ' байт';
    } else if(number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + ' Кб';
    } else if(number >= 1048576) {
        return (number / 1048576).toFixed(1) + ' Мб';
    }
}