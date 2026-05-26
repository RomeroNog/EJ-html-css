function alternarSenha()
{
    var senhaInput = document.getElementById("password");
    if(senhaInput.type === "password") {
        senhaInput.type = "text";
    }
    else {
        senhaInput.type = "password";
    }
    if(document.getElementById("olho").src.includes("corte-de-olho.png"))
    {
        document.getElementById("olho").src = "imgLogin/olho_A.png";
    }
    else
    {
        document.getElementById("olho").src = "imgLogin/corte-de-olho.png";
    }
}

usuario = ["admin", "user", "guest"];
senha = ["123", "user123", "guest123"];

function validarLogin(e)
{
    e.preventDefault();
    var usernameInput = document.getElementById("username").value;
    var passwordInput = document.getElementById("password").value;
    for(var i = 0; i < usuario.length; i++)
    {
        if(usernameInput === usuario[i] && passwordInput === senha[i])
        {
            subirETransicionar();
            return;
        }
    }
    alert("Usuário ou senha incorretos. Tente novamente.");
}
function subirETransicionar() {
    var container = document.querySelector(".login-container");
    container.classList.add("sumir-para-cima");
    setTimeout
    (
        function() 
            {
            window.location.href = "index.html";
            },
         700
    );
}