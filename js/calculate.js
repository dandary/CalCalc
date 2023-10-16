const LOSS_WEIGHT_RATE = 0.15;
const GAIN_WEIGHT_RATE = 0.15;
const ActivityRate = {
    "min": 1.2,
    "low": 1.375,
    "medium": 1.55,
    "high": 1.725,
    "max": 1.9
};
const ValidParameter = {
    AGE_MIN: 0,
    AGE_MAX: 130,
    HEIGHT_MIN: 60,
    HEIGHT_MAX: 250,
    WEIGHT_MIN: 2,
    WEIGHT_MAX: 500
}
const age = document.querySelector("#age");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");
const genderMale = document.querySelector("#gender-male");
const activityMinimal = document.querySelector("#activity-minimal");
/**
 * очистка параметров
 */
const clearParameters = () => {
    age.value = "";
    height.value = "";
    weight.value = "";
    genderMale.checked = true;
    activityMinimal.checked = true;
}
/**
 * проверка на корректность введенных параметров
 * @returns {boolean}
 */
const isValidateParameters = () => {
    return age.value > ValidParameter.AGE_MIN && age.value < ValidParameter.AGE_MAX && height.value > ValidParameter.HEIGHT_MIN && height.value < ValidParameter.HEIGHT_MAX && weight.value > ValidParameter.WEIGHT_MIN && weight.value < ValidParameter.WEIGHT_MAX
}
/**
 * проверка заполненности всех параметров
 * @returns {boolean}
 */
const isFilledParameters = () => {
    return age.value && height.value && weight.value;
}
/**
 * проверка заполненности хотя бы одного параметра
 * @returns {boolean}
 */
const isExistParameter = () => {
    return age.value || height.value || weight.value;
}
/**
 * рассчитать норму калорий для мужчин
 * @returns {number}
 */
const getNormMale = () => {
    return (10 * parseInt(weight.value, 10) + (6.25 * parseInt(height.value, 10)) - (5 * parseInt(age.value, 10)) + 5);
}
/**
 * рассчитать норму калорий для женщин
 * @returns {number}
 */
const getNormFemale = () => {
    return (10 * parseInt(weight.value, 10) + (6.25 * parseInt(height.value, 10)) - (5 * parseInt(age.value, 10)) - 161);
}
const getNorm = () => {
    const genderMale = document.querySelector("#gender-male");
    if (genderMale.checked) {
        return getNormMale();
    }
    return getNormFemale();
}
/**
 * определение коэффициента активности
 * @returns {number}
 */
const getActivityRate = () => {
    const activityValue = document.querySelector('[name="activity"]:checked').value;
    return ActivityRate[activityValue];
}
/**
 * расчет калорий для поддержания веса
 * @returns {number}
 */
const getEnergyMaintainWeight = () => {
    return Math.round(getActivityRate() * getNorm());
}
/**
 * расчет калорий для снижения веса
 * @returns {number}
 */
const getEnergyLossWeight = () => {
    return Math.round(getEnergyMaintainWeight() - getEnergyMaintainWeight() * LOSS_WEIGHT_RATE);
}
/**
 * расчет калорий для набора веса
 * @returns {number}
 */
const getEnergyGainWeight = () => {
    return Math.round(getEnergyMaintainWeight() + getEnergyMaintainWeight() * GAIN_WEIGHT_RATE);
}

export {getEnergyMaintainWeight, getEnergyLossWeight, getEnergyGainWeight, isFilledParameters, isExistParameter, clearParameters, isValidateParameters}