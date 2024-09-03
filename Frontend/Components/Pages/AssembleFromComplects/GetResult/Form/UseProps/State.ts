import { Field } from '../../../../../Helpers/classes';

export class State {
    variantAssemble = new Field('variantAssemble', 'Обязательное поле');
    typeBillet = new Field('typeBillet', 'Обязательное поле');
    typeAssemble = new Field('typeAssemble', 'Обязательное поле');
    color = new Field('color', 'Обязательное поле');
    yarn = new Field('yarn', 'Обязательное поле');
    grade = new Field('grade', 'Обязательное поле');
    length = new Field('length', 'Обязательное поле');
    widthIn = new Field('widthIn', 'Обязательное поле');
    countItemIn = new Field('countItemIn', 'Обязательное поле');
    losses = new Field('losses', 'Обязательное поле');
    manager = new Field('managerId', 'Обязательное поле');
    constructor({
        gradeId,
        colorId,
        typeAssembleId,
    }: {
        gradeId?: number;
        colorId?: number;
        typeAssembleId?: number;
    }) {
        const getValue = (v: any) => (v ? `${v}` : '');
        this.countItemIn.value = '1';
        this.grade.value = getValue(gradeId);
        this.color.value = getValue(colorId);
        this.typeAssemble.value = getValue(typeAssembleId);
    }
}
