import {
    clearParameters,
    getEnergyGainWeight,
    getEnergyLossWeight,
    getEnergyMaintainWeight,
    isExistParameter,
    isFilledParameters,
    isValidateParameters
} from "./calculate.js";
import {showAlert} from "./alert.js";

const MESSAGE_ERROR_FIELD = "не определено";
const buttonCalculateElement = document.querySelector(".form__submit-button");
const counterResultFormElement = document.querySelector(".counter__result");
const fieldEnergyNormElement = counterResultFormElement.querySelector("#calories-norm");
const fieldEnergyMinimalElement = counterResultFormElement.querySelector("#calories-minimal");
const fieldEnergyMaximalElement = counterResultFormElement.querySelector("#calories-maximal");
const resetButtonElement = document.querySelector(".form__reset-button");

/**
 * включаем кнопку Рассчитать при заполненных параметрах
 * @param evt
 */
const inputsGroupChangeHandler = function (evt) {
    if (evt.target.nodeName === "INPUT" && isFilledParameters()) {
        buttonCalculateElement.disabled = false;
    }
}
/**
 * после проверки рассчитываем нормы калорий или указываем ошибку
 * @param evt
 */
const buttonCalculateClickHandler = function (evt) {
    evt.preventDefault();
    if (isFilledParameters() && isValidateParameters()) {
        fieldEnergyNormElement.textContent = getEnergyMaintainWeight().toLocaleString();
        fieldEnergyMinimalElement.textContent = getEnergyLossWeight().toLocaleString();
        fieldEnergyMaximalElement.textContent = getEnergyGainWeight().toLocaleString();
    } else {
        showAlert("заполните все параметры: возраст (в годах), рост(в см), вес(в кг)");
        fieldEnergyNormElement.textContent = MESSAGE_ERROR_FIELD;
        fieldEnergyMinimalElement.textContent = MESSAGE_ERROR_FIELD;
        fieldEnergyMaximalElement.textContent = MESSAGE_ERROR_FIELD;
    }
    counterResultFormElement.classList.remove("counter__result--hidden");
}

/**
 * включаем кнопку Очистить при изменении любого параметра
 * @param evt
 */
const inputGroupForResetChangeHandler = function (evt) {
    if (evt.target.nodeName === "INPUT" && isExistParameter()) {
        resetButtonElement.disabled = false;
    }
}

/**
 * отключаем кнопки расчета и очистки, убираем форму результата, чистим параметры
 */
const resetButtonClickHandler = function () {
    buttonCalculateElement.disabled = true;
    resetButtonElement.disabled = true;
    counterResultFormElement.classList.add("counter__result--hidden");
    clearParameters();
}

export {inputsGroupChangeHandler, buttonCalculateClickHandler, inputGroupForResetChangeHandler, resetButtonClickHandler};