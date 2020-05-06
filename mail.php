<?php 

if($_POST['name']){ 
  $name = $_POST['name']; 
  $email = $_POST['email']; 
  $budget = $_POST['budget']; 
  $message = $_POST['message']; 
            
  mail("hadayethm1999@gmail.com", "This is an email from:" .$email, $message); 

} 

?> 