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
            typer.textContent = commandHistory[historyIndex]
        }
    }
}