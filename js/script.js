//inicializa var global para usar com setInterval e clearInterval
var timeOut;

window.onload = function() {
    var descansoDisplay = document.querySelector('.descanso-display');
    var pomDisplay = document.querySelector('.pom-display');
    var start = document.querySelector('.start');
    var startDescanso = document.querySelector('.startDescanso');

    var pomodoro = document.querySelector('.pomodoro');
    var tempoLivre = document.querySelector('.descanso');
    pomodoro.innerHTML = 25;
    tempoLivre.innerHTML = 5
    var pomodoroMinutos = pomodoro.textContent;
    var descansoMinutos = tempoLivre.textContent;

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
        
        descansoDisplay.style.display = 'none';
        start.style.display = 'none';
        startDescanso.style.display = 'none';    
        pomodoroCountDown();
    });

    startDescanso.addEventListener('click', function() {
        
        descansoDisplay.style.display = 'none';
        start.style.display = 'none';
        startDescanso.style.display = 'none';    
        descansoCountDown();
    });

}

