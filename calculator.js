// 모듈 설정
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

// 덧셈 함수
function add(operand1, operand2) {
    return operand1 + operand2
}

// 뺄셈 함수
function subtract(operand1, operand2) {
    return operand1 - operand2
}

// 곱셈 함수
function multiply(operand1, operand2) {
    return operand1 * operand2
}

// 나눗셈 함수
function divide(operand1, operand2) { 
    // 0 나누기 예외
    if (operand2 == 0) {
        throw "Division by zero error"
    }
    return operand1 / operand2
}

// 연산 분기
function calculate(operand1, operand2, operator) {
    switch (operator) {
        case "+":
            return add(operand1, operand2)
        case "-":
            return subtract(operand1, operand2)
        case "*":
            return multiply(operand1, operand2)
        case "/":
            return divide(operand1, operand2)
        default:
            throw "Invalid operator"
  }
}

// 메인 루프
async function run() {
    // 초기값 입력
    let input1 = await rl.question("Enter the first operand: ")
    let currentResult = Number(input1)

    // 초기값 숫자 검증
    if (isNaN(currentResult) || input1.trim() === "") {
        console.log("Error: Invalid number input")
        rl.close()
        return
    }

    // 연속 계산
    while (true) {
        // 연산자 입력 및 검증
        let operator = await rl.question("Enter the operator (+, -, *, /): ")
        
        if (operator !== "+" && operator !== "-" && operator !== "*" && operator !== "/") {
            console.log("Error: Invalid operator")
            continue
        }

        // 다음 숫자 입력
        let input2 = await rl.question("Enter the next operand: ")
        let operand2 = Number(input2)
        
        // 다음 숫자 검증
        if (isNaN(operand2) || input2.trim() === "") {
            console.log("Error: Invalid number input")
            continue
        }

        // 계산 및 결과 갱신
        try {
            let result = calculate(currentResult, operand2, operator)
            currentResult = result
            console.log("Result: " + currentResult)
        } catch (error) {
            // 에러 출력
            console.log("Error: " + error)
        }
    }
}

// 프로그램 실행
run();