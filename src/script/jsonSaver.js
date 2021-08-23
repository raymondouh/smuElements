const regionKeys = {
    "RU-MOW": "Москва",
    "RU-SPE": "Санкт-Петербург",
    "RU-NEN": "Ненецкий АО",
    "RU-YAR": "Ярославская область",
    "RU-CHE": "Челябинская область",
    "RU-ULY": "Ульяновская область",
    "RU-TYU": "Тюменская область",
    "RU-TUL": "Тульская область",
    "RU-SVE": "Свердловская область",
    "RU-RYA": "Рязанская область",
    "RU-ORL": "Орловская область",
    "RU-OMS": "Омская область",
    "RU-NGR": "Новгородская область",
    "RU-LIP": "Липецкая область",
    "RU-KRS": "Курская область",
    "RU-KGN": "Курганская область",
    "RU-KGD": "Калининградская область",
    "RU-IVA": "Ивановская область",
    "RU-BRY": "Брянская область",
    "RU-AST": "Астраханская область",
    "RU-KHA": "Хабаровский край",
    "RU-CE": "Чеченская республика",
    "RU-UD": "Удмуртская республика",
    "RU-SE": "Республика Северная Осетия",
    "RU-MO": "Республика Мордовия",
    "RU-KR": "Республика  Карелия",
    "RU-KL": "Республика  Калмыкия",
    "RU-IN": "Республика  Ингушетия",
    "RU-AL": "Республика Алтай",
    "RU-BA": "Республика Башкортостан",
    "RU-AD": "Республика Адыгея",
    "RU-CR": "Республика Крым",
    "RU-SEV": "Севастополь",
    "RU-KO": "Республика Коми",
    "RU-KIR": "Кировская область",
    "RU-PNZ": "Пензенская область",
    "RU-TAM": "Тамбовская область",
    "RU-MUR": "Мурманская область",
    "RU-LEN": "Ленинградская область",
    "RU-VLG": "Вологодская область",
    "RU-KOS": "Костромская область",
    "RU-PSK": "Псковская область",
    "RU-ARK": "Архангельская область",
    "RU-YAN": "Ямало-Ненецкий АО",
    "RU-CHU": "Чукотский АО",
    "RU-YEV": "Еврейская автономская область",
    "RU-TY": "Республика Тыва",
    "RU-SAK": "Сахалинская область",
    "RU-AMU": "Амурская область",
    "RU-BU": "Республика Бурятия",
    "RU-KK": "Республика Хакасия",
    "RU-KEM": "Кемеровская область",
    "RU-NVS": "Новосибирская область",
    "RU-ALT": "Алтайский край",
    "RU-DA": "Республика Дагестан",
    "RU-STA": "Ставропольский край",
    "RU-KB": "Кабардино-Балкарская республика",
    "RU-KC": "Карачаевая-Черкесская республика",
    "RU-KDA": "Краснодарский край",
    "RU-ROS": "Ростовская область",
    "RU-SAM": "Самарская область",
    "RU-TA": "Республика Татарстан",
    "RU-ME": "Республика Марий Эл",
    "RU-CU": "Чувашская республика",
    "RU-NIZ": "Нижегородская область",
    "RU-VLA": "Владимировская область",
    "RU-MOS": "Московская область",
    "RU-KLU": "Калужская область",
    "RU-BEL": "Белгородская область",
    "RU-ZAB": "Забайкальский край",
    "RU-PRI": "Приморский край",
    "RU-KAM": "Камачатский край",
    "RU-MAG": "Магаданская область",
    "RU-SA": "Республика Саха",
    "RU-KYA": "Красноярский край",
    "RU-ORE": "Оренбургская область",
    "RU-SAR": "Саратовская область",
    "RU-VGG": "Волгоградская область",
    "RU-VOR": "Ставропольский край",
    "RU-SMO": "Смоленская область",
    "RU-TVE": "Тверская область",
    "RU-PER": "Пермская область",
    "RU-KHM": "Ханты-Мансийский АО",
    "RU-TOM": "Томская область",
    "RU-IRK": "Иркутская область"
};
let smuByRegion = {};

let ids = {};
let imgs = {};
let names = {};
let grntis = {};
let grntiSfields = {};
let chairmans = {};

let globalSmuId = 0;
let globalChairmanId = 0;
let globalPetrovId = 0;

function jsonSaver() {
    smuByRegion = createJsonWithIds(regionKeys);
    getAllbyRegion(smuByRegion);
    save(smuByRegion, "smu_by_region.json");
    save(createJsonWithKeyAndIds(smuByRegion, createContactInfoObject), "contact-info.json");
    save(createJsonWithKeyAndIds(smuByRegion, createdClosestActivitiesObject), "closest-activities.json");
    save(createJsonWithKeyAndIds(smuByRegion, createReleasedProjectsObject), "released-projects.json");
    save(createJsonWithKeyAndIds(smuByRegion, createSmuStaffObject), "smu-staff.json");
}

function save(jsonObject, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(jsonObject, null, 2)], {
        type: "text/plain"
    }));
    a.setAttribute("download", name);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function createJsonWithIds(object) {
    let objectTorelease = {};
    for (const [key, region] of Object.entries(object)) {
        objectTorelease[key] = createSmuArray(region)
    }
    return objectTorelease;
}

function createJsonWithKeyAndIds(object, func) {
    let objectTorelease = {};
    for (const [key, region] of Object.entries(object)) {
        objectTorelease[key] = func(key);
    }
    console.log(objectTorelease);
    return objectTorelease;
}

function createSmuArray(region) {
    let smuNames = ["Sigma", "Alpha", "Gamma", "Tetta", "Delta"];
    let imgNames = ["sigma.png", "alpha.png", "gamma.png", "tetta.png", "delta.png"];
    let grnti = ["76.31.31", "34.03.23"];
    let grntiSfield = ["ФАРМАКОГНОЗИЯ", "БИОИНФОРМАТИКА"];
    let shortAbout = "Научная группа работает под руководством ведущих ученых в области биофизики, иммунологии, биоинформатики последовательностей (в том числе анализа данных NGS), молекулярной биологии и генетики. Команда компании BostonGene активно поддерживает научную группу.";
    let chairman = "Владислав Иванов";
    let smuArray = [];

    for (var i = 0; i < smuNames.length; i++) {
        for (var j = 0; j < randNum(1, 5); j++) {
            let grninum = randNum(0, 1);
            globalSmuId++;
            globalChairmanId++;
            let smu = {
                "id": globalSmuId,
                "name": smuNames[i] + ' ' + add(j) + ' ' + region,
                "chairman": chairman + ' ' + globalChairmanId,
                "shortAbout": shortAbout,
                "grntiNumber": grnti[grninum],
                "grntiSciField": grntiSfield[grninum],
                "imgName": imgNames[i]
            }
            smuArray.push(smu);
        }
    }
    return smuArray;
}

function createContactInfoArray(key, lkey) {
    let name = names[key][lkey];
    let imgName = imgs[key][lkey];
    let region = regionKeys[key];

    let locationLink = "https://go.2gis.com/099at8";
    let location = "адрес сму";
    let phoneNum = "+7(815)221-35-36";
    let email = "contact@mgtu.ru";
    let website = "mgtu.ru";
    let description = "Научная группа работает под руководством ведущих ученых в области биофизики, иммунологии, биоинформатики последовательностей (в том числе анализа данных NGS), молекулярной биологии и генетики. Команда компании BostonGene активно поддерживает научную группу по всем перспективным направлениям, включая совместную работу над публикациями в высокорейтинговых зарубежных журналах. В команде исследователей и разработчиков – пять докторов наук, врачи из ведущих онкологических клиник";
    let lgrntis = grntis[key][lkey];
    let lgrntiSfields = grntiSfields[key][lkey];

    let res = {
        "name": name,
        "imgName": imgName,
        "region": region,
        "locationLink": locationLink,
        "location": location,
        "phoneNum": phoneNum,
        "email": email,
        "website": website,
        "description": description,
        "grntiNumber": lgrntis,
        "grntiSciField": lgrntiSfields,
    }
    return res;
}

function createdClosestActivitiesArray() {
    let conferences = [];
    let names = ["Научная конференция 1", "Научная конференция 2"];
    let date = "22 апреля - 24 апреля";
    let description =  "Приглашаем исследователей принять участие в конкурсе научно-технологических проектов и стартапов по реальным технологическим запросам промышленных предприятий Мурманской области. Конкурс «ТЕХНОВЫЗОВ» проводится при поддержке Правительства Мурманской области";
    let imgName = "smu-conference.png";
    for (var i = 0; i < 2; i++) {
        let conference = {
            "name": names[i],
            "date": date,
            "description": description,
            "imgName":imgName
        }
        conferences.push(conference);
    }
    return conferences;
}

function createReleasedProjectsArray() {
    let projects = [];
    let names = ["Проект 1", "Проект 2", "Проект 3", "Проект 4"];
    let description =  "Batch effect наблюдается, когда на результаты эксперимента влияют какие-то небиологические факторы, например разные запуски секвенатора или обработка контрольных и опытных образов по отдельности. Такие эффекты приводят к неточным выводам, если их причины коррелируют с интересующими результатами эксперимента.";
    let imgName =  "smu-project.png";
    for (var i = 0; i < 4; i++) {
        let project = {
            "name": names[i],
            "description": description,
            "imgName":imgName
        }
        projects.push(project);
    }
    return projects;
}

function createSmuStaffArray(key, lkey) {
    let scienceID = "Science-ID";
    let staff = [];
    let chairmanName = chairmans[key][lkey];
    let chairmanPosition = "Председатель СМУ";
    let chairmanEmail = "vlad@mgtu.ru";
    let chairmanImg = "ivanov.png";

    let name =  "Иван Петров";
    let positio = "Первый помощник председателя";
    let email = "petrov@mgtu.ru";
    let imgName =  "petrov.png";

    let chairman = {
        "name": chairmanName,
        "position": chairmanPosition,
        "email": chairmanEmail,
        "scienceID": scienceID,
        "imgName": chairmanImg
    }
    staff.push(chairman);

    for (var i = 0; i < randNum(2, 20); i++) {
        globalPetrovId++
        let petrov = {
            "name": name + ' ' + globalPetrovId,
            "position": positio,
            "email": email,
            "scienceID": scienceID,
            "imgName": imgName
        }
        staff.push(petrov);
    }
    return staff;
}

function createContactInfoObject(key) {
    let temp = ids[key];
    let res = {};
    for (const [lkey, item] of Object.entries(temp)) {
        res[lkey] = createContactInfoArray(key, lkey);
    }
    //console.log(res);
    return res;
}

function createdClosestActivitiesObject(key) {
    let temp = ids[key];
    let res = {};
    for (const [lkey, item] of Object.entries(temp)) {
        res[lkey] = createdClosestActivitiesArray();
    }
    //console.log(res);
    return res;
}

function createReleasedProjectsObject(key) {
    let temp = ids[key];
    let res = {};
    for( const [lkey, item] of Object.entries(temp)) {
        res[lkey] = createReleasedProjectsArray();
    }
    //console.log(res);
    return res;
}

function createSmuStaffObject(key) {
    let temp = ids[key];
    let res = {};
    for (const [lkey, item] of Object.entries(temp)) {
        res[lkey] = createSmuStaffArray(key, lkey);
    }
    //console.log(res);
    return res;
}

function getAllbyRegion(object) {
    for (const [key, region] of Object.entries(object)) {
        ids[key] = getIds(region);
        imgs[key] = getImgs(region);
        names[key] = getNames(region);
        grntis[key] = getGrntis(region);
        grntiSfields[key] = getGrntiSfields(region);
        chairmans[key] = getChairmans(region);
    }
}

function getIds(regionArray) {
    let res ={}
    for (var i = 0; i < regionArray.length; i++) {
        res[regionArray[i].id] = regionArray[i].id;
    }
    return res;
}

function getImgs(regionArray) {
    let res ={}
    for (var i = 0; i < regionArray.length; i++) {
        res[regionArray[i].id] = regionArray[i].imgName;
    }
    return res;
}

function getNames(regionArray) {
    let res ={}
    for (var i = 0; i < regionArray.length; i++) {
        res[regionArray[i].id] = regionArray[i].name;
    }
    return res;
}

function getGrntis(regionArray) {
    let res ={}
    for (var i = 0; i < regionArray.length; i++) {
        res[regionArray[i].id] = regionArray[i].grntiNumber;
    }
    return res;
}

function getGrntiSfields(regionArray) {
    let res ={}
    for (var i = 0; i < regionArray.length; i++) {
        res[regionArray[i].id] = regionArray[i].grntiSciField;
    }
    return res;
}

function getChairmans(regionArray) {
    let res ={}
    for (var i = 0; i < regionArray.length; i++) {
        res[regionArray[i].id] = regionArray[i].chairman;
    }
    return res;
}

function randNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function add(number, add = 1) {
    return number + add;
}
