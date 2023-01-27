export const OPERATIONS = {
    wash: { id: 2 }, //мойка
    changeProduction: { id: 3 }, //номер пр-ва
    sorting: { id: 4 }, //сортировка
    glue: { id: 5 }, //клей
    improve: { id: 6 }, //насыщение
    autoclave: { id: 7 }, //автоклав
    grindingEngraver: { id: 8 }, //Шлифование гравером
    formation: { id: 9 }, //кусанка
    turning: { id: 10 }, //обточка
    makeBall: { id: 11 }, //шарокрут
    makeSuperBall: { id: 12 }, //Докат
    grindingSuper: { id: 13 }, //Шлифование
    polishing: { id: 14 }, //Полировка
    slice: { id: 15 }, //Распил
    sale: { id: 16 }, //Отгрузка
    shareItems: { id: 17 }, //Перемещение
    mixingGrade: { id: 18 }, //Смешивание сорт
    sortingN: { id: 19 }, //сортировка насыщенный
    sortingA: { id: 20 }, //сортировка автоклавированого
    sortingB: { id: 21 }, //Сортировка заготовок
    glueBlank: { id: 22 }, //Клей заготовок
    sliceIk: { id: 23 }, //Распил ИК
    sortingLength: { id: 24 }, //Сортировка длин
    mixingSize: { id: 25 }, //Смешивание размер
    slicingBillets: { id: 26 }, //Распил заготовки
    drillingPill: { id: 27 }, //Сверление таблетки
    drilling: { id: 28 }, //Сверление
    grindingMsc: { id: 29 }, //Шифование МСК
    waterDrilling: { id: 30 }, //Сверление водой
    roughTumbling: { id: 31 }, //Грубая голтовка
    thermoLamp: { id: 32 }, //Термо (лампа)
    thermoOven: { id: 33 }, //Термо (печь)
    polishingMsc: { id: 34 }, //Полировка заготовки
    sortingElements: { id: 35 }, //Сортировка элементов
    makingMinalets: { id: 37 }, //Пр-во мин группы
    sortingPrunings: { id: 38 }, //Сортировка обрезков
    mixingLot: { id: 39 }, //Смешивание партия
    assemble: { id: 40 }, //Сборка
    takeApart: { id: 41 }, //Разобрать изделие
    mixingProduction: { id: 42 }, //Смешивание партия
};
export const STATE = {
    washed: { id: 1 },
    sorted: { id: 2 },
    glued: { id: 3 },
    improved: { id: 4 },
    autoclaved: { id: 5 },
    grindedEngraver: { id: 6 }, //шлифованный гравер
    formated: { id: 7 },
    turned: { id: 8 },
    balled: { id: 9 },
    makedSuperBall: { id: 10 },
    grindedSuper: { id: 11 },
    polished: { id: 12 },
    polishedS: { id: 34 },
    sliced: { id: 13 },
    stone: { id: 14 },
    sortedN: { id: 15 },
    sortedA: { id: 16 },
    gluedBlank: { id: 17 },
    calibratedIk: { id: 18 },
    sortedB: { id: 19 },
    sortedLength: { id: 20 },
    slicedBillets: { id: 21 },
    drilledPill: { id: 22 },
    drilled: { id: 23 },
    grindedMsc: { id: 24 },
    waterDrilled: { id: 25 },
    roughTumbled: { id: 26 },
    thermedLamp: { id: 27 },
    thermedOven: { id: 28 },
    polishedMsc: { id: 29 },
    sertedElements: { id: 30 },
    minaretFinishedElement: { id: 32 },
    mixed: { id: 34 },
    createdProduct: { id: 35 },
    prunings: { id: 37 },
};
export const WORKPIECETYPE = {
    stone: { id: 1 },
    losses: { id: 2 },
    garbage: { id: 3 },
    defect: { id: 4 },
    cylinder: { id: 12 }, //цилиндр
    bead: { id: 15 }, //бусина
    minaret: { id: 17 },
    prunes: { id: 23 }, //обрезки
};
export const GRADE = {
    mix: { id: 1 },
};
export const STORES = {
    Moscow: { id: 1 },
};

export const RESULTASSEMBLE = {
    chaplet: { id: 1 }, //четки
    beads: { id: 2 }, //бусы
};
