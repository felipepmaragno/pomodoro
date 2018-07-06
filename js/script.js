//inicializa var global para usar com setInterval e clearInterval
var timeOut;

window.onload = function() {
    var descansoDisplay = document.querySelector('.descanso-display');
    var pomDisplay = document.querySelector('.pom-display');
    var start = document.querySelector('.start');
    var startDescanso = document.querySelector('.startDescanso');

    var mais = document.querySelectorAll('.mais');
    var menos = document.querySelectorAll('.menos');

    var pomodoro = document.querySelector('.pomodoro');
    var tempoLivre = document.querySelector('.descanso');
    pomodoro.innerHTML = 25;
    tempoLivre.innerHTML = 5
    var pomodoroMinutos = pomodoro.textContent;
    var descansoMinutos = tempoLivre.textContent;

    mais.forEach(function(elem) {
        //adiciona listener para cada um, e faz a ação
        elem.addEventListener('click', function() {
            if (elem.classList.contains("tempo-descanso")) {
                //Atualiza descansoMinutos conforme valor
                var descNum = Number(tempoLivre.innerText);
                tempoLivre.textContent = descNum + 1;                
                descansoMinutos = tempoLivre.textContent;
            } else if (elem.classList.contains("tempo_pomo")) {
                //Atualiza pomodoroMinutos conforme valor
                var pomNum = Number(pomodoro.innerText);
                pomodoro.textContent = pomNum + 1;                
                pomodoroMinutos = pomodoro.textContent;
            }
        });
    });

    menos.forEach(function(elem) {        
        //adiciona listener para cada um, e faz a ação
        elem.addEventListener('click', function() {
            if (elem.classList.contains("tempo-descanso")) {
                //Atualiza descansoMinutos conforme valor
                var descNum = Number(tempoLivre.innerText);
                if (descNum > 1) {
                    tempoLivre.textContent = descNum - 1;
                }
                descansoMinutos = tempoLivre.textContent;
            } else if (elem.classList.contains("tempo_pomo")) {
                //Atualiza pomodoroMinutos conforme valor
                var pomNum = Number(pomodoro.innerText);
                if (pomNum > 1) {
                    pomodoro.textContent = pomNum - 1;
                }
                pomodoroMinutos = pomodoro.textContent;
            }
        });
    });

    function pomodoroCountDown() {
        var minutes = pomodoroMinutos - 1;
        var seconds = 60;
        //var total -> tempo total em segs
        var total = (minutes * 60) + seconds;
        timeOut = setInterval(timer, 1000);

        function timer() {
            seconds = seconds - 1;
            total = total - 1;
            if (seconds === -1) {
                minutes = minutes - 1;
                seconds = 59;
            }
            var display = document.querySelector('.tempo-display');
            display.innerHTML = (minutes < 10 ? "0" + minutes.toString() : minutes) + ':' + (seconds < 10 ? "0" + seconds.toString() : seconds);
            if (total === 0) {                                
                clearInterval(timeOut);
                pomDisplay.style.display = 'none';                 
            }
        }
    }

    function descansoCountDown() {
        var minutes = descansoMinutos - 1;
        var seconds = 60;        
        //var total -> tempo total em segs
        var total = (minutes * 60) + seconds;
        descansoDisplay.style.display = 'inline-block';
        pomDisplay.style.display = 'none';                
        timeOut = setInterval(timer, 1000);

        function timer() {
            seconds = seconds - 1;
            total = total - 1;
            if (seconds === -1) {
                minutes = minutes - 1;
                seconds = 59;
            }
            var display = document.querySelector('.tempo-display');
            display.innerHTML = (minutes < 10 ? "0" + minutes.toString() : minutes) + ':' + (seconds < 10 ? "0" + seconds.toString() : seconds);
            if (total === 0) {
                //limpa tempo descanso 
                clearInterval(timeOut);
            }
        }
    }

    start.addEventListener('click', function() {
        //esconde botões + e - quando inicia
        menos.forEach(function(elem) {
            elem.style.display = 'none';
        });
        mais.forEach(function(elem) {
            elem.style.display = 'none';
        });
        //só mostra tempo e reiniciar
        descansoDisplay.style.display = 'none';
        start.style.display = 'none';
        startDescanso.style.display = 'none';    
        pomodoroCountDown();
    });

    startDescanso.addEventListener('click', function() {
        //esconde botões + e - quando inicia
        menos.forEach(function(elem) {
            elem.style.display = 'none';
        });
        mais.forEach(function(elem) {
            elem.style.display = 'none';
        });
        //só mostra tempo e reiniciar
        descansoDisplay.style.display = 'none';
        start.style.display = 'none';
        startDescanso.style.display = 'none';        
        descansoCountDown();
    });


}

