/* Валидация параметров ввода (Mas_A, Mas_B, Matrix) */
function validateInput(Mas_A, Mas_B, Matrix) {
    let isValid = true;

    if (Mas_A.length !== new Set(Mas_A).size) {
        document.getElementById("result").innerHTML += "Массив A содержит повторения<br>";
        isValid = false;
    }

    if (Mas_B.length !== new Set(Mas_B).size) {
        document.getElementById("result").innerHTML += "Массив B содержит повторения<br>";
        isValid = false;
    }

    if (Matrix.length !== Mas_A.length) {
        document.getElementById("result").innerHTML += "Количество строк матрицы смежности не совпадает с размером массива A<br>";
        isValid = false;
    }

    const expectedColumnCount = Mas_B.length;

    for (let i = 0; i < Matrix.length; i++) {
        let row = Matrix[i].split(" ");
        if (row.length !== expectedColumnCount) {
            document.getElementById("result").innerHTML += "Неверное количество столбцов в строке " + (i + 1) + "<br>";
            isValid = false;
        }

        for (let j = 0; j < row.length; j++) {
            const element = row[j];
            console.log(element);
            if (!(element === "0" || element === "1")) {
                document.getElementById("result").innerHTML += "Матрица смежности должна содержать только 0 и 1<br>";
                isValid = false;
                break;
            }
        }
    }

    return isValid;
}

/* Проверка матрицы смежности на функцию */
function checkFunction(Mas_A, Mas_B, Matrix) {
    for (let j = 0; j < Mas_B.length; j++) {
        let count = 0;

        for (let i = 0; i < Matrix.length; i++) {
            const row = Matrix[i].split(" ");
            if (row[j] === "1") {
                count++;
            }
        }

        if (count > 1) {
            return false;
        }
    }
    return true;
}

/* Основная функция */
function main() {
    let Mas_A = document.getElementById("id_MasA").value.trim().split(" ");
    let Mas_B = document.getElementById("id_MasB").value.trim().split(" ");
    let Matrix = document.getElementById("id_Matrix").value.split("\n");

    document.getElementById("result").innerHTML = "Результат:<br>";

    if (!validateInput(Mas_A, Mas_B, Matrix)) {
        return;
    }

    if (checkFunction(Mas_A, Mas_B, Matrix)) {
        document.getElementById("result").innerHTML += "Матрица смежности является функцией";
    } else {
        document.getElementById("result").innerHTML += "Матрица смежности не является функцией";
    }
}
