
$(function(){
    /***** Contact Form ********/
    
    document.getElementById('btn-submit').addEventListener('click', function() {
    
        let name = document.getElementById('name').value.trim();
        let num = document.getElementById('phonenum').value.trim();
        let mail = document.getElementById('email').value.trim();
        let subj = document.getElementById('subject').value.trim();
        let mes = document.getElementById('message').value.trim();
    
        let at = mail.includes("@");
        let end = mail.includes(".com");
        if (name.length === 0 || num.length === 0 || mail.length === 0 || subj.length === 0 || mes.length === 0) {
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
    
            const alertTrigger = document.getElementById('btn-submit')
            if (alertTrigger) {
                alertTrigger.addEventListener('click', () => {
                appendAlert('Message successfully submitted! We will do our best to respond within 1 business day.', 'dark')
                })
                $("form").submit(function(){
                    const data = {
                        username: $("#name").val(),
                        password: $("#phonenum").val(),
                        email: $("#email").val(),
                        subject: $("#subject").val(),
                        message: $("#message").val()
                    }
                
                    $.post( "/api/contactform/create", data, function( data ) {
                        console.log("Contact Message Recieved");
                    });
                    return false;
                });
            }
        }
    })
    
})