/**
 * Валидация параметров ввода
 * @param masA
 * @param masB
 * @param masOfMas
 */
function validateElement(masA, masB, masOfMas) {
  let isValid = true;

  if (masA.length != new Set(masA).size) {
    document.getElementById("result").innerHTML +=
      "Массив X содержит повторения <br>";
    isValid = false;
  }

  if (masB.length != new Set(masB).size) {
    document.getElementById("result").innerHTML +=
      "Массив Y содержит повторения <br>";
    isValid = false;
  }

  if (masOfMas.length != masB.length) {
    document.getElementById("result").innerHTML +=
      "Количество строк матрицы смежности не совпадает с массивами <br>";
    isValid = false;
  }

  if (masOfMas[0].split(" ").length != masA.length) {
    document.getElementById("result").innerHTML +=
      "Количество столбцов матрицы смежности не совпадает с массивами <br>";
    isValid = false;
  }
  let isNum = true;
  for (let i = 0; i < masOfMas.length; ++i) {
    let elem = masOfMas[i].split(" ");
    if (elem.length != masA.length) {
      document.getElementById("result").innerHTML +=
        "Неверное количество элементов в " + (i + 1) + " строке <br>";
      isValid = false;
    }
    if (isNum) {
      for (let sym of elem) {
        if (!(sym == 0 || sym == 1)) {
          document.getElementById("result").innerHTML +=
            "Матрица смежности должна содержать только 0 и 1 <br>";
          isNum = false;
          isValid = false;
          break;
        }
      }
    }
  }

  return isValid;
}

/**
 * Проверка, являются ли отношения функцией
 * @param masA
 * @param masB
 * @param masOfMas
 * @param type
 */
function check(masA, masB, masOfMas, type) {
  let mp = new Map();
  let isFunction = true;
  let x = 0;
  let y = 0;
  for (let i = 0; i < masOfMas.length; ++i) {
    let elem = masOfMas[i].split(" ");
    for (let j = 0; j < elem.length; ++j) {
      if (type == "AB") (x = j), (y = i);
      else (x = i), (y = j);
      if (elem[j] == 1) {
        if (mp.has(masA[x]) == 0) mp.set(masA[x], new Set());
        mp.get(masA[x]).add(masB[y]);
        if (mp.get(masA[x]).size > 1) {
          isFunction = false;
        }
      }
    }
  }

  if (isFunction)
    for (let elem of mp.keys()) {
      if (mp.get(elem).size != 1) {
        isFunction = false;
        break;
      }
    }
  return isFunction;
}

/**
 * Основная функция
 */
function main() {
  let masA = document.getElementById("id_masA").value;
  let masB = document.getElementById("id_masB").value;
  let masOfMas = document.getElementById("id_masOfMas").value;
  // Проверка на типы данных
  if (
    !Array.isArray(masA) ||
    !Array.isArray(masB) ||
    !Array.isArray(masOfMas)
  ) {
    document.getElementById("result").innerHTML = "Неверный тип данных";
    return;
  }
  for (let i = 0; i < masOfMas.length; i++) {
    if (!Array.isArray(masOfMas[i])) {
      document.getElementById("result").innerHTML = "Неверный тип данных";
      return;
    }
    for (let j = 0; j < masOfMas[i].length; j++) {
      if (
        typeof masOfMas[i][j] !== "number" ||
        (masOfMas[i][j] !== 0 && masOfMas[i][j] !== 1)
      ) {
        document.getElementById("result").innerHTML = "Неверный тип данных";
        return;
      }
    }
  }
  document.getElementById("result").innerHTML = "Результат: <br>";
  masA = masA.split(" ");
  masB = masB.split(" ");
  masOfMas = masOfMas.split("\n");
  let IsFunction = true;

  if (!validateElement(masA, masB, masOfMas)) {
    return;
  }

  for (let i = 0; i < 2; ++i) {
    if (i == 1) {
      IsFunction = check(masA, masB, masOfMas, "BA");
      document.getElementById("result").innerHTML += "B -> A";
    } else {
      IsFunction = check(masB, masA, masOfMas, "AB");
      document.getElementById("result").innerHTML += "A -> B";
    }
    document.getElementById("result").innerHTML += " отношения ";
    if (!IsFunction) document.getElementById("result").innerHTML += "не ";
    document.getElementById("result").innerHTML += "являются функцией <br>";
  }
  masA = null;
  masB = null;
  masOfMas = null;
}
