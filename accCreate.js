
$(function(){
    /////////// Account SIGNUP form (Stored in Database) /////////////////////////////////
    
    document.getElementById('btn-create').addEventListener('click', function() {
    
        let name = document.getElementById('username').value.trim();
        let num = document.getElementById('password').value.trim();
        let mail = document.getElementById('email').value.trim();
    
        let at = mail.includes("@");
        let end = mail.includes(".com", ".edu");
        if (username.length === 0 || mail.length === 0 || password.length === 0) {
            alert("Please fill in all fields.");
        } else if (at != true || end != true) {
            alert("Please enter a valid Email.");
        }
        else {
            const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
            const appendAlert = (message, type) => {
            const wrapper = document.createElement('div')
            wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
            ].join('')
        
            alertPlaceholder.append(wrapper)
            }
    
            const alertTrigger = document.getElementById('btn-create')
            if (alertTrigger) {
                alertTrigger.addEventListener('click', () => {
                appendAlert('Sign-up successful! Welcome to the "Insperation Nation" ', 'dark')
                })
                /////////// Account SIGNUP form (Stored in Database) /////////////////////////////////

                $("form").submit(function(){
                    const data = {
                        username: $("#username").val(),
                        password: $("#password").val(),
                        email: $("#email").val()
                    ///phonenum: $("#number").val()
                    }

                    $.post( "/api/users/create", data, function( data ) {
                        console.log("Succsseful sign-up!");
                    });
                    return false;
                });

                /////////////////// SIGN UP FORM RETRIEVAL ENDS /////////////////////////////////////
            }
        }
    })
    
})


