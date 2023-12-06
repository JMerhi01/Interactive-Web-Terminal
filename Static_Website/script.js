let commandHistory = [];
let historyIndex = -1;
let secretAttempts = 0;
let isEnteringSecret = false;

function handleInput(event) {
    let texter = document.getElementById('texter');
    let typer = document.getElementById('typer');
    let terminalOutput = document.getElementById('terminal-output');

    typer.textContent = texter.value;

    if (event.key === 'Enter') {
        let command = texter.value.trim();
        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;

            if (isEnteringSecret) {
                handleSecretPassword(command);
            } else {
                terminalOutput.innerHTML += `<p>visitor@jmerhi.com:~$ ${command}</p>`;
                if (command.toLowerCase() === 'secret') {
                    if (secretAttempts < 3) {
                        terminalOutput.innerHTML += `<p>Enter the secret password:</p>`;
                        isEnteringSecret = true;
                    } else {
                        terminalOutput.innerHTML += `<p>Secret command locked out. Try again later.</p>`;
                        secretAttempts = 0;
                        isEnteringSecret = false;
                    }
                } else {
                    executeCommand(command);
                }
            }

            texter.value = '';
            typer.textContent = '';
            scrollTerminalOutputToEnd();
        }
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        if (!isEnteringSecret && commandHistory.length) {
            if (event.key === 'ArrowUp' && historyIndex > 0) historyIndex--;
            else if (event.key === 'ArrowDown' && historyIndex < commandHistory.length - 1) historyIndex++;

            texter.value = commandHistory[historyIndex];
            typer.textContent = commandHistory[historyIndex];
        }
    }
}

function handleSecretPassword(command) {
    let terminalOutput = document.getElementById('terminal-output');
    if (command === "123") {
        terminalOutput.innerHTML += `<p>Correct password. Authentication successful!</p>`;
        terminalOutput.innerHTML += `<p>01000100 01100101 01100110 01101001 01101110 01101001 01110100 01100101 01101100 01111001 01110011 01101000 01101111 01110101 01101100 01100100 01101000 01100001 01110110 01100101 01110011 01110100 01110101 01100011 01101011 01110111 01101001 01110100 01101000 01010011 01010011 01001000 00101110</p>`;
        isEnteringSecret = false;
        secretAttempts = 0;
    } else {
        secretAttempts++;
        if (secretAttempts < 3) {
            terminalOutput.innerHTML += `<p>Incorrect password. Try again:</p>`;
        } else {
            terminalOutput.innerHTML += `<p>Incorrect password. Secret command locked out. Try again later.</p>`;
            isEnteringSecret = false;
            secretAttempts = 0;
        }
    }
}

function executeCommand(command) {
    let terminalOutput = document.getElementById('terminal-output');
    switch (command.toLowerCase()) {
        case 'help':
            terminalOutput.innerHTML += `<p>Available commands: aboutme, showcv, github, secret, clear</p>`;
            break;
        case 'aboutme':
            terminalOutput.innerHTML += `<p>Hello! My name is Jaafar, I'm a DevOps engineer pursuing a dynamic career, specializing in automation and creating efficient pipelines. Check out my GitHub to have a glimpse of my journey.</p>`;
            break;
        case 'github':
            window.open('https://github.com/JMerhi01', '_blank');
            break;
        case 'showcv':
            window.open('showcv.html', '_blank');
            break;
        case 'clear':
            terminalOutput.innerHTML = '';
            break;
        default:
            terminalOutput.innerHTML += `<p>bash: ${command}: command not found</p>`;
            break;
    }
}

function scrollTerminalOutputToEnd() {
    let terminalOutput = document.getElementById('terminal-output');
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}
function focusOnTerminal() {
    document.getElementById('texter').focus();
}

window.onload = function() {
    focusOnTerminal();
}

function updateVisitorCount() {
    fetch('#####') // This is where API URL goes (db)
        .then(response => response.json())
        .then(data => {
            document.getElementById('visitor-number').textContent = data.count;
        })
        .catch(error => console.error('Error fetching visitor count:', error));
}

window.onload = function() {
    focusOnTerminal();
    updateVisitorCount(); 
}