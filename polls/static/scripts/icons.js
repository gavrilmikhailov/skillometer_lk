
// Ссылки на иконки направлений
let directionIcons = [
    "/static/assets/direction_icon_1.svg",
    "/static/assets/direction_icon_2.svg",
    "/static/assets/direction_icon_3.svg",
    "/static/assets/direction_icon_4.svg",
    "/static/assets/direction_icon_5.svg",
    "/static/assets/direction_icon_6.svg",
    "/static/assets/direction_icon_7.svg"
]

// Названия направлений
let directions = [
    'Естественно-научные',
    'Инженерные и ИТ',
    'Предпринимательские',
    'Социально-общественные',
    'Творчество',
    'Физкультурно-спортивные',
    'Языковые'
]

// Поиск и возврат иконки по названию направления
function directionIconGenerator(sender, direction) {
    let iconIndex = directions.findIndex(dir => dir === direction)
    if (iconIndex !== null) {
        if (sender !== null) sender.setAttribute('src', directionIcons[iconIndex])
        console.log(directionIcons[iconIndex])
        return directionIcons[iconIndex]
    }
    return null
}