//inicializa var global para usar com setInterval e clearInterval
var timeOut;

window.onload = function() {
    //inicializa variaveis display, inicio contadores, botões mais e menos, minutos, segundos
    var descansoDisplay = document.querySelector('.descanso-display');
    var pomDisplay = document.querySelector('.pom-display');
    var start = document.querySelector('.start');
    var startDescanso = document.querySelector('.startDescanso');
    var reset = document.querySelector('.reset');
    var mais = document.querySelectorAll('.mais');
    var menos = document.querySelectorAll('.menos');
    var pomodoro = document.querySelector('.pomodoro');
    var tempoLivre = document.querySelector('.descanso');
    pomodoro.innerHTML = 25;
    tempoLivre.innerHTML = 5
    var pomodoroMinutos = pomodoro.textContent;
    var descansoMinutos = tempoLivre.textContent;
    var pomodoroCount = 0;
    var pomodoroTotal = 0;
    var d = new Date().getDate();    

    //botões menos e mais

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

     //contadores, timer, alarme

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
                //limpa tempo do pomodoro e limpa display da sessão
                tocarAlarme();                               
                clearInterval(timeOut);
                pomDisplay.style.display = 'none'; 
                //conta apenas pomodoro padrão de 25 min
                if (pomodoroMinutos == 25) {          
                pomodoroCount += 1;
                }
                //considerando qualquer tamanho de sessão para a contagem total
                pomodoroTotal += 1;                
                if (pomodoroCount == 4) {
                    popomodoroCount = 0;
                    var res = window.confirm("Realizar um descanso de 10 minutos?");
                    if (res != false) {
                        descansoMinutos = 10;
                        tempoLivre.innerHTML = 10
                        descansoCountDown();
                    }  else {
                        window.location.reload(true);
                    }
                }                
                dAgr = new Date().getDate();  
                //se o dia mudar, mostra total do ultimo dia e reseta o contador 
                if (d != dAgr) {
                    alert("O total de pomodoros de qualquer duração realizados no último dia foi: " + pomodoroTotal);
                    pomodoroTotal = 0;                    
                }                
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
                tocarAlarme();   
                clearInterval(timeOut);
            }
        }
    }

    //botões start, descanso e reset

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
        reset.style.display = 'inline-block';        
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
        reset.style.display = 'inline-block';            
        descansoCountDown();
    });

    reset.addEventListener('click', function() {
        //recarrega pagina
        window.location.reload(true);
    });

    function tocarAlarme() {
        var alarmValue = document.getElementById('alarm_select').value;    
        var alarmAudio = document.getElementById(alarmValue);
        alarmAudio.play();
    }
}

